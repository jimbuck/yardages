'use client';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGolfBags } from '@/hooks/golf-bags-hook';
import { GolfBag } from '@/models';
import { YardageChart } from '@/components/yardage-chart';
import { Button } from '@/components/ui/button';


export default function Print() {
	const { bags } = useGolfBags();
	
	const [selectedBags, setSelectedBags] = useState<{ [bagId: string]: GolfBag | null }>(() => bags.reduce((acc, bag) => ({ ...acc, [bag.id]: bag }), {}));

	return (<>
		<div className="flex items-start justify-center min-h-full bg-gray-100">
			<div className="bg-white p-8 shadow-md w-full max-w-full w-fit sm:max-w-4xl text-center mt-2 sm:mt-8 mx-2 sm:mx-0">
				<div className="print:hidden">
			{bags.map((bag, index) => (
				<div key={`${bag.name}_${bag.id}`} className="bg-white p-4 mb-4">
					<Input type="checkbox" id={`print-bag-${bag.name}_${bag.id}`} className="mr-2" checked={!!selectedBags[bag.id]} onChange={e => toggleSelectedBag(bag, e.target.checked)} />
					<Label htmlFor={`print-bag-${bag.name}_${bag.id}`} className="text-2xl font-bold">{bag.name} ({bag.clubs.length})</Label>
				</div>
			))}
		</div>
		<Button onClick={() => window.print()}>Print</Button>
    <div className="printable hidden flex flex-rows flex-wrap print:p-4 print:grid print:grid-cols-[1fr_1fr] print:gap-4 print:text-sm">
			{Object.keys(selectedBags).map(bagId => selectedBags[bagId] && <YardageChart key={bagId} bag={selectedBags[bagId]} />)}
    </div>
			</div>
		</div>
	</>);
	
	function toggleSelectedBag(bag: GolfBag, checked: boolean) {
		'use client';

		setSelectedBags({ ...selectedBags, [bag.id]: checked ? bag : null });
	}
}