import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/lang";
import { SITE } from "@/lib/content";

// Self-hosted at build time: no render-blocking Google Fonts request, and Next
// generates fallback metrics so text does not reflow when the font lands.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Odhi Ahmad Hidayat — Full Stack Developer (Go, Flutter, React)",
    template: "%s · Odhi Ahmad Hidayat",
  },
  description: SITE.descId,
  keywords: [
    "Odhi Ahmad Hidayat",
    "Full Stack Developer",
    "Software Engineer Indonesia",
    "Golang Developer",
    "Flutter Developer",
    "React Developer",
    "React Native Developer",
    "Loka Kasir",
    "Kreativita Sinergi",
    "Portfolio",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "profile",
    url: SITE.url,
    siteName: SITE.name,
    title: "Odhi Ahmad Hidayat — Full Stack Developer",
    description: SITE.descEn,
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Odhi Ahmad Hidayat — Full Stack Developer",
    description: SITE.descEn,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%230a0e13%22/><text x=%2250%22 y=%2266%22 font-size=%2244%22 font-family=%22monospace%22 font-weight=%22700%22 fill=%22%234f9cff%22 text-anchor=%22middle%22>%3C/%3E</text></svg>",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Full Stack Developer",
  image: `${SITE.url}/og.png`,
  sameAs: [SITE.github, "https://www.lokakasir.id", "https://www.kreativitasinergi.com"],
  knowsAbout: ["Go", "Flutter", "React", "React Native", "Next.js", "PostgreSQL", "Point of Sale"],
  address: { "@type": "PostalAddress", addressCountry: "ID" },
  worksFor: { "@type": "Organization", name: "Loka Kasir", url: "https://www.lokakasir.id" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
