import { useRef, useState } from 'react';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import { flowField, type FlowField, type FlowPalette } from './flow-field';
import { clock } from './clock';
import { liveChart, type ChartSeries } from './live-chart';

const palettes: { label: string; value: FlowPalette }[] = [
  { label: 'Aurora', value: 'aurora' },
  { label: 'Ember', value: 'ember' },
  { label: 'Ocean', value: 'ocean' },
];

export function Canvas2DDemo() {
  const [palette, setPalette] = useState<FlowPalette>('aurora');
  const field = useRef<FlowField>(null);
  const [series, setSeries] = useState<ChartSeries[]>([]);

  const [flowDemo] = useState(() => flowField({ palette }));
  const [clockDemo] = useState(() => clock());
  const [chartDemo] = useState(() => liveChart({ onSample: setSeries }));

  function choosePalette(value: FlowPalette) {
    setPalette(value);
    field.current?.setPalette(value);
  }

  return (
    <DemoPage
      eyebrow="Canvas 2D"
      title="Paths, gradients & text"
      description="The web's CanvasRenderingContext2D, drawn natively with Skia. Every frame below is plain ctx.* calls."
    >
      <section className="card flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Flow field</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Thousands of particle trails, additive blending. Drag to stir.
            </p>
          </div>
          <button
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            onClick={() => field.current?.clear()}
          >
            Clear
          </button>
        </div>
        <CanvasView
          demo={flowDemo}
          height={380}
          className="w-full rounded-2xl"
          onStarted={(instance) => (field.current = instance)}
        >
          <span className="absolute left-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            globalCompositeOperation = 'lighter'
          </span>
        </CanvasView>
        <Segmented options={palettes} value={palette} onChange={choosePalette} />
      </section>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300,1fr))] gap-6">
        <section className="card flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Clock</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              save/restore, rotate, arcs, radial gradients, shadows and fillText.
            </p>
          </div>
          <CanvasView demo={clockDemo} height={320} className="w-full rounded-2xl" />
        </section>

        <section className="card flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Live chart</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Streaming curves drawn on canvas; the legend is MasonKit, fed by the same data.
            </p>
          </div>
          <CanvasView demo={chartDemo} height={240} className="w-full rounded-2xl" />
          <div className="flex flex-row flex-wrap gap-3">
            {series.map((s) => (
              <div
                key={s.name}
                className="flex flex-1 basis-24 flex-row items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800"
              >
                <div className="size-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="flex-1 text-sm text-slate-600 dark:text-slate-300">{s.name}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {Math.round(s.value)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DemoPage>
  );
}
