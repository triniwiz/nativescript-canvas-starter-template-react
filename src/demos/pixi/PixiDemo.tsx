import { useMemo, useRef, useState } from 'react';
import { formatCount } from '../../format';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import { pixiCritters, type PixiBackend, type PixiCritters, type PixiStats } from './critters';

// PixiJS picks its renderer at init, so switching mounts a fresh canvas.
const backends: { label: string; value: PixiBackend }[] = [
  { label: 'WebGL', value: 'webgl' },
  { label: 'WebGPU', value: 'webgpu' },
];

const pill = 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white';

export function PixiDemo() {
  const [backend, setBackend] = useState<PixiBackend>('webgl');
  const critters = useRef<PixiCritters>(null);
  const [stats, setStats] = useState<PixiStats>({ sprites: 0, fps: 0, renderer: '' });

  const demo = useMemo(() => pixiCritters({ backend, onStats: setStats }), [backend]);

  return (
    <DemoPage
      fill={620}
      eyebrow="PixiJS"
      title="Sprite party"
      description="PixiJS v8 through @nativescript/canvas-pixi: textures generated from vector Graphics, a parallax starfield and a bunnymark of bouncing sprites. Tap the canvas for a burst."
    >
      <section className="card flex flex-1 flex-col gap-4">
        <CanvasView
          key={backend}
          demo={demo}
          className="min-h-[240] w-full flex-1 rounded-2xl"
          onStarted={(instance) => (critters.current = instance)}
        >
          <div className="absolute left-3 top-3 flex flex-row flex-wrap gap-2">
            <span className={pill}>{stats.renderer || '…'}</span>
            <span className={pill}>{`${formatCount(stats.sprites)} sprites`}</span>
            <span className={pill}>{`${stats.fps} fps`}</span>
          </div>
        </CanvasView>
        <div className="flex flex-row flex-wrap items-center justify-between gap-3">
          <Segmented options={backends} value={backend} onChange={setBackend} />
          <div className="flex flex-row flex-wrap gap-2">
            <button
              className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white active:bg-indigo-600"
              onClick={() => critters.current?.add(100)}
            >
              +100
            </button>
            <button
              className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white active:bg-indigo-600"
              onClick={() => critters.current?.add(1000)}
            >
              +1000
            </button>
            <button
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              onClick={() => critters.current?.clear()}
            >
              Clear
            </button>
          </div>
        </div>
      </section>
    </DemoPage>
  );
}
