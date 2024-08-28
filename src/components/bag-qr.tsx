import QRCode from 'react-qr-code';
import { GolfBag } from '@/models';

import { useBagSerializer } from '@/hooks/share-bag';

export function BagQR({ bag }: { bag: GolfBag }) {
	const serializeBag = useBagSerializer(bag);

	const bagLink = `${window.origin}/import/${serializeBag}`;

	return (<div>
		<QRCode value={bagLink} />
		<a href={bagLink} target="_blank" rel="noreferrer" className="block text-center text-blue-500 underline">Share your Bag</a>
	</div>);
}
