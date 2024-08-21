"use client";

import { atom } from 'jotai';
import { useAtom } from 'jotai/react';
import { atomWithStorage } from 'jotai/utils';

import { Club, GolfBag } from '@/models';

const golfBagsAtom = atomWithStorage<GolfBag[]>('golf-yardage-chart:golf-bags', [{ name: 'Bag 1', clubs: [] }]);
const activeBagIndexAtom = atomWithStorage<number>('golf-yardage-chart:active-bag', 0);
const activeBagAtom = atom(get => {
	const bags = get(golfBagsAtom);
	let index = get(activeBagIndexAtom);
	if (index >= bags.length) index = 0;
	return bags[index];
});

export function useGolfBags() {
	const [bags, setBags] = useAtom(golfBagsAtom);
	const [activeBag] = useAtom(activeBagAtom);
	const [activeBagIndex, setActiveBagIndex] = useAtom(activeBagIndexAtom);

	const addBag = (bag: GolfBag = { name: `Bag ${bags.length + 1}`, clubs: [] }) => {
		setBags([...bags, bag]);
	};
	const removeBag = (bag: GolfBag) => {
		let updatedBags = bags.filter((b) => b !== bag);
		if (updatedBags.length === 0) updatedBags = [{ name: 'Bag 1', clubs: [] }];
		setBags(updatedBags);
	};

	const chooseBag = (bag: GolfBag | number) => {
		if (typeof bag !== 'number') bag = bags.findIndex(b => b === bag);

		if (bag >= 0) setActiveBagIndex(bag);
	};

	return { bags, activeBag, chooseBag, addBag, removeBag };
}

export function useGolfBag() {
	const [bags, setBags] = useAtom(golfBagsAtom);
	const [bag] = useAtom(activeBagAtom);
	const [activeBagIndex, setActiveBagIndex] = useAtom(activeBagIndexAtom);

	return { bag, setBagName, addClub, updateClub, removeClub };

	function updateBag(updatedBag: GolfBag) {
		const updatedBags = [...bags];
		updatedBags[activeBagIndex] = updatedBag;
		setBags(updatedBags);
	}

	function setBagName(name: string) {
		if (!bag) return;

		updateBag({ ...bag, name });
	}

	function addClub() {
		if (!bag) return;

		updateBag({ ...bag, clubs: [...bag.clubs, { name: '' }] });
	}

	function updateClub(index: number, field: keyof Club, value: Club[keyof Club]) {
		if (!bag) return;

		const updatedClubs = [...bag.clubs];
		switch (field) {
			case 'name':
				updatedClubs[index].name = value as string;
				break;
			case 'carry':
				updatedClubs[index].carry = value as number;
				break;
			case 'total':
				updatedClubs[index].total = value as number;
				break;
		}
		updateBag({ ...bag, clubs: updatedClubs });
	}

	function removeClub(club: Club) {
		if (!bag) return;

		const updatedClubs = bag.clubs.filter((c) => c !== club);
		updateBag({ ...bag, clubs: updatedClubs });
	}
}