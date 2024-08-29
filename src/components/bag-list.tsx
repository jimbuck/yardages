'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useGolfBags } from '@/hooks/golf-bags-hook';
import { cn } from '@/lib/utils';
import { MouseEvent, PropsWithChildren } from 'react';
import { GolfBag } from '@/models';


export function BagList({ bags, activeBag, className, linkClassName, onClick, children }: PropsWithChildren<{ bags: GolfBag[], activeBag?: GolfBag, className?: string, linkClassName?: string, onClick?: (params: { bag: GolfBag, index: number, bags: GolfBag[], e: MouseEvent }) => void }>) {

	return <nav className={className}>
		{bags.map((bag, index, bags) => (
			<Link key={`${bag.name}_${bag.id}`} className={cn('flex items-center text-white', linkClassName, activeBag && bag.id === activeBag.id && 'bg-emerald-darker hover:bg-emerald-darker cursor-default')} href={`/bag?id=${bag.id}`} onClick={(e) => onClick?.call(null, { e, bag, index, bags })}>
				{bag.name} ({bag.clubs.length})
			</Link>
		))}
		{children}
	</nav>
}