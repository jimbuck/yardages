"use client";

import { PropsWithChildren, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faTimes, faPrint } from '@fortawesome/free-solid-svg-icons';

import { cn } from "@/lib/utils";
import { useGolfBag, useGolfBags } from '@/hooks/golf-bags-hook';
import { BagList } from '@/components/bag-list';
import { KoFiOverlay } from '@/components/kofi';

import icon from '../../public/icon_512.png';


export function SideNav({ bagId }: { bagId?: string }) {
	const { bags, addBag } = useGolfBags();
	const { bag } = useGolfBag(bagId);

	return (<aside className="relative bg-emerald h-screen w-64 hidden sm:block">
		<div className="p-6">
			<Link href="/?stay" className="group">
				<Image src={icon} alt="Yardages Logo" width={128} height={128} className="mx-auto" />
				<h1 className="text-white text-3xl text-center font-semibold uppercase group-hover:text-gray-300">Yardages</h1>
			</Link>
			<button className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-2 mt-5 flex items-center justify-center" onClick={() => addBag()}>
				<FontAwesomeIcon icon={faPlus} className='mr-2' /> New Bag
			</button>
		</div>
		<BagList bags={bags} activeBag={bag} className="text-white text-base font-semibold pt-3"
			linkClassName="py-4 pl-6 hover:bg-emerald-dark" />

		<div className="absolute w-full bottom-0 pt-2">
			<Link href="/print" className="block text-center bg-navy hover:bg-navy-light text-white font-semibold mx-4 py-2 items-center justify-center mb-2">
				<FontAwesomeIcon icon={faPrint} className='mr-1' /> Print
			</Link>
			<MadeWithLove />
		</div>
	</aside>)
}

const isMobileHeaderOpenAtom = atomWithStorage('golf-yardage-chart:isMobileHeaderOpen', false);

export function MobileNav({ bagId }: { bagId?: string }) {
	const { bags, addBag } = useGolfBags();
	const { bag } = useGolfBag(bagId);
	const path = usePathname();

	const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useAtom(isMobileHeaderOpenAtom);

	useEffect(() => {
		setIsMobileHeaderOpen(false);
	}, [path, setIsMobileHeaderOpen]);

	return (<header className="w-full bg-emerald sm:hidden">
		<div className={cn('flex items-center justify-between pt-5 px-6', !isMobileHeaderOpen && 'pb-4')}>
			<Link href="/?stay" className="text-white text-3xl font-semibold uppercase"><Image src={icon} alt="Yardages Logo" width={48} height={48} className="inline" /> Yardages</Link>
			<button
				onClick={() => setIsMobileHeaderOpen(isOpen => !isOpen)}
				className="text-white text-3xl focus:outline-none" >
				<FontAwesomeIcon icon={isMobileHeaderOpen ? faTimes : faBars} />
			</button>
		</div>

		{/* Dropdown Nav */}
		<BagList bags={bags} activeBag={bag} className={cn('flex flex-col pt-4', isMobileHeaderOpen ? "flex" : "hidden")} linkClassName="py-2 pl-6">
			<div className="grid grid-cols-[1fr_1fr] py-4 mx-4 gap-x-2">
				<button className="bg-navy hover:bg-navy-light text-white block font-semibold px-4 py-2 items-center justify-center" onClick={() => addBag()}>
					<FontAwesomeIcon icon={faPlus} className='mr-1' /> Add Bag
				</button>
				<Link href="/print" onClick={() => setIsMobileHeaderOpen(false)} className="block text-center bg-navy hover:bg-navy-light text-white font-semibold px-4 py-2 items-center justify-center">
					<FontAwesomeIcon icon={faPrint} className='mr-1' /> Print
				</Link>
			</div>
			<MadeWithLove />
		</BagList>
	</header>);
}

function MadeWithLove({ className }: { className?: string }) {
	return <div className={cn('bg-emerald-dark text-white text-center py-2', className)}>
		Made with ❤️ by<a href="https://jimbuck.io" className="text-white hover:underline ml-1">Jim Buck</a>
		<div>
			<KoFiOverlay />
		</div>
	</div>
}