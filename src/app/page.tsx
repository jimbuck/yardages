"use client";

import { useGolfBags } from '@/hooks/golf-bags-hook';

export default function Home() {
  const { bags } = useGolfBags();

  if (!bags.length) return (<p>Add a bag to get started.</p>);


  return (<p className="p-4 text-center">Select a bag to get started.</p>);
}
