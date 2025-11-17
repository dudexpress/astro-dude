// @ts-check
import {defineConfig} from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import {remarkMdxAutoImports} from './src/lib/remark-mdx-auto-imports.mjs';


export default defineConfig({
    site: 'https://dudexpress.github.io',
    base: '/astro-dude',
    integrations: [
        react(),
        mdx({remarkPlugins: [remarkMdxAutoImports]})
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});