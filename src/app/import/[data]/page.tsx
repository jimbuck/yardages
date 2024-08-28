'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { YardageChart } from '@/components/yardage-chart';
import { useGolfBags } from '@/hooks/golf-bags-hook';
import { useBagParser } from '@/hooks/share-bag';
import { cn } from '@/lib/utils';
import { GolfBag } from '@/models';

export default function ImportBag({ params }: { params: { data: string } }) {
	const router = useRouter();

	const bag = useBagParser(params.data);
	const { bags, addBag } = useGolfBags();

	if (!bag) return (<p>Loading...</p>);

	const bagExists = bags.some(b => b.id === bag.id);
	const matchingName = bags.some(b => b.name === bag.name);

	return (
		<div className="flex flex-col justify-center max-w-sm mx-auto">
			<h1 className="text-2xl">Import Bag?</h1>
			<ul className={cn('hidden text-destructive', (bagExists || matchingName) && 'block')}>
				{bagExists && <li><Link className="underline" href={`/${bag.id}`}>This bag already exists</Link> in your collection.</li>}
				{(!bagExists && matchingName) && <li>You have another bag with the same name.</li>}
			</ul>
			<YardageChart bag={bag} />
			<div className="grid grid-cols-[1fr_1fr] gap-2">
				<button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold py-2 mt-5 rounded-lg flex items-center justify-center" onClick={() => router.push('/')}>No</button>
				<button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold py-2 mt-5 rounded-lg flex items-center justify-center" disabled={bagExists} onClick={() => saveBag(bag)}>Yes</button>
			</div>
		</div>
	);

	function saveBag(bag: GolfBag) {
		if (matchingName) bag = { ...bag, name: `${bag.name} (${bag.id})` };
		addBag(bag);
		router.push(`/${bag.id}`);
	}
}