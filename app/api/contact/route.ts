import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.narasumberhukum.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "hello@narasumberhukum.com",
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
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
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email berhasil terkirim" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("SMTP Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim email", details: error.message },
      { status: 500 }
    );
  }
}
