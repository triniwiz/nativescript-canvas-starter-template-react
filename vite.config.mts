import { defineConfig, mergeConfig } from 'vite';
import { reactConfig } from '@nativescript/vite/react';
import { protect, restore } from './postcss-masonkit.mjs';
import { dynamicImportsToEsm } from './canvas-workarounds.mjs';
import { nativescriptReact } from './react-workarounds.mjs';

export default defineConfig(({ mode }) =>
  mergeConfig(reactConfig({ mode }), {
    plugins: [...nativescriptReact(), dynamicImportsToEsm()],
    optimizeDeps: {
      // MasonKit must load as a single instance over the HMR server. If Vite
      // pre-bundles a subpath (e.g. `/elements`), that copy is routed to the
      // vendor bundle, where MasonKit is deliberately absent, and its exports
      // come back undefined.
      exclude: [
        '@triniwiz/nativescript-masonkit',
        '@triniwiz/nativescript-masonkit/web',
        '@triniwiz/nativescript-masonkit/elements',
      ],
    },
    css: {
      postcss: {
        // Lets Tailwind layout utilities (flex, grid, gap, max-w, ...) reach
        // MasonKit views instead of being stripped for core layouts.
        plugins: [protect(), restore()],
      },
    },
  }),
);
