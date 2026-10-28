import { NextResponse } from 'next/server';
import { readCmsDb, writeCmsDb } from '@/lib/cmsStorage';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = readCmsDb();
  const article = db.articles.find((a) => a.slug === slug || String(a.id) === slug);

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const db = readCmsDb();

    const idx = db.articles.findIndex((a) => a.slug === slug || String(a.id) === slug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }

    const existing = db.articles[idx];
    const authorObj =
      db.users.find((u) => u.id === (body.author_id || existing.author_id)) ||
      existing.author;

    const updated = {
      ...existing,
      title: body.title !== undefined ? body.title : existing.title,
      slug: body.slug !== undefined ? body.slug : existing.slug,
      category: {
        id: existing.category?.id || 1,
        name: body.category_name || body.category?.name || existing.category?.name || 'Hukum & Edukasi'
      },
      excerpt: body.excerpt !== undefined ? body.excerpt : existing.excerpt,
      content: body.content !== undefined ? body.content : existing.content,
      image: body.image_url || body.image || existing.image,
      image_url: body.image_url || body.image || existing.image_url,
      supporting_images: body.supporting_images !== undefined ? body.supporting_images : existing.supporting_images,
      author_id: authorObj.id,
      author: {
        id: authorObj.id,
        name: authorObj.name,
        title: (authorObj as any).title || '',
        profile_photo_url: authorObj.profile_photo_url || '/logo.png'
      },
      status: body.status !== undefined ? body.status : existing.status,
      featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
      published_at: body.published_at || existing.published_at,
      updated_at: new Date().toISOString()
    };

    db.articles[idx] = updated;
    writeCmsDb(db);

    return NextResponse.json({ success: true, article: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = readCmsDb();
    const filtered = db.articles.filter((a) => a.slug !== slug && String(a.id) !== slug);
    db.articles = filtered;
    writeCmsDb(db);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
