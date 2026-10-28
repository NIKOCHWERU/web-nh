import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readCmsDb, writeCmsDb, CmsContactMessage } from "@/lib/cmsStorage";

export async function GET() {
  const db = readCmsDb();
  return NextResponse.json({
    data: db.messages
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Mohon lengkapi nama, email, dan pesan Anda." }, { status: 400 });
    }

    // 1. Always save the message into CMS database so Admin can manage it in Dashboard
    const db = readCmsDb();
    const newMsg: CmsContactMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || "-").trim(),
      subject: String(subject || `Pesan Konsultasi dari ${name}`).trim(),
      message: String(message).trim(),
      status: "unread",
      notes: "",
      created_at: new Date().toISOString()
    };

    db.messages.unshift(newMsg);
    writeCmsDb(db);

    // 2. Optionally send SMTP email notification if SMTP_PASS is configured
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
          replyTo: email,
          subject: `[Web Contact] ${subject || `Pesan Baru dari ${name}`}`,
          text: `Anda mendapat pesan baru dari website.\n\nNama: ${name}\nEmail: ${email}\nTelepon: ${phone || "-"}\nSubjek: ${subject || "-"}\n\nPesan:\n${message}`,
          html: `
            <h3>Pesan Baru dari Website Narasumber Hukum</h3>
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telepon:</strong> ${phone || "-"}</p>
            <p><strong>Subjek:</strong> ${subject || "-"}</p>
            <br/>
            <p><strong>Pesan:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (smtpError) {
        console.warn("SMTP optional notification skipped/failed:", smtpError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Pesan berhasil dikirim dan tersimpan di sistem kami.", data: newMsg },
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
