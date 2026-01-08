import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Narasumber Hukum | Kantor Hukum, Sentral Edukasi & Solusi",
  description: "Kantor Narasumber Hukum memberikan pendampingan hukum profesional dengan pendekatan edukatif untuk solusi yang berkeadilan, resmi, dan terpercaya.",
  openGraph: {
    title: "Narasumber Hukum | Kantor Hukum & Solusi Edukatif",
    description: "Kantor Narasumber Hukum: Pendampingan hukum profesional dengan pendekatan edukatif untuk solusi yang berkeadilan.",
    url: "https://narasumberhukum.online",
    siteName: "Narasumber Hukum",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Narasumber Hukum | Sentral Edukasi & Solusi Hukum",
    description: "Pendampingan hukum profesional dengan pendekatan edukatif untuk solusi yang berkeadilan.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased font-sans">
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-gray-50 text-navy">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingWA />
        </div>
      </body>
    </html>
  );
}
