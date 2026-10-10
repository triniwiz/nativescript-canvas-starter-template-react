import type { EventData } from '@nativescript/core';
import type { Canvas } from '@nativescript/canvas';
import 'react';

// React's DOM typings already cover the HTML-shaped MasonKit elements (<div>,
// <section>, <span>, <button>, ...). These add what NativeScript brings on top.
// `onClick` is a NativeScript `tap`; any other `on<Event>` prop listens for the
// NativeScript event of that name (`onLoaded` → `loaded`).
declare module 'react' {
  interface CanvasHTMLAttributes<T> {
    /** The canvas joined the visual tree; `args.object` is the canvas. */
    onLoaded?: (args: EventData & { object: Canvas }) => void;
  }

  interface SVGAttributes<T> {
    /** SVG markup (or a path to a file) for @nativescript/canvas-svg to draw. */
    src?: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      /** MasonKit's scroll container. */
      scroll: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
