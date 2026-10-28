import { NextResponse } from 'next/server';
import { readCmsDb, writeCmsDb, CmsArticle } from '@/lib/cmsStorage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get('all') === '1';
  const db = readCmsDb();

  const filtered = includeDrafts
    ? db.articles
    : db.articles.filter((a) => a.status === 'published');

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return NextResponse.json({
    data: sorted,
    current_page: 1,
    last_page: 1,
    total: sorted.length
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readCmsDb();

    const newId = db.articles.length > 0 ? Math.max(...db.articles.map((a) => a.id)) + 1 : 1;
    const rawSlug =
      body.slug ||
      String(body.title || 'artikel-baru')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

    const uniqueSlug = db.articles.some((a) => a.slug === rawSlug) ? `${rawSlug}-${newId}` : rawSlug;

    const authorObj =
      db.users.find((u) => u.id === body.author_id) ||
      db.users[0] || {
        id: 'usr-admin-nh',
        name: 'Administrator Narasumber Hukum',
        title: 'Super Administrator',
        profile_photo_url: '/logo.png'
      };

    const newArticle: CmsArticle = {
      id: newId,
      title: body.title || 'Artikel Tanpa Judul',
      slug: uniqueSlug,
      category: {
        id: 1,
        name: body.category_name || body.category?.name || 'Hukum & Edukasi'
      },
      excerpt: body.excerpt || '',
      content: body.content || '',
      image: body.image_url || body.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      image_url: body.image_url || body.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      supporting_images: Array.isArray(body.supporting_images) ? body.supporting_images : [],
      author_id: authorObj.id,
      author: {
        id: authorObj.id,
        name: authorObj.name,
        title: authorObj.title,
        profile_photo_url: authorObj.profile_photo_url
      },
      status: body.status === 'draft' ? 'draft' : 'published',
      featured: Boolean(body.featured),
      published_at: body.published_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.articles.unshift(newArticle);
    writeCmsDb(db);

    return NextResponse.json({ success: true, article: newArticle }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
