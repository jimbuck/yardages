"use client";

import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { Inter } from "next/font/google";

import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Provider as JotaiProvider, useAtom } from "jotai/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faTimes, faPrint } from '@fortawesome/free-solid-svg-icons';

import { cn } from "@/lib/utils";
import { useGolfBags } from '@/hooks/golf-bags-hook';
import { BagList } from '@/components/bag-list';

import "./globals.css";
import { useParams, usePathname, useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const store = createStore();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className="overflow-hidden">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Custom Yardage Chart</title>
        <meta name="author" content="Jim Buck" />
        <meta name="description" content="Build custom yardage charts for mobile reference or printing." />
      </Head>
      <JotaiProvider store={store}>
        <body className={`${inter.className} flex flex-row h-svh`}>
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-y-hidden">
            {/* <DesktopHeader /> */}
            <MobileNav />
            <div className="h-dvh mx-auto">{children}</div>
          </div>
        </body>
      </JotaiProvider>
    </html>
  );
}

function SideNav() {
  const { addBag } = useGolfBags();

  return (<aside className="relative bg-emerald h-screen w-64 hidden sm:block">
    <div className="p-6">
      <h1 className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Club Yardage Chart</h1>
      <button className="w-full bg-navy text-white font-semibold py-2 mt-5 rounded-lg flex items-center justify-center" onClick={() => addBag()}>
        <FontAwesomeIcon icon={faPlus} className='mr-3' /> New Bag
      </button>
    </div>
    <BagList className="text-white text-base font-semibold pt-3"
      linkClassName="py-4 pl-6 hover:bg-emerald-dark" />
    <span className="absolute w-full bg-emerald-dark bottom-0 text-white flex items-center justify-center py-4">
      Made with ❤️ by <a href="https://jimbuck.io" className="text-white hover:underline ml-1">Jim Buck</a>
    </span>
  </aside>)
}

const isMobileHeaderOpenAtom = atomWithStorage(
  "golf-yardage-chart:isMobileHeaderOpen",
  false
);

function MobileNav() {
  const { activeBagId } = useParams();
  const { addBag } = useGolfBags();
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
    <BagList className={cn('flex flex-col pt-4', isMobileHeaderOpen ? "flex" : "hidden")} linkClassName="py-2 pl-6" onClick={({ bag }) => bag.id !== activeBagId && setIsMobileHeaderOpen(false)}>
      <div className="grid grid-cols-[1fr_1fr] py-4 mx-4 gap-x-2">
        <button className="bg-white block font-semibold rounded-lg px-4 py-2 items-center justify-center" onClick={() => addBag()}>
          <FontAwesomeIcon icon={faPlus} className='mr-1' /> Add Bag
        </button>
        <Link href="/print" onClick={() => setIsMobileHeaderOpen(false)} className="block text-center bg-white font-semibold rounded-lg px-4 py-2 items-center justify-center">
          <FontAwesomeIcon icon={faPrint} className='mr-1' /> Print
        </Link>
      </div>
    </BagList>
  </header>);
}

function DesktopHeader() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (<header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
    <div className="w-1/2"></div>
    <div className="relative w-1/2 flex justify-end">
      <button
        onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
        className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400"
      >
        {/* <img src="https://source.unsplash.com/pictureid/400x400" /> */}
      </button>
      {isAccountMenuOpen && (
        <>
          <button className="h-full w-full fixed inset-0 cursor-default"></button>
          <div className="absolute w-32 bg-white rounded-lg py-2 mt-16">
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Account
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Support
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Sign Out
            </a>
          </div>
        </>
      )}
    </div>
  </header>);
}