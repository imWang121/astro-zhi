import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			draft: z.boolean().optional().default(false),
			abbrlink: z.string().optional(),
			badge: z.string().optional(),
			tags: z.array(z.string()).optional().default([]),
			archive: z.boolean().optional().default(true),
		}),
});

export const collections = { blog };
