"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { BagEditor } from '@/components/bag-editor';
import { InteractiveYardageChart } from '@/components/yardage-chart';
import { useGolfBag } from '@/hooks/golf-bags-hook';
import { cn } from '@/lib/utils';
import { BagQR } from '@/components/bag-qr';

enum PageMode {
  Chart,
  Editor,
  Share,
}

export default function BagPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const bagId = searchParams.get('id') ?? undefined;
  const { bag } = useGolfBag(bagId);

  const [pageMode, setPageMode] = useState(PageMode.Chart);

  useEffect(() => {
    if (!bag) router.replace('/');
  }, [router, bag]);

  if (!bagId || !bag) return (<p>Loading...</p>);

  return (<>
    <div className="flex items-start justify-center min-h-full bg-gray-100">
      <div className="bg-white p-4 shadow-md w-full max-w-full w-fit sm:max-w-4xl text-center mt-2 sm:mt-8 mx-2 sm:mx-0">
        <div className="w-full flex justify-center px-2 sm:px-8">
          <div className="flex w-full max-w-md mx-auto">
            <button className={cn('w-full py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold border-r-0', pageMode === PageMode.Chart && 'bg-accent text-accent-foreground')} onClick={() => setPageMode(PageMode.Chart)}>Chart</button>
            <button className={cn('w-full py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold', pageMode === PageMode.Editor && 'bg-accent text-accent-foreground')} onClick={() => setPageMode(PageMode.Editor)}>Editor</button>
            <button className={cn('w-full py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold border-l-0', pageMode === PageMode.Share && 'bg-accent text-accent-foreground')} onClick={() => setPageMode(PageMode.Share)}>Share</button>
          </div>
        </div>

        <div className={cn('printable print:flex print:pl-8 print:pt-8 w-full max-w-4xl mx-auto hidden', pageMode === PageMode.Chart && 'block')}>
          <InteractiveYardageChart bag={bag} />
        </div>
        <div className={cn('print:hidden w-full max-w-4xl mx-auto hidden', pageMode === PageMode.Editor && 'block')}>
          <BagEditor bagId={bagId} />
        </div>
        <div className={cn('w-full flex flex-col items-center pt-4 h-80 overflow-hidden hidden', pageMode === PageMode.Share && 'flex')}>
          <BagQR bag={bag} />
        </div>
      </div>
    </div>
  </>);
}