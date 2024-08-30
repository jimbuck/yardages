'use client';

import { randId } from '@/lib/utils';
import { Club, GolfBag } from '@/models';
import { useEffect, useState } from 'react';

const CLUB_SEPARATOR = '!';
const CLUB_PROPS_SEPARATOR = '_';

export function useBagSerializer(bag: GolfBag) {
	const [serializedBag, setSerializedBag] = useState('');

	useEffect(() => {
		const custom = [
			bag.id,
			_encodeName(bag.name),
			...bag.clubs.map(c => {
				if (!c.name || !c.carry) return null;

				const props = [_encodeName(c.name), c.carry];
				return props.join(CLUB_PROPS_SEPARATOR);

			})].filter(Boolean).join(CLUB_SEPARATOR);
		setSerializedBag(custom);
	}, [bag]);

	return serializedBag;
}

export function useBagParser(raw: string) {
	const [bag, setBag] = useState<GolfBag | null>(null);

	useEffect(() => {
		const [id, name, ...clubs] = raw.split(CLUB_SEPARATOR);
		const parsedClubs = clubs.map(c => {
			const [name, carry] = c.split(CLUB_PROPS_SEPARATOR);
			return {
				id: randId(),
				name: _decodeName(name),
				carry: carry ? parseInt(carry, 10) : null
			} as Club;
		});

		setBag({ id, name: _decodeName(name), clubs: parsedClubs });
	}, [raw]);

	return bag;
}

function _encodeName(value: string) {
	if (!value) return '';
	return encodeURIComponent(value.trim().replaceAll(/\s/g, ''));
}

function _decodeName(value: string) {
	if (!value) return '';
	return decodeURIComponent(value.replace(/([a-z0-9])([A-Z])/g, '$1 $2'));
}