"use client";

import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGolfBag, useGolfBags } from '@/hooks/golf-bags-hook';
import { cn } from '@/lib/utils';
import { Club } from '@/models';
import { DragHandleIcon, PlusIcon, TrashIcon } from './icons';

export function BagEditor({ bagId }: { bagId: string }) {
  const { removeBag, updateBag } = useGolfBags();
  const { bag, setBagName, addClub } = useGolfBag(bagId);
  const canSortBag = bag?.clubs.every(c => typeof c.carry === 'number') ?? false;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    <>
      <Card className="w-full max-w-4xl mt-4 mx-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row justify-between">
              <Input id="bag-name" className="ml-10 mr-2 text-2xl" value={bag.name} placeholder="e.g. My Golf Bag" onChange={e => setBagName(e.target.value)} />
              <Button variant="destructive-outline" size="icon" onClick={() => removeBag(bag, true)} title={`Delete ${bag.name}`}>
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Remove club</span>
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="pl-10">Enter your golf clubs and distances to generate a custom yardage chart.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-2">
              <div className={`grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 items-center`}>
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
              <div className="grid gap-2">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement, restrictToVerticalAxis]}>
                  <SortableContext items={bag.clubs} strategy={verticalListSortingStrategy}>
                    {bag.clubs.map((club, index) => <ClubEditor key={club.id} bagId={bag.id} club={club} index={index} />)}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
            <Button onClick={addClub}>
              <PlusIcon className="mr-2" onClick={() => addClub()} />
              Add Club
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" onClick={autoSortBag}>Sort By Yardage</Button>
          <Button variant="outline">Share</Button>
        </CardFooter>
      </Card>
    </>
  );
}

function ClubEditor({bagId, club, index, ...props}: { bagId: string, index: number, club: Club }) {
  const { updateClub, removeClub } = useGolfBag(bagId);
  
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id: club.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  return (
    <div ref={setNodeRef} style={style} className={`grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 items-center`}>
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
