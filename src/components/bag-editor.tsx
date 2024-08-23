"use client";

import React from "react";
import { atom } from 'jotai';
import { useAtom } from 'jotai/react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGolfBag, useGolfBags, activeBagAtom } from '@/hooks/golf-bags-hook';
import { cn } from '@/lib/utils';
import { Club } from '@/models';



const canSortBagAtom = atom(get => {
  const bag = get(activeBagAtom);
  return bag?.clubs.every(c => typeof c.carry === 'number') ?? false;
})

export function BagEditor({ }: {}) {
  const { removeBag, updateBag } = useGolfBags();
  const { bag, setBagName, addClub, updateClub, removeClub } = useGolfBag();
  const [canSortBag] = useAtom(canSortBagAtom);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const printChart = () => {
    window.print();
  };


  const autoSortBag = () => {
    if (!canSortBag || !bag) return;

    const sortedClubs = [...bag.clubs].sort((a, b) => b.carry! - a.carry!);
    // Update the bag with the sorted clubs
    updateBag({ ...bag, clubs: sortedClubs });
  };

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!bag || !over) return;

    
    if (active.id !== over.id) {
      const oldIndex = bag.clubs.findIndex(c => c.id === active.id);
      const newIndex = bag.clubs.findIndex(c => c.id === over.id);
      const updatedClubs = arrayMove(bag.clubs, oldIndex, newIndex);

      updateBag({ ...bag, clubs: updatedClubs });
    }
  }

  if (!bag) return (<p>Loading...</p>);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            Yardage Chart
            <Button variant="destructive-outline" size="icon" onClick={() => removeBag(bag)} title={`Delete ${bag.name}`}>
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Remove club</span>
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Enter your golf clubs and distances to generate a custom yardage chart.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="bag-name">Bag Name</Label>
            <Input id="bag-name" value={bag.name} placeholder="e.g. My Golf Bag" onChange={e => setBagName(e.target.value)} />
          </div>
          <div className="grid grid-2">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 items-center">
              <div className="grid gap-2 invisible">
                <DragHandleIcon />
              </div>
              <div className="grid gap-2">
                <Label>Club Type</Label>
              </div>
              <div className="grid gap-2">
                <Label>Carry</Label>
              </div>
              <div className="grid gap-2">
                <Label>Total</Label>
              </div>
              <div className="grid gap-2">
              <Button variant="destructive-outline" size="icon" className="invisible">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Remove club</span>
              </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement, restrictToVerticalAxis]}>
                <SortableContext items={bag.clubs} strategy={verticalListSortingStrategy}>
                  {bag.clubs.map((club, index) => <ClubEditor key={club.id} club={club} index={index} />)}
                </SortableContext>
              </DndContext>
            </div>
          </div>
          <Button onClick={addClub}>
            <PlusIcon className="h-4 w-4 mr-2" onClick={() => addClub()} />
            Add Club
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" onClick={autoSortBag}>Sort By Yardage</Button>
        <Button variant="outline" onClick={printChart}>
          <PrinterIcon className="h-4 w-4 mr-2" />
          Print Chart
        </Button>
        
      </CardFooter>
    </Card>
  )
}

function ClubEditor({club, index, ...props}: { index: number, club: Club }) {
  const { updateClub, removeClub } = useGolfBag();
  
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id: club.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  return (
    <div ref={setNodeRef} style={style} className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 items-center">
      <div ref={setActivatorNodeRef} className={cn('grid gap-2 cursor-grab')} {...attributes} {...listeners}>
        <DragHandleIcon />
      </div>
      <div className="grid gap-2">
        <Input
          id={`club-type-${index}`}
          value={club.name}
          onChange={(e) => updateClub(club.id, "name", e.target.value)}
          placeholder={index === 0 ? 'e.g. Driver, 5 Iron, Sand Wedge' : ''}
        />
      </div>
      <div className="grid gap-2">
        <Input
          id={`club-carry-${index}`}
          type="number"
          value={club.carry}
          onChange={(e) => updateClub(club.id, "carry", e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>
      <div className="grid gap-2">
        <Input
          id={`club-total-${index}`}
          type="number"
          value={club.total}
          onChange={(e) => updateClub(club.id, "total",  e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>
      <div className="grid gap-2">
        <Button variant="destructive-outline" size="icon" onClick={() => removeClub(club)} title={`Delete ${club.name}`}>
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Remove club</span>
        </Button>
      </div>
    </div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function PrinterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  )
}


function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

function DragHandleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cy="6" cx="6" r="2" fill="currentColor" />
      <circle cy="12" cx="6" r="2" fill="currentColor" />
      <circle cy="18" cx="6" r="2" fill="currentColor" />
      <circle cy="6" cx="12" r="2" fill="currentColor" />
      <circle cy="12" cx="12" r="2" fill="currentColor" />
      <circle cy="18" cx="12" r="2" fill="currentColor" />
    </svg>
  )
}