import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Canvas } from '@nativescript/canvas';
import { runDemo, type Demo, type DemoInstance } from '../canvas/runner';

/**
 * A <canvas> that runs a demo (see src/demos), filling the width it is
 * given. With `height` (dp) it is that tall; without, it fills the height its
 * box gets from classes (`flex-1`, `h-*`). Children are layered on top of the
 * canvas, so MasonKit content (badges, captions, controls) can sit over the
 * drawing.
 *
 * The canvas sits in an absolutely positioned box, so like any out-of-flow
 * content it adds nothing to its container's size. In flow, its backing store
 * would be its intrinsic size (as on the web), and a flex item's automatic
 * minimum height would grow with every resize the runner makes to match it.
 *
 * The size is set on the canvas as a style, not with classes: the canvas sets
 * its own width/height as local style values, which outrank class rules.
 */
export function CanvasView<T extends DemoInstance>(props: {
  demo: Demo<T>;
  height?: number;
  className?: string;
  onStarted?: (instance: T) => void;
  children?: ReactNode;
}) {
  const [error, setError] = useState<string | null>(null);
  const stop = useRef<(() => void) | null>(null);
  // The latest props, for callbacks made after this render.
  const latest = useRef(props);
  latest.current = props;

  useEffect(
    () => () => {
      stop.current?.();
      stop.current = null;
    },
    [],
  );

  // Stable, so re-renders don't re-bind the native listener.
  const onLoaded = useCallback(({ object }: { object: Canvas }) => {
    if (stop.current) {
      return;
    }
    stop.current = runDemo(
      object,
      latest.current.demo,
      (instance) => latest.current.onStarted?.(instance),
      (reason: any) => setError(String(reason?.message ?? reason)),
    );
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${props.className ?? ''}`}
      style={props.height ? { height: props.height } : undefined}
    >
      <div className="absolute inset-0">
        <canvas style={{ width: '100%', height: '100%' }} onLoaded={onLoaded} />
      </div>
      {props.children}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950 p-6">
          <span className="text-sm font-semibold text-rose-300">This demo couldn't start</span>
          <p className="text-center text-xs text-slate-400">{error}</p>
        </div>
      )}
    </div>
  );
}
