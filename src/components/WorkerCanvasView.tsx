import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Canvas } from '@nativescript/canvas';
import { runInWorker, type TransferMode } from '../canvas/worker-host';

/**
 * CanvasView, drawn by a Worker: `worker` creates one whose entry file calls
 * `serveDemo` (see src/demos/offscreen). Sizing and children work as in
 * CanvasView. The Worker ends when this component unmounts.
 */
export function WorkerCanvasView(props: {
  worker: () => Worker;
  height?: number;
  className?: string;
  onStarted?: (mode: TransferMode) => void;
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
    stop.current = runInWorker(
      object,
      latest.current.worker(),
      (mode) => latest.current.onStarted?.(mode),
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
          <span className="text-sm font-semibold text-rose-300">The Worker couldn't draw</span>
          <p className="text-center text-xs text-slate-400">{error}</p>
        </div>
      )}
    </div>
  );
}
