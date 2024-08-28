"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BagEditor } from '@/components/bag-editor';
import { YardageChart } from '@/components/yardage-chart';
import { useGolfBag, useGolfBags } from '@/hooks/golf-bags-hook';
import { cn } from '@/lib/utils';
import { BagQR } from '@/components/bag-qr';
import { withNoSSR } from '@/components/client-only';

function BagEditorPage({ params }: { params: { bagId: string } }) {

  const router = useRouter();
  const { updateBag } = useGolfBags();
  const { bag } = useGolfBag(params.bagId);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!bag) router.replace('/');
  }, [router, bag]);

  const autoSortBag = () => {
    const canSortBag = bag?.clubs.every(c => typeof c.carry === 'number') ?? false;
    if (!canSortBag || !bag) return;

    const sortedClubs = [...bag.clubs].sort((a, b) => b.carry! - a.carry!);
    // Update the bag with the sorted clubs
    updateBag({ ...bag, clubs: sortedClubs });
  };

  if (!bag) return (<p>Loading...</p>);

  return (<>
    <div className={cn('print:hidden w-full max-w-4xl mx-auto', !editMode && 'hidden')}>
      <BagEditor bagId={params.bagId} />
    </div>
    <div className={cn('printable print:flex print:pl-8 print:pt-8 w-full max-w-4xl mx-auto', editMode && 'hidden')}>
      <YardageChart bag={bag} />
    </div>
    <div className="flex flex-col w-full max-w-4xl mx-auto px-2 pt-4">
      {editMode && (<>
        <div className={cn('w-full grid px-2 justify-between gap-2 grid-cols-[1fr_1fr]')}>
          <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold py-2 mt-5 rounded-lg flex items-center justify-center" onClick={() => setEditMode(false)}>Preview</button>
          <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold py-2 mt-5 rounded-lg flex items-center justify-center" onClick={() => autoSortBag()}>Sort By Dist</button>
        </div>
      </>)}
      {!editMode && (<>
        <div className={cn('w-full px-2 flex justify-center')}>
          <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold py-2 rounded-lg flex items-center justify-center px-4" onClick={() => setEditMode(true)}>Edit</button>
        </div>
      </>)}

      <div className={cn('w-full flex flex-col items-center pt-4 h-80 overflow-hidden')}>
        <BagQR bag={bag} />
      </div>
    </div>
  </>);
}

export default withNoSSR(BagEditorPage);