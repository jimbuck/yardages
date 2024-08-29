"use client";

import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { Inter } from "next/font/google";

import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Provider as JotaiProvider, useAtom } from "jotai/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faTimes, faPrint } from '@fortawesome/free-solid-svg-icons';

import { cn } from "@/lib/utils";
import { useGolfBag, useGolfBags } from '@/hooks/golf-bags-hook';
import { BagList } from '@/components/bag-list';

import "./globals.css";
import { usePathname, useSearchParams } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const store = createStore();

const META = {
  DESCRIPTION: 'Custom golf club yardage charts for mobile reference or printing.',
  TITLE: 'Club Yardage Charts',
  URL: `https://yardagechart.jimbuck.io`,
} as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className="overflow-hidden">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Club Yardage Charts</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#095030" />
        <meta name="author" content="Jim Buck" />
        <meta name="description" content={META.DESCRIPTION} />

        <meta name="application-name" content={META.TITLE} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={META.TITLE} />
        <meta name="description" content={META.DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
        <meta name="msapplication-TileColor" content="#095030" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#095030" />

        {/* <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" /> */}

        {/* <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" /> */}
        <link rel="manifest" href="/manifest.json" />
        {/* <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" /> */}
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={META.URL} />
        <meta name="twitter:title" content={META.TITLE} />
        <meta name="twitter:description" content={META.DESCRIPTION} />
        {/* <meta name="twitter:image" content="https://yardagechart.jimbuck.io/icons/android-chrome-192x192.png" /> */}
        <meta name="twitter:creator" content="@jimbuckio" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={META.TITLE} />
        <meta property="og:description" content={META.DESCRIPTION} />
        <meta property="og:site_name" content={META.TITLE} />
        <meta property="og:url" content={META.URL} />
        {/* <meta property="og:image" content="https://yardagechart.jimbuck.io/icons/apple-touch-icon.png" /> */}
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

function LayoutContent({ children }: PropsWithChildren<{}>) {
  const searchParams = useSearchParams();
  const bagId = searchParams.get('id') ?? undefined;

  return (<>
    <SideNav bagId={bagId} />
    <div className="w-full flex flex-col">
      {/* <DesktopHeader /> */}
      <MobileNav />
      <div className="h-dvh w-full mx-auto overflow-y-scroll">{children}</div>
    </div>
  </>)
}

function SideNav({ bagId }: { bagId?: string }) {
  const { bags, addBag } = useGolfBags();
  const { bag } = useGolfBag(bagId);

  return (<aside className="relative bg-emerald h-screen w-64 hidden sm:block">
    <div className="p-6">
      <h1 className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Club Yardage Chart</h1>
      <button className="w-full bg-navy text-white font-semibold py-2 mt-5 rounded-lg flex items-center justify-center" onClick={() => addBag()}>
        <FontAwesomeIcon icon={faPlus} className='mr-3' /> New Bag
      </button>
    </div>
    <BagList bags={bags} activeBag={bag} className="text-white text-base font-semibold pt-3"
      linkClassName="py-4 pl-6 hover:bg-emerald-dark" />

    <div className="absolute w-full bottom-0 pt-2">
      <Link href="/print" className="block text-center bg-navy text-white font-semibold rounded-lg mx-4 py-2 items-center justify-center mb-2">
        <FontAwesomeIcon icon={faPrint} className='mr-1' /> Print
      </Link>
      <MadeWithLove className="text-sm" />
    </div>
  </aside>)
}

const isMobileHeaderOpenAtom = atomWithStorage('golf-yardage-chart:isMobileHeaderOpen', false);

function MobileNav({ bagId }: { bagId?: string }) {
  const { bags, addBag } = useGolfBags();
  const { bag } = useGolfBag(bagId);
  const path = usePathname();

  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useAtom(isMobileHeaderOpenAtom);

  useEffect(() => {
    setIsMobileHeaderOpen(false);
  }, [path, setIsMobileHeaderOpen]);

  return (<header className="w-full bg-emerald sm:hidden">
    <div className={cn('flex items-center justify-between pt-5 px-6', !isMobileHeaderOpen && 'pb-4')}>
      <h1 className="text-white text-3xl font-semibold uppercase">Club Yard Chart</h1>
      <button
        onClick={() => setIsMobileHeaderOpen(isOpen => !isOpen)}
        className="text-white text-3xl focus:outline-none" >
        <FontAwesomeIcon icon={isMobileHeaderOpen ? faTimes : faBars} />
      </button>
    </div>

    {/* Dropdown Nav */}
    <BagList bags={bags} activeBag={bag} className={cn('flex flex-col pt-4', isMobileHeaderOpen ? "flex" : "hidden")} linkClassName="py-2 pl-6">
      <div className="grid grid-cols-[1fr_1fr] py-4 mx-4 gap-x-2">
        <button className="bg-navy text-white block font-semibold rounded-lg px-4 py-2 items-center justify-center" onClick={() => addBag()}>
          <FontAwesomeIcon icon={faPlus} className='mr-1' /> Add Bag
        </button>
        <Link href="/print" onClick={() => setIsMobileHeaderOpen(false)} className="block text-center bg-navy text-white font-semibold rounded-lg px-4 py-2 items-center justify-center">
          <FontAwesomeIcon icon={faPrint} className='mr-1' /> Print
        </Link>
      </div>
      <MadeWithLove />
    </BagList>
  </header>);
}

function MadeWithLove({ className }: { className?: string }) {
  return <div className={cn('bg-emerald-dark text-white text-center py-2', className)}>Made with ❤️ by<a href="https://jimbuck.io" className="text-white hover:underline ml-1">Jim Buck</a></div>
}