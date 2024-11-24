'use client';

import { PropsWithChildren } from 'react';
import { useSearchParams } from 'next/navigation';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

import { store } from '@/hooks/store';
import { MobileNav, SideNav } from '@/components/nav';

export function LayoutContent({ children }: PropsWithChildren<{}>) {
	const searchParams = useSearchParams();
	const bagId = searchParams.get('id') ?? undefined;

	return (<>
		<DevTools store={store} />
		<SideNav bagId={bagId} />
		<div className="w-full flex flex-col">
			{/* <DesktopHeader /> */}
			<MobileNav bagId={bagId} />
			<div className="h-dvh w-full sm:pl-4 mx-auto overflow-y-auto sm:overflow-y-scroll">{children}</div>
		</div>
	</>)
}