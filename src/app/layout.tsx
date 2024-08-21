"use client";

import { Inter } from "next/font/google";
import { createStore } from 'jotai';
import { Provider as JotaiProvider } from 'jotai/react';

import { SideNav } from '@/components/side-nav';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const store = createStore();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <JotaiProvider store={store}>
        <body className={`${inter.className} flex flex-row h-screen`}>
          <div className="flex-initial">
            <SideNav />
          </div>
          <main className="flex flex-col items-center justify-center h-full mx-auto">
            {children}
          </main>
        </body>
      </JotaiProvider>
    </html>
  );
}
