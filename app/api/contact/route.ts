import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readCmsDb, writeCmsDb, CmsContactMessage } from "@/lib/cmsStorage";

// In-memory rate limiter: max 5 requests per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 5;
const ipRequestHistory = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  if (ip === "unknown-ip") return true;
  const now = Date.now();
  const record = ipRequestHistory.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestHistory.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_IP) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up stale rate limit entries every 30 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipRequestHistory.entries()) {
      if (now > record.resetTime) {
        ipRequestHistory.delete(ip);
      }
    }
  }, 30 * 60 * 1000);
}

export async function GET() {
  const db = readCmsDb();
  return NextResponse.json({
    data: db.messages
  });
}

export async function POST(request: Request) {
  try {
    // Extract Client IP
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown-ip";

    // Rate Limiting Protection (Anti-Flood)
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          error: "Terlalu banyak permintaan dalam waktu singkat. Mohon tunggu beberapa menit sebelum mengirim pesan kembali."
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message, hp_company, hp_website, _loadedAt } = body;

    // 1. HONEYPOT ANTI-SPAM TRAP
    // Field tersembunyi yang hanya diisi oleh robot/crawler otomatis.
    // Jika terisi, kita beri respons sukses palsu agar bot tidak mencoba bypass,
    // namun data spam TIDAK disimpan ke database dan TIDAK mengirim email.
    if (hp_company || hp_website) {
      return NextResponse.json(
        { success: true, message: "Pesan berhasil dikirim dan tersimpan di sistem kami." },
        { status: 200 }
      );
    }

    // 2. TIME-BASED SUBMISSION TRAP
    // Manusia normal membutuhkan waktu minimal 2.5 detik untuk mengisi form.
    // Bot pengirim otomatis biasanya men-submit form dalam < 1.5 detik.
    if (_loadedAt && typeof _loadedAt === "number") {
      const durationMs = Date.now() - _loadedAt;
      if (durationMs < 2000) {
        return NextResponse.json(
          { success: true, message: "Pesan berhasil dikirim dan tersimpan di sistem kami." },
          { status: 200 }
        );
      }
    }

    // 3. VALIDASI WAJIB
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Mohon lengkapi nama, email, dan pesan Anda." },
        { status: 400 }
      );
    }

    const cleanName = String(name).replace(/<[^>]*>/g, "").trim().slice(0, 100);
    const cleanEmail = String(email).trim().toLowerCase().slice(0, 150);
    const cleanPhone = String(phone || "-").replace(/[^\d+\-()\s]/g, "").trim().slice(0, 30);
    const cleanSubject = String(subject || `Pesan Konsultasi dari ${cleanName}`)
      .replace(/<[^>]*>/g, "")
      .trim()
      .slice(0, 150);
    const cleanMessage = String(message).trim().slice(0, 4000);

    // 4. VALIDASI SINTAKS EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Format email tidak valid. Mohon masukkan email yang benar." },
        { status: 400 }
      );
    }

    // 5. BLOKIR DUMMY / BOT DOMAINS
    const emailDomain = cleanEmail.split("@")[1] || "";
    const blockedDomains = [
      "example.com",
      "example.org",
      "test.com",
      "mailinator.com",
      "tempmail.com",
      "guerrillamail.com",
      "10minutemail.com",
      "throwawaymail.com",
      "trashmail.com"
    ];

    if (blockedDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: "Mohon gunakan alamat email resmi/aktif yang dapat dihubungi." },
        { status: 400 }
      );
    }

    // 6. SIMPAN PESAN KE DATABASE CMS
    const db = readCmsDb();
    const newMsg: CmsContactMessage = {
      id: `msg-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
      status: "unread",
      notes: "",
      created_at: new Date().toISOString()
    };

    db.messages.unshift(newMsg);
    writeCmsDb(db);

    // 7. NOTIFIKASI EMAIL VIA SMTP (JIKA DIKONFIGURASI)
    if (process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "mail.narasumberhukum.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER || "hello@narasumberhukum.com",
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Website Narasumber Hukum" <${process.env.SMTP_USER || "hello@narasumberhukum.com"}>`,
          to: "hello@narasumberhukum.com",
          replyTo: cleanEmail,
          subject: `[Web Contact] ${cleanSubject}`,
          text: `Anda mendapat pesan baru dari website.\n\nNama: ${cleanName}\nEmail: ${cleanEmail}\nTelepon: ${cleanPhone}\nSubjek: ${cleanSubject}\n\nPesan:\n${cleanMessage}`,
          html: `
            <h3>Pesan Baru dari Website Narasumber Hukum</h3>
            <p><strong>Nama:</strong> ${cleanName}</p>
            <p><strong>Email:</strong> ${cleanEmail}</p>
            <p><strong>Telepon:</strong> ${cleanPhone}</p>
            <p><strong>Subjek:</strong> ${cleanSubject}</p>
            <br/>
            <p><strong>Pesan:</strong></p>
            <p>${cleanMessage.replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (smtpError) {
        console.warn("SMTP optional notification skipped/failed:", smtpError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pesan berhasil dikirim dan tersimpan di sistem kami.",
        data: newMsg
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim pesan", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;
    const db = readCmsDb();
    const idx = db.messages.findIndex((m) => m.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    }
    if (status) db.messages[idx].status = status;
    if (notes !== undefined) db.messages[idx].notes = notes;
    writeCmsDb(db);
    return NextResponse.json({ success: true, message: db.messages[idx] });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const db = readCmsDb();
    db.messages = db.messages.filter((m) => m.id !== id);
    writeCmsDb(db);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
