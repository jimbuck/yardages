"use client";

import { Button } from '@/components/ui/button';
import { useGolfBags } from '@/hooks/golf-bags-hook';


export function SideNav() {
  const { bags, activeBag, chooseBag, addBag } = useGolfBags();

	return (
		<div className="flex h-full flex-col bg-background w-80">
      <nav className="flex flex-col gap-2 p-4">
        {bags.map((bag, index) => (
          <button key={`${bag.name}_${index}`} onClick={() => chooseBag(index)} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${activeBag === bag ? 'bg-primary text-primary-foreground' : ''}`}>{bag.name} ({bag.clubs.length})</button>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <Button className="w-full" onClick={() => addBag()}>
          + Add Bag
        </Button>
      </div>
    </div>
	);
}