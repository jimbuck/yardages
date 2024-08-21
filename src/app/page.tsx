"use client";

import { BagEditor } from '@/components/bag-editor';
import { YardageChart } from '@/components/yardage-chart';
import { useGolfBag } from '@/hooks/golf-bags-hook';

export default function Home({ }: {}) {

  const { bag } = useGolfBag();

  return (
    <div className="flex flex-row">
      <div>
        <BagEditor />
      </div>
      <div className="">
        <YardageChart bag={bag} />
      </div>
    </div>

  );
}
