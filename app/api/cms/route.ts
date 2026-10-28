import { NextResponse } from 'next/server';
import { readCmsDb, writeCmsDb } from '@/lib/cmsStorage';

export async function GET() {
  const db = readCmsDb();
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    const db = readCmsDb();

    if (action === 'login') {
      const found = db.users.find(
        (u) =>
          u.username.toLowerCase() === String(username || '').trim().toLowerCase() &&
          u.password === String(password || '') &&
          u.active
      );

      if (!found) {
        return NextResponse.json(
          { success: false, message: 'Username atau password tidak valid, atau akun tidak aktif.' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: found.id,
          username: found.username,
          name: found.name,
          email: found.email,
          role: found.role,
          title: found.title,
          bio: found.bio,
          profile_photo_url: found.profile_photo_url
        }
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const currentDb = readCmsDb();

    const updatedDb = {
      users: body.users !== undefined ? body.users : currentDb.users,
      articles: body.articles !== undefined ? body.articles : currentDb.articles,
      messages: body.messages !== undefined ? body.messages : currentDb.messages,
      blocks: body.blocks !== undefined ? body.blocks : currentDb.blocks,
      siteSettings: body.siteSettings !== undefined ? { ...currentDb.siteSettings, ...body.siteSettings } : currentDb.siteSettings
    };

    writeCmsDb(updatedDb);
    return NextResponse.json({ success: true, db: updatedDb });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
