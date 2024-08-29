"use client";

import { cn } from '@/lib/utils';
import { Club, GolfBag } from '@/models';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useMemo } from 'react';


export function YardageChart({ bag, highlighted }: { bag: GolfBag, highlighted?: Club[] }) {
	if (!bag) return (<></>);

	const highlightedIds = (highlighted || []).map(club => club.id);

	return (<>
		<div className="p-2 pt-4 break-inside-avoid-page w-fit print:mx-0">
			<table className="table-auto w-80">
				<thead>
					<tr className="text-lg text-primary">
						<th className="border" colSpan={4}>{bag.name}</th>
					</tr>
					<tr className='text-primary'>
						<th className="border bg-zinc-600 px-2">Club</th>
						<th className="border bg-zinc-600 px-2">Yards</th>
						<th className="border bg-zinc-600 px-2">Diff</th>
					</tr>
				</thead>
				<tbody>
					{bag.clubs.map((club, i) => (
						<tr key={i} className={cn("relative")}>
							<td className={cn("border px-2", highlightedIds.length && 'bg-secondary', highlightedIds.includes(club.id) && 'bg-white')}>{club.name}</td>
							<td className="border px-2">
								<ClubDist currClub={club} />
							</td>
							<td className="border pr-4 relative overflow-visible border-r-0 border-b-0">
								<div className={`absolute left-0 -top-3 pr-2 text-right text-primary/60 bg-white w-full border-r ${i > 0 ? 'border-b' : ''} ${i === 1 ? 'border-t' : ''}`}>
									<ClubDiff prevClub={bag.clubs[i - 1]} currClub={club} />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</>);
}

function ClubDist({ currClub }: { currClub: Club }) {
	return (<>{currClub.carry ?? ''}</>)
}

function ClubDiff({ prevClub, currClub }: { prevClub: Club | undefined, currClub: Club }) {
	if (!prevClub) return <></>;

	const carryDiff = currClub.carry && prevClub.carry ? prevClub.carry - currClub.carry : undefined;

	return (<>&nbsp;{[
		(typeof carryDiff === 'number' && carryDiff >= 0 ? ('+' + carryDiff) : carryDiff),
	].filter(Boolean).join('/')}</>);
}


const targetDistanceAtom = atomWithStorage('golf-yardage-chart:targetDistance', 150, undefined, { getOnInit: true });

export function InteractiveYardageChart({ bag }: { bag: GolfBag }) {
	const [targetDistance, setTargetDistance] = useAtom(targetDistanceAtom);

	const minDistance = useMemo(() => Math.min(...bag.clubs.map(club => club.carry || 999)), [bag]) - 15;
	const maxDistance = useMemo(() => Math.max(...bag.clubs.map(club => club.carry || 0)), [bag]) + 15;

	const suggestedClub = useMemo(() => {

		for (let i = bag.clubs.length - 1; i >= 0; i--) {
			const club = bag.clubs[i];
			if (club.carry && club.carry >= targetDistance) return club;
		}

		return bag.clubs[0];
	}, [bag, targetDistance]);

	return (<>
		<div className="flex justify-center">
			<YardageChart bag={bag} highlighted={[suggestedClub]} />
			<div className="print:hidden pt-12 flex flex-col">
				<div className="w-8 text-center">
					{targetDistance}
				</div>
				<div className="flex-1 flex flex-col">
					<input type="range" className="flex-1 rotate-180 [writing-mode:vertical-lr] target-range-input" min={minDistance} max={maxDistance} step="1" list="stock-club-distances" value={targetDistance} onChange={e => setTargetDistance(Number(e.target.value))} />
					{/* <datalist id="stock-club-distances">
						{bag.clubs.filter(c => c.carry).map(club => <option key={club.id} value={club.carry} />)}
					</datalist> */}
				</div>
			</div>
		</div>
	</>)
}