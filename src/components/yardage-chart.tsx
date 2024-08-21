"use client";

import { Club, GolfBag } from '@/models';


export function YardageChart({ bag }: { bag: GolfBag }) {
	
	return (<>
		<div className="printable hidden print:block">
			<table className="table-auto w-full">
				<thead>
					<tr className="text-2xl bg-primary text-primary-foreground">
						<th className="border" colSpan={4}>Yardage Chart</th>
					</tr>
					<tr className='text-primary'>
						<th className="border text-xl bg-zinc-600">Club</th>
						<th className="border text-xl bg-zinc-600">Yardage</th>
						<th className="border text-xl bg-zinc-600">Diff</th>
						<th className="border text-xl bg-zinc-600">Notes</th>
					</tr>
				</thead>
				<tbody>
					{bag.clubs.map((club, i) => (
						<tr key={i}>
							<td className="border">{club.name}</td>
							<td className="border">
								<ClubDist currClub={club} />
							</td>
							<td className="border relative overflow-visible">
								<div className={`absolute -top-3 bg-white w-full border-r ${i > 0 ? 'border-b' : ''} ${i === 1 ? 'border-t' : ''}`}>
									<ClubDiff prevClub={bag.clubs[i - 1]} currClub={club} />
								</div>
							</td>
							<td className="border"></td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td className="border" colSpan={4}>Remember:</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</>);
}

function ClubDist({ currClub }: { currClub: Club }) {
	return (<>{[currClub.carry, currClub.total].filter(Boolean).join(' / ')}</>)
}

function ClubDiff({ prevClub, currClub }: { prevClub: Club | undefined, currClub: Club }) {
	if (!prevClub) return <></>;

	const carryDiff = currClub.carry && prevClub.carry ? prevClub.carry - currClub.carry : undefined;
	const totalDiff = currClub.total && prevClub.total ? prevClub.total - currClub.total : undefined;

	return (<>&nbsp;{[
		(carryDiff && carryDiff > 0 ? ('+' + carryDiff) : carryDiff),
		(totalDiff && totalDiff > 0 ? ('+' + totalDiff) : totalDiff),
	].filter(Boolean).join(' / ')}</>)
}