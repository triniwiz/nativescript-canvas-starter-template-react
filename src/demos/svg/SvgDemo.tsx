import { useState } from 'react';
import { DemoPage } from '../../components/DemoPage';
import { gallery, gauge } from './art';

export function SvgDemo() {
  const [value, setValue] = useState(64);

  function nudge(delta: number) {
    setValue((current) => Math.max(0, Math.min(100, current + delta)));
  }

  return (
    <DemoPage
      eyebrow="SVG"
      title="Vector, animated"
      description="The Svg view from @nativescript/canvas-svg renders SVG natively with Skia, SMIL animation included. Each tile below is inline markup passed to src."
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160,1fr))] gap-4">
        {gallery.map((item) => (
          <article key={item.title} className="card flex flex-col gap-3">
            <div className="flex h-[140] w-full items-center justify-center rounded-2xl bg-slate-950">
              <svg src={item.src} className="size-[120]" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.body}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="card flex flex-row flex-wrap items-center gap-6">
        <div className="size-[200] rounded-3xl bg-slate-950 p-3">
          <svg src={gauge(value, 'GPU budget')} className="size-[176]" />
        </div>
        <div className="flex flex-1 basis-60 flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Driven by React state</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The gauge's markup is built from state on every render; change the value and the view redraws.
          </p>
          <div className="flex flex-row flex-wrap gap-2">
            <button
              className="size-10 rounded-full bg-slate-100 text-lg font-bold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              onClick={() => nudge(-10)}
            >
              −
            </button>
            <button
              className="size-10 rounded-full bg-indigo-500 text-lg font-bold text-white active:bg-indigo-600"
              onClick={() => nudge(10)}
            >
              +
            </button>
            <button
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              onClick={() => setValue(Math.round(Math.random() * 100))}
            >
              Random
            </button>
          </div>
        </div>
      </section>
    </DemoPage>
  );
}
