import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import {
  Caveat,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
  Montserrat,
  Press_Start_2P,
  Space_Grotesk,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { WebSite, WithContext } from "schema-dts";

import { ConsentManager } from "@/components/consent-manager";
import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { THEME_INIT_SCRIPT } from "@/config/theme-script";

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
  };
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-display-grotesk",
});

const handFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-hand-script",
});

const terminalFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-terminal-mono",
});

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-pixel-2p",
});

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: "/",
  },
  title: {
    template: `%s · ${SITE_INFO.name}`,
    default: `${SITE_INFO.name} · Software Developer`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [{ name: SITE_INFO.name, url: SITE_INFO.url }],
  creator: SITE_INFO.name,
  openGraph: {
    siteName: SITE_INFO.name,
    url: "/",
    type: "website",
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@chiragiscoding",
    images: [SITE_INFO.ogImage],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${geistMono.variable} ${displayFont.variable} ${handFont.variable} ${terminalFont.variable} ${pixelFont.variable} ${montserratFont.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          enableColorScheme
          storageKey="theme"
        >
          <Providers>
            <NuqsAdapter>
              <ConsentManager>{children}</ConsentManager>
            </NuqsAdapter>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
