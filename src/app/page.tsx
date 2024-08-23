"use client";

import { useGolfBags } from '@/hooks/golf-bags-hook';

export default function Home() {
  const { bags } = useGolfBags();

  if (!bags.length) return (<p>Add a bag to get started.</p>);


  return (<p>Select a bag to get started.</p>);
}
