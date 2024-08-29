import QRCode from 'react-qr-code';
import { GolfBag } from '@/models';

import { useBagSerializer } from '@/hooks/share-bag';

export function BagQR({ bag }: { bag: GolfBag }) {
	const serializeBag = useBagSerializer(bag);

	const bagLink = `${window.origin}/import/${serializeBag}`;

	return (<div>
		<QRCode value={bagLink} />
		<div className="grid grid-cols-[1fr_1fr]">
			<a href={bagLink} target="_blank" rel="noreferrer" className="block text-center text-blue-500 underline">Link</a>
			<button onClick={() => navigator.share({ url: bagLink, text: bag.name, title: 'Yardage Chart' })} className="block text-center text-blue-500 underline">Share</button>
		</div>
	</div>);
}
