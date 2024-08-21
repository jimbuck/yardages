"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGolfBag, useGolfBags } from '@/hooks/golf-bags-hook';

export function BagEditor({ }: {}) {
  const { removeBag } = useGolfBags();
  const { bag, setBagName, addClub, updateClub, removeClub } = useGolfBag();

  const printChart = () => {
    window.print();
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row">
            Yardage Chart
            <Button variant="outline" size="icon" onClick={() => removeBag(bag)}>
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Remove club</span>
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Input your golf club types and distances to generate a custom yard chart.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="bag-name">Bag Name</Label>
            <Input id="bag-name" value={bag.name} placeholder="e.g. My Golf Bag" onChange={e => setBagName(e.target.value)} />
          </div>
          <div className="grid gap-4">
            {bag.clubs.map((club, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center">
                <div className="grid gap-2">
                  {index === 0 && <Label htmlFor={`club-type-${index}`}>Club Type</Label>}
                  <Input
                    id={`club-type-${index}`}
                    value={club.name}
                    onChange={(e) => updateClub(index, "name", e.target.value)}
                    placeholder={index === 0 ? 'e.g. Driver, 5-Iron, Wedge' : ''}
                  />
                </div>
                <div className="grid gap-2">
                  {index === 0 && <Label htmlFor={`club-carry-${index}`}>Carry</Label>}
                  <Input
                    id={`club-carry-${index}`}
                    type="number"
                    value={club.carry}
                    onChange={(e) => updateClub(index, "carry", e.target.value ? Number(e.target.value) : undefined)}
                    placeholder={index === 0 ? 'e.g. 250, 180, 100' : ''}
                  />
                </div>
                <div className="grid gap-2">
                  {index === 0 && <Label htmlFor={`club-total-${index}`}>Total</Label>}
                  <Input
                    id={`club-total-${index}`}
                    type="number"
                    value={club.total}
                    onChange={(e) => updateClub(index, "total",  e.target.value ? Number(e.target.value) : undefined)}
                    placeholder={index === 0 ? "e.g. 250, 180, 100" : ''}
                  />
                </div>
                <div className="grid gap-2">
                  {index === 0 && <Label htmlFor={`delete-club-${index}`}>&nbsp;</Label>}
                  <Button variant="outline" size="icon" onClick={() => removeClub(club)}>
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Remove club</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={addClub}>
            <PlusIcon className="h-4 w-4 mr-2" onClick={() => addClub()} />
            Add Club
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={printChart}>
          <PrinterIcon className="h-4 w-4 mr-2" />
          Print Chart
        </Button>
        <Button>Generate Chart</Button>
      </CardFooter>
    </Card>
  )
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
