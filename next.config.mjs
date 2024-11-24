import nextPWA from 'next-pwa';

const withPWA = nextPWA({ dest: 'public' });


const nextConfig = withPWA({
	transpilePackages: ['jotai-devtools'],
	experimental: {
		swcPlugins: [['@swc-jotai/debug-label', {}]],
	},
});

export default nextConfig;
