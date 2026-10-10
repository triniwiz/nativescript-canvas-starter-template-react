// Browser globals (window, document, Image, fetch, ...) that three.js, PixiJS
// and the SVG DOM expect. Import it before anything that uses them.
import '@nativescript/canvas-polyfill';
// Installs DOMiNATIVE's DOM, which React renders into.
import '@nativescript-community/react';
import { makeView, registerElement, scope } from 'dominative';
import { View } from '@triniwiz/nativescript-masonkit';
import { getMasonKitElements } from '@triniwiz/nativescript-masonkit/elements';
import { Canvas } from '@nativescript/canvas';
import { Svg } from '@nativescript/canvas-svg';

// Start every MasonKit element from Tailwind's preflight baseline
// (border-box, no UA margins/padding). Must run before any view is created.
View.preflight = true;

/**
 * Teaches DOMiNATIVE to put children, text nodes included, into a MasonKit
 * container in the order React gives them.
 */
function masonContainer(base: any) {
  const view: any = makeView(base, { childrenPolicy: 'layout' });

  return class MasonElement extends view {
    constructor(...args: any[]) {
      super(...args);
      this.__dominative_role = 'Layout';
    }

    __dominative_onInsertChild(child: any, ref: any) {
      if (child.nodeType === 3) {
        try {
          super.insertBefore(child, ref ?? child.nextSibling ?? null);
        } catch {
          super.insertBefore(child, ref ?? null);
        }
        return;
      }
      if (!ref) {
        const next = child.nextSibling;
        if (next != null) {
          try {
            super.insertBefore(child, next);
            return;
          } catch {
            // Falls through to append.
          }
        }
        this.addChild(child);
        return;
      }
      super.__dominative_onInsertChild(child, ref);
    }

    __dominative_onRemoveChild(child: any) {
      if (child.nodeType === 3) {
        super.removeChild(child);
        return;
      }
      super.__dominative_onRemoveChild(child);
    }
  };
}

function register(tag: string, element: any) {
  // DOMiNATIVE registers some tags (`button`, `span`, `image`, ...) for core
  // NativeScript views; drop those so ours win.
  delete (scope as any)[tag];
  registerElement(tag, element);
}

// MasonKit's elements (<view>, <text>, <scroll>, <button>, ...) and the
// HTML-shaped ones (<div>, <section>, <h1>, <p>, <span>, ...).
for (const { tag, ctor, isContainer } of getMasonKitElements()) {
  register(tag.toLowerCase(), isContainer ? masonContainer(ctor) : makeView(ctor, {}));
}

// <canvas> (2D, WebGL, WebGL2, WebGPU) and <svg> are regular NativeScript
// views, so they sit in MasonKit layouts and take Tailwind classes like any
// other element.
register('canvas', makeView(Canvas, {}));
register('svg', makeView(Svg, {}));
