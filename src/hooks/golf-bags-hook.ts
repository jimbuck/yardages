"use client";

import { atom } from 'jotai';
import { useAtom } from 'jotai/react';
import { atomWithStorage } from 'jotai/utils';

import { Club, GolfBag, STANDARD_CLUBS } from '@/models';
import { randId } from '@/lib/utils';

const golfBagsAtom = atomWithStorage<GolfBag[]>('golf-yardage-chart:golf-bags', []);
const activeBagIdAtom = atomWithStorage<string | undefined>('golf-yardage-chart:active-bag', undefined);
export const activeBagAtom = atom(get => {
	const bags = get(golfBagsAtom);
	let id = get(activeBagIdAtom);
	return typeof id === 'undefined' ? undefined : bags.find(b => b.id === id);
});

export function useGolfBags() {
	const [bags, setBags] = useAtom(golfBagsAtom);
	const [activeBag] = useAtom(activeBagAtom);
	const [activeBagId, setActiveBagId] = useAtom(activeBagIdAtom);

	const addBag = (bag?: GolfBag) => {
		if (!bag) bag = {
			id: randId(),
			name: `Bag ${bags.length + 1}`,
			clubs: STANDARD_CLUBS.map(c => ({ id: randId(), name: c.name, carry: c.averageCarry })),
		};

		setBags([...bags, bag]);
		if (!activeBag) setActiveBagId(bag.id);
	};
	const removeBag = (bag: GolfBag) => {
		const index = bags.findIndex((b) => b.id === bag.id);
		let updatedBags = bags.filter((b) => b.id !== bag.id);
		setBags(updatedBags);
		const nextBag = updatedBags[Math.max(index - 1, 0)];
		if (nextBag) setActiveBagId(nextBag.id);
	};

	const chooseBag = (bag: GolfBag | string) => {
		if (typeof bag !== 'string') bag = bag.id;

		setActiveBagId(bag);
	};

	const updateBag = (updatedBag: GolfBag) => {
		const updatedBags = [...bags];
		const index = updatedBags.findIndex((b) => b.id === updatedBag.id);
		updatedBags[index] = updatedBag;
		setBags(updatedBags);
	};

	return { bags, activeBag, chooseBag, updateBag, addBag, removeBag };
}

export function useGolfBag() {
	const [bags, setBags] = useAtom(golfBagsAtom);
	const [bag] = useAtom(activeBagAtom);

	return { bag, setBagName, addClub, updateClub, removeClub };

	function updateBag(updatedBag: GolfBag) {
		const updatedBags = [...bags];
		const index = updatedBags.findIndex((b) => b.id === updatedBag.id);
		updatedBags[index] = updatedBag;
		setBags(updatedBags);
	}

	function setBagName(name: string) {
		if (!bag) return;

		updateBag({ ...bag, name });
	}

	function addClub() {
		if (!bag) return;

		updateBag({ ...bag, clubs: [...bag.clubs, { id: randId(), name: '' }] });
	}

	function updateClub(clubId: string, field: keyof Club, value: Club[keyof Club]) {
		if (!bag) return;

		const updatedClubs = [...bag.clubs];
		const index = bag.clubs.findIndex((c) => c.id === clubId);
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

	function removeClub(club: Club | string) {
		if (!bag) return;

		if (typeof club !== 'string') club = club.id;

		const updatedClubs = bag.clubs.filter((c) => c.id !== club);
		updateBag({ ...bag, clubs: updatedClubs });
	}
}