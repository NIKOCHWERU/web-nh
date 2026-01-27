import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: {
    template: "%s | Narasumber Hukum",
    default: "Sentral Edukasi Dan Solusi | Narasumber Hukum",
  },
  description: "Kantor Narasumber Hukum memberikan pendampingan hukum profesional dengan pendekatan edukatif untuk solusi yang berkeadilan, resmi, dan terpercaya.",
  metadataBase: new URL("https://www.narasumberhukum.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/icon.png", sizes: "1024x1024" },
    ],
  },
  openGraph: {
    title: "Narasumber Hukum | Kantor Hukum & Solusi Edukatif",
    description: "Kantor Narasumber Hukum: Pendampingan hukum profesional dengan pendekatan edukatif untuk solusi yang berkeadilan.",
    url: "https://www.narasumberhukum.com",
    siteName: "Narasumber Hukum",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Narasumber Hukum",
                "url": "https://www.narasumberhukum.com",
                "logo": "https://www.narasumberhukum.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+62 822-1102-0022",
                  "contactType": "customer service",
                  "areaServed": "ID",
                  "availableLanguage": "Indonesian"
                },
                "sameAs": [
                  "https://www.instagram.com/narasumberhukum/",
                  "https://www.linkedin.com/company/kantor-narasumber-hukum/"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Narasumber Hukum",
                "url": "https://www.narasumberhukum.com"
              }
            ])
          }}
        />
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
