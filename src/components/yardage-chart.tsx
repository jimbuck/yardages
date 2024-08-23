"use client";

import { useGolfBag } from '@/hooks/golf-bags-hook';
import { Club } from '@/models';


export function YardageChart({ bagId }: { bagId: string }) {
	const { bag } = useGolfBag(bagId);

	if (!bag) return (<></>);

	return (<>
		<div className="p-2 pt-4 break-inside-avoid-page">
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
						<tr key={i} className="relative">
							<td className="border px-2">{club.name}</td>
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
	return (<>{[currClub.carry, currClub.total].filter(Boolean).join('/')}</>)
}

function ClubDiff({ prevClub, currClub }: { prevClub: Club | undefined, currClub: Club }) {
	if (!prevClub) return <></>;

	const carryDiff = currClub.carry && prevClub.carry ? prevClub.carry - currClub.carry : undefined;
	const totalDiff = currClub.total && prevClub.total ? prevClub.total - currClub.total : undefined;

	return (<>&nbsp;{[
		(typeof carryDiff === 'number' && carryDiff >= 0 ? ('+' + carryDiff) : carryDiff),
		(typeof totalDiff === 'number' && totalDiff >= 0 ? ('+' + totalDiff) : totalDiff),
	].filter(Boolean).join('/')}</>);
}