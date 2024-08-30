'use client';

import { useEffect, useMemo } from 'react'

function getMobileDetect(userAgent: NavigatorID['userAgent']) {
	const isAndroid = Boolean(userAgent.match(/Android/i))
	const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i))
	const isOperaMini = Boolean(userAgent.match(/Opera Mini/i))
	const isWindowsMobile = Boolean(userAgent.match(/IEMobile/i))
	const isSSR = Boolean(userAgent.match(/SSR/i))
	const isMobile = Boolean(isAndroid || isIos || isOperaMini || isWindowsMobile)
	const isDesktop = Boolean(!isMobile && !isSSR)
	return {
		isMobile,
		isDesktop,
		isAndroid,
		isIos,
		isSSR,
	}
}

export default function useMobileDetect() {
	useEffect(() => { }, []);
	const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

	const mobileDetect = useMemo(() => getMobileDetect(userAgent), [userAgent]);

	return mobileDetect;
};