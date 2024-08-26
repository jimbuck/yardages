'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useGolfBags } from '@/hooks/golf-bags-hook';
import { cn } from '@/lib/utils';
import { MouseEvent, PropsWithChildren } from 'react';
import { GolfBag } from '@/models';


export function BagList({ className, linkClassName, onClick, children }: PropsWithChildren<{ className?: string, linkClassName?: string, onClick?: (params: { bag: GolfBag, index: number, bags: GolfBag[], e: MouseEvent }) => void }>) {

	const { bag: activeBagId } = useParams();
	const { bags } = useGolfBags();

	return <nav className={className}>
		{bags.map((bag, index, bags) => (
			<Link key={`${bag.name}_${bag.id}`} className={cn('flex items-center text-white', linkClassName, bag.id === activeBagId && 'bg-emerald-darker hover:bg-emerald-darker cursor-default')} href={`/${bag.id}`} onClick={(e) => onClick?.call(null, { e, bag, index, bags })}>
				{bag.name} ({bag.clubs.length})
			</Link>
		))}
		{children}
	</nav>
}