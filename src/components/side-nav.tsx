"use client";

import { MouseEvent, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useGolfBags } from '@/hooks/golf-bags-hook';
import { PlusIcon, PrinterIcon, TrashIcon } from './icons';
import { GolfBag } from '@/models';


export function SideNav() {
  const { bag: activeBagId } = useParams();
  const { bags, addBag, removeBag } = useGolfBags();

  const handleDeleteClicked = (e: MouseEvent, bag: GolfBag) => {
    e.preventDefault();
    e.stopPropagation();
    removeBag(bag, bag.id === activeBagId);
  };

	return (
		<div className="flex h-full flex-col bg-background w-80">
      <nav className="flex flex-col gap-2 p-4">
        {bags.map(bag => (
          <Button key={`${bag.name}_${bag.id}`} variant={bag.id === activeBagId ? 'default' : 'outline'} asChild={true}>
            <Link className="w-full mb-2 justify-between pr-0.5 group" href={`/${bag.id}`}>
              {bag.name} ({bag.clubs.length})
              <Button variant="destructive-outline" size="sm" className="text-secondary-foreground hidden group-hover:block" onClick={(e) => handleDeleteClicked(e, bag)}>
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Remove club</span>
                  </Button>
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <Button className="w-full mb-2" onClick={() => addBag()}>
          <PlusIcon className="mr-2" /> Add Bag
        </Button>
        <Button variant="outline" className="w-full" asChild={true}>
          <Link className="w-full" href="/print">
            <PrinterIcon className="mr-2" /> Print Charts
          </Link>
        </Button>
      </div>
    </div>
	);
}