import { fileURLToPath } from 'node:url';

/**
 * @returns {import('vite').Plugin[]}
 */
export function nativescriptReact() {
  return [keepBrowserGlobals()];
}

/**
 * Keeps @nativescript-community/react from replacing browser globals.
 *
 * The renderer's `src/dom.js` calls DOMiNATIVE's `globalRegister(globalThis)`,
 * which copies every element class onto globalThis: `Image`, `Document`,
 * `SVGElement`, `Event`, `EventTarget`, `HTMLElement`, `Frame`, ... That
 * replaces the canvas polyfill's classes, which three.js and PixiJS rely on,
 * and the iOS runtime's own `Event` and `EventTarget`. This resolves that one
 * import to src/react-dom.ts, which keeps the rest of what it does.
 *
 * @returns {import('vite').Plugin}
 */
function keepBrowserGlobals() {
  const RENDERER = /[\\/]node_modules[\\/]@nativescript-community[\\/]react[\\/]src[\\/]renderer\.js$/;
  const replacement = fileURLToPath(new URL('./src/react-dom.ts', import.meta.url)).replace(/\\/g, '/');

  return {
    name: 'nativescript-react-keep-browser-globals',
    enforce: 'pre',
    resolveId: {
      order: 'pre',
      handler(source, importer) {
        if (source === './dom.js' && importer && RENDERER.test(importer.split('?')[0])) {
          return replacement;
        }
        return null;
      },
    },
  };
}
