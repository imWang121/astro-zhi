// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import rehypeCodeBlock from './src/plugins/rehype-code-block';
import rehypeImageGallery from './src/plugins/rehype-image-gallery';
import rehypeImageLightbox from './src/plugins/rehype-image-lightbox';
import remarkCallout from './src/plugins/remark-callout';
import compression from 'vite-plugin-compression';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || 'https://example.com',
	integrations: [mdx(), sitemap(), compress()],
	build: {
		inlineStylesheets: 'never',
	},
	vite: {
		plugins: [compression({ algorithm: 'gzip' })],
	},
	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [remarkDirective, remarkCallout],
		rehypePlugins: [rehypeCodeBlock, rehypeImageGallery, rehypeImageLightbox],
	},
});
