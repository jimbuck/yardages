"use client";

import { useAtom } from 'jotai/react';
import { atomWithStorage } from 'jotai/utils';
import { useRouter } from 'next/navigation'

import { Club, GolfBag, STANDARD_CLUBS } from '@/models';
import { randId } from '@/lib/utils';
import { useEffect } from 'react';

export const golfBagsAtom = atomWithStorage<GolfBag[]>('golf-yardage-chart:golf-bags', [], undefined, { getOnInit: true });

export function useGolfBags() {
	const [bags, setBags] = useAtom(golfBagsAtom);

	const router = useRouter();

	const addBag = (bag?: GolfBag) => {
		if (!bag) bag = {
			id: randId(),
			name: `Bag ${bags.length + 1}`,
			clubs: STANDARD_CLUBS.map(c => ({ id: randId(), name: c.name, carry: c.averageCarry })),
		};

		router.push(`/${bag.id}`);
		setBags([...bags, bag]);
	};
	const removeBag = (bag: GolfBag, isCurrentBag: boolean) => {
		const updatedBags = bags.filter((b) => b.id !== bag.id);

		if (isCurrentBag) {
			const index = bags.findIndex((b) => b.id === bag.id);
			const nextBag = updatedBags[Math.max(index - 1, 0)];
			if (nextBag) {
				console.log(`Redirecting to bag ${nextBag.id}`);
				router.replace(`/${nextBag.id}`);
			}

			setTimeout(() => setBags(updatedBags), 100);
		} else {
			setBags(updatedBags)
		}
	};

	const updateBag = (updatedBag: GolfBag) => {
		const updatedBags = [...bags];
		const index = updatedBags.findIndex((b) => b.id === updatedBag.id);
		updatedBags[index] = updatedBag;
		setBags(updatedBags);
	};

	return { bags, updateBag, addBag, removeBag };
}

export function useGolfBag(bagId?: string) {
	const [bags, setBags] = useAtom(golfBagsAtom);
	const bag = bags.find(b => b.id === bagId);

	useEffect(() => { }, []); // Forces CSR

	return { bag, setBagName, addClub, updateClub, removeClub };

	function updateBag(updatedBag: GolfBag) {
		const updatedBags = [...bags];
		const index = updatedBags.findIndex((b) => b.id === updatedBag.id);
		updatedBags[index] = updatedBag;
		setBags(updatedBags);
	}

	function setBagName(name: string) {
		if (!bag) return;

		updateBag({ ...bag, name: name.replaceAll('|', '') });
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
				updatedClubs[index].name = (value as string).replaceAll(/[_|]/gi, '');
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