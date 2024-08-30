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
      <div className="bg-white p-8 shadow-md text-center mt-2 sm:mt-8 mx-2 sm:mx-0 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Yardages!</h1>
        <p className="text-gray-700 mb-6">
          Track the distance you hit with each golf club and improve your game. Get started by creating a new bag or selecting an existing one from the menu.
        </p>
        <p className="text-gray-700 mb-6">
          Once a bag is selected, use the chart tab to view club distances. Adjust the golf ball slider to the target distance to quickly figure out which club to use for your next shot. Use the editor tab to add, update, and remove clubs.
        </p>
        <p className="text-gray-700 mb-6">
          Bags are stored on your device but can be copy to other devices via a share tab. Share your bag with friends via the QR code or via the Share link.
        </p>
        <p className="text-gray-700 mb-6">
          If you enjoy using <strong>Yardages</strong> and would like to see more features, please consider supporting me.
        </p>
        <p className="text-gray-700 mb-6">
          <em>- Jim</em>
        </p>
        <div className="flex flex-col">
          <button onClick={addNewBag} className="flex-1 bg-navy text-white px-4 py-2 hover:bg-navy-light mb-2">
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
