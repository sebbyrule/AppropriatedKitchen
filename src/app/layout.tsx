import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Display — an editorial, contemporary serif with elegant light weights + italics
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body — a clean, characterful grotesque that takes wide tracking well
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Appropriated Kitchen — Your Food, My Way",
    template: "%s | Appropriated Kitchen",
  },
  description:
    "A modern cooking blog featuring bold flavors, approachable recipes, and nutritional insights. Your food, my way.",
  openGraph: {
    title: "Appropriated Kitchen",
    description:
      "Your Food, My Way — A modern cooking blog with bold flavors and approachable recipes.",
    type: "website",
    siteName: "Appropriated Kitchen",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Dark is the canonical brand surface; opt out only with an explicit 'light' choice.
                  var theme = localStorage.getItem('theme');
                  if (theme !== 'light') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}