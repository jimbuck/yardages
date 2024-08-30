"use client";

import { useState } from 'react';
import Link from 'next/link';

import { useGolfBags } from '@/hooks/golf-bags-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  const { bags, addBag } = useGolfBags();

  const [isCreatingNewBag, setIsCreatingNewBag] = useState(false);

  if (isCreatingNewBag) {
    return (<p className="p-4 text-center">Adding a new bag to get started...</p>);
  }

  return (<>
    <div className="flex items-start justify-center min-h-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center mt-8 mx-2 sm:mx-0">
        <h1 className="text-2xl font-bold mb-4">Welcome to Club Yard Chart!</h1>
        <p className="text-gray-700 mb-6">
          Track the distance you hit with each golf club and improve your game.
          Get started by creating a new bag or selecting an existing one from the menu.
          Once a bag is selected, use the golf ball slider to quickly figure out which club to use for your next shot.
        </p>
        <div className="flex flex-col">
          <button onClick={addNewBag} className="flex-1 bg-navy text-white px-4 py-2 hover:bg-navy-light">
            <FontAwesomeIcon icon={faPlus} className='mr-2' /> New Bag
          </button>
          {bags.map(bag => <Link key={bag.id} href={`/bag?id=${bag.id}`} className="flex-1 bg-emerald text-white px-4 py-2 mt-2 hover:bg-emerald-light">{bag.name}</Link>)}
        </div>
      </div>
    </div>
  </>);

  function addNewBag() {
    setIsCreatingNewBag(true);
    addBag();
  }
}
