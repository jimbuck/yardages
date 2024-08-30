import { Suspense } from 'react';
import { Metadata, Viewport } from 'next';
import Head from "next/head";
import { Inter } from "next/font/google";
import { Provider as JotaiProvider } from "jotai/react";

import { LayoutContent } from '@/components/layout-content';

import "./globals.css";
import { store } from '@/hooks/store';

const inter = Inter({ subsets: ["latin"] });

const SITE_DETAILS = {
  TITLE: "Club Yardage Charts",
  DESCRIPTION: "Custom golf club yardage charts for mobile reference or printing.",
  URL: "https://yardagechart.jimbuck.io",
};

export const metadata: Metadata = {
  title: SITE_DETAILS.TITLE,
  description: SITE_DETAILS.DESCRIPTION,
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["golf", "golf clubs", 'yardages', 'golf app', "pwa"],
  themeColor: '#095030',
  viewport: "width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover",
  authors: [
    {
      name: "Jim Buck",
      url: "https://jimbuck.io",
    },
  ],
  icons: [
    // { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    // { rel: "icon", url: "icons/icon-128x128.png" },
  ],
  openGraph: {
    type: "website",
    title: SITE_DETAILS.TITLE,
    description: SITE_DETAILS.DESCRIPTION,
    siteName: SITE_DETAILS.TITLE,
    url: SITE_DETAILS.URL,
    // image: "https://yardagechart.jimbuck.io/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className="overflow-hidden">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{SITE_DETAILS.TITLE}</title>
      </Head>
      <JotaiProvider store={store}>
        <body className={`${inter.className} flex flex-row h-svh`}>
          <Suspense fallback={<p>Loading...</p>}>
            <LayoutContent>{children}</LayoutContent>
          </Suspense>
        </body>
      </JotaiProvider>
    </html>
  );
}
