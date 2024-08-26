"use client";

import { useRouter } from 'next/navigation';

import { BagEditor } from '@/components/bag-editor';
import { YardageChart } from '@/components/yardage-chart';
import { useGolfBag } from '@/hooks/golf-bags-hook';
import { useEffect } from 'react';

export default function BagEditorPage({ params }: { params: { bag: string } }) {

  const router = useRouter();
  const { bag } = useGolfBag(params.bag);

  useEffect(() => {
    if (!bag) router.replace('/');
  }, [router, bag]);

  if (!bag) return (<p>Loading...</p>);

  return (<>
    <div className="print:hidden">
      <BagEditor bagId={params.bag} />
    </div>
    <div className="printable hidden print:block">
      <YardageChart bagId={params.bag} />
    </div>
  </>);
}
