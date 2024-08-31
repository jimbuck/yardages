import { Suspense, useEffect } from 'react';
import { Metadata } from 'next';
import Head from "next/head";
import { Inter } from "next/font/google";
import { Provider as JotaiProvider } from "jotai/react";

import { LayoutContent } from '@/components/layout-content';

import "./globals.css";
import { store } from '@/hooks/store';

const inter = Inter({ subsets: ["latin"] });

const SITE_DETAILS = {
  TITLE: "Yardages",
  DESCRIPTION: "Personal golf club yardage tracker.",
  URL: "https://yardages.jimbuck.io",
};

export const metadata: Metadata = {
  title: SITE_DETAILS.TITLE,
  description: SITE_DETAILS.DESCRIPTION,
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["golf", "golf clubs", 'yardages', 'golf app', "pwa", 'pga', 'usga', 'handicap', 'golf tools'],
  themeColor: '#095030',
  viewport: "width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover",
  authors: [
    {
      name: "Jim Buck",
      url: "https://jimbuck.io",
    },
  ],
  icons: [
    { rel: "icon", url: "maskable_icon_x48.png" },
    { rel: "icon", url: "maskable_icon_x96.png" },
    { rel: "icon", url: "maskable_icon_x144.png" },
    { rel: "icon", url: "maskable_icon_x192.png" },
    { rel: "icon", url: "maskable_icon_x512.png" },
    { rel: "apple-touch-icon", url: "maskable_icon_x80.png" },
    { rel: "apple-touch-icon", url: "maskable_icon_x120.png" },
    { rel: "apple-touch-icon", url: "maskable_icon_x180.png" },
    { rel: "apple-touch-icon", url: "maskable_icon_x1024.png" },
  ],
  openGraph: {
    type: "website",
    title: SITE_DETAILS.TITLE,
    description: SITE_DETAILS.DESCRIPTION,
    siteName: SITE_DETAILS.TITLE,
    url: SITE_DETAILS.URL,
    images: "https://yardagechart.jimbuck.io/icon.png",
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
        <body className={`${inter.className} flex flex-row h-svh bg-gray-100`}>
          <Suspense fallback={<p>Loading...</p>}>
            <LayoutContent>{children}</LayoutContent>
          </Suspense>
        </body>
      </JotaiProvider>
    </html>
  );
}
