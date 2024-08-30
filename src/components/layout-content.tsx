'use client';

import { PropsWithChildren } from 'react';
import { useSearchParams } from 'next/navigation';


import { MobileNav, SideNav } from '@/components/nav';

export function LayoutContent({ children }: PropsWithChildren<{}>) {
	const searchParams = useSearchParams();
	const bagId = searchParams.get('id') ?? undefined;

	return (<>
		<SideNav bagId={bagId} />
		<div className="w-full flex flex-col">
			{/* <DesktopHeader /> */}
			<MobileNav />
			<div className="h-dvh w-full mx-auto overflow-y-auto sm:overflow-y-scroll">{children}</div>
		</div>
	</>)
}