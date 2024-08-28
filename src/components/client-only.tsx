import dynamic from 'next/dynamic';
import React, { PropsWithChildren } from 'react';

export function withNoSSR<P>(Component: React.FunctionComponent<P>) {
	return dynamic(() => Promise.resolve(Component), { ssr: false });
}

function ClientOnlyInternal({ children }: PropsWithChildren<{}>) {
	return <>{children}</>;
}

export const ClientOnly = withNoSSR(ClientOnlyInternal);