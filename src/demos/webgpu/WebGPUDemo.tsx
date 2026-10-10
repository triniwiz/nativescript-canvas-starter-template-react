import { useMemo, useRef, useState } from 'react';
import { formatCount } from '../../format';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import { boids, type BoidPreset, type Boids, type GPUInfo } from './boids';

const presets: { label: string; value: BoidPreset }[] = [
  { label: 'Flock', value: 'flock' },
  { label: 'Swarm', value: 'swarm' },
  { label: 'Drift', value: 'drift' },
];

// The particle buffers are sized up front, so a new count mounts a new canvas.
const counts = [
  { label: '1K', value: 1024 },
  { label: '2K', value: 2048 },
  { label: '4K', value: 4096 },
];

const pill = 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white';

export function WebGPUDemo() {
  const [preset, setPreset] = useState<BoidPreset>('flock');
  const [count, setCount] = useState(__ANDROID__ ? 1024 : 2048);
  const flock = useRef<Boids>(null);
  const [info, setInfo] = useState<GPUInfo>();

  const demo = useMemo(() => boids({ count, onInfo: setInfo }), [count]);

  function choosePreset(value: BoidPreset) {
    setPreset(value);
    flock.current?.setPreset(value);
  }

  function onStarted(instance: Boids) {
    flock.current = instance;
    instance.setPreset(preset);
  }

  const details = info
    ? [
        { label: 'Vendor', value: info.vendor },
        { label: 'Architecture', value: info.architecture },
        { label: 'Adapter', value: info.description || '—' },
        { label: 'Canvas format', value: info.format },
      ]
    : [];

  return (
    <DemoPage
      fill={760}
      eyebrow="WebGPU"
      title="Compute boids"
      description="Every frame a WGSL compute shader steers each boid from its neighbours, then an instanced render pass draws the flock. Touch the canvas to attract them."
    >
      <section className="card flex flex-1 flex-col gap-4">
        <CanvasView
          key={count}
          demo={demo}
          className="min-h-[240] w-full flex-1 rounded-2xl"
          onStarted={onStarted}
        >
          <div className="absolute left-3 top-3 flex flex-row gap-2">
            <span className={pill}>{`${formatCount(count)} boids`}</span>
            <span className={pill}>O(n²) per frame on the GPU</span>
          </div>
        </CanvasView>
        <div className="flex flex-row flex-wrap items-center justify-between gap-3">
          <Segmented options={presets} value={preset} onChange={choosePreset} />
          <div className="flex flex-row flex-wrap items-center gap-2">
            <Segmented options={counts} value={count} onChange={setCount} />
            <button
              className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white active:bg-indigo-600"
              onClick={() => flock.current?.reset()}
            >
              Scatter
            </button>
          </div>
        </div>
      </section>

      <section className="card flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Adapter</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200,1fr))] gap-3">
          {details.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Powered by wgpu, which picks the native graphics API: Metal on iOS, Vulkan on Android (API 27+),
          Direct3D or Vulkan on Windows.
        </p>
      </section>
    </DemoPage>
  );
}
