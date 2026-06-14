// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import fs from 'node:fs';

// https://astro.build/config
export default defineConfig({
	site: 'https://typingnexus.qzz.io',
	integrations: [
		mdx(),
		sitemap(),
		{
			name: 'copy-sitemap',
			hooks: {
				'astro:build:done': async ({ dir }) => {
					const sitemapIndex = new URL('sitemap-index.xml', dir);
					const sitemap = new URL('sitemap.xml', dir);
					if (fs.existsSync(sitemapIndex)) {
						fs.copyFileSync(sitemapIndex, sitemap);
					}
				},
			},
		},
	],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
