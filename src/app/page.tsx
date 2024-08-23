"use client";

import { BagEditor } from '@/components/bag-editor';
import { YardageChart } from '@/components/yardage-chart';
import { useGolfBag } from '@/hooks/golf-bags-hook';

export default function Home({ }: {}) {

  const { bag } = useGolfBag();

  if (!bag) {
    return (
      <div className="flex flex-row">
        <div>
          <p>Add a bag to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div>
        <BagEditor />
      </div>
      <div className="">
        { bag && <YardageChart bag={bag} />}
      </div>
    </div>

  );
}
