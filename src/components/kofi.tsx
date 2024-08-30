'use client';

import { Donate } from 'react-kofi-overlay';

const KOFI_USERNAME = 'jimbuck';
const KOFI_MESSAGE = '🍺 Support the Dev';

export function KoFiOverlay() {

	return <>
		<Donate
			username={KOFI_USERNAME}
			classNames={{
				donateBtn: 'bg-navy text-white hover:bg-navy-lighter',
				profileLink: ''
			}}
			styles={{
				donateBtn: {
					borderRadius: 0,
					backgroundColor: '#051130'
				},
				panel: {}
			}}
			onToggle={(open) => {
				console.log(`Donate panel ${open ? 'opened' : 'closed'}`)
			}}
		>
			{KOFI_MESSAGE}
		</Donate>
	</>;
}