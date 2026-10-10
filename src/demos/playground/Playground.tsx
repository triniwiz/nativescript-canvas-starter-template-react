import { useState } from 'react';
import { goBack } from '../../navigation';

// Class names must appear in full so Tailwind can find them.
const justifyOptions = [
  { label: 'Start', value: 'justify-start' },
  { label: 'Center', value: 'justify-center' },
  { label: 'Between', value: 'justify-between' },
  { label: 'End', value: 'justify-end' },
];

const directionOptions = [
  { label: 'Row', value: 'flex-row' },
  { label: 'Column', value: 'flex-col' },
];

const tiles = [
  { title: 'Featured', span: 'col-span-2 row-span-2', color: 'bg-indigo-500' },
  { title: 'Inbox', span: '', color: 'bg-violet-500' },
  { title: 'Photos', span: '', color: 'bg-fuchsia-500' },
  { title: 'Analytics', span: 'col-span-2', color: 'bg-sky-500' },
  { title: 'Music', span: '', color: 'bg-emerald-500' },
  { title: 'Notes', span: 'row-span-2', color: 'bg-amber-500' },
  { title: 'Maps', span: '', color: 'bg-rose-500' },
  { title: 'Weather', span: 'col-span-2', color: 'bg-teal-500' },
];

const allTags = [
  'Flexbox',
  'Grid',
  'Gap',
  'Wrap',
  'Aspect ratio',
  'Min / max',
  'Auto margins',
  'Spans',
  'Dark mode',
  'Semantic HTML',
  'Tailwind',
  'Taffy',
];

const palette = [
  { name: 'Slate', color: 'bg-slate-500' },
  { name: 'Red', color: 'bg-red-500' },
  { name: 'Orange', color: 'bg-orange-500' },
  { name: 'Amber', color: 'bg-amber-500' },
  { name: 'Lime', color: 'bg-lime-500' },
  { name: 'Emerald', color: 'bg-emerald-500' },
  { name: 'Teal', color: 'bg-teal-500' },
  { name: 'Sky', color: 'bg-sky-500' },
  { name: 'Indigo', color: 'bg-indigo-500' },
  { name: 'Violet', color: 'bg-violet-500' },
  { name: 'Fuchsia', color: 'bg-fuchsia-500' },
  { name: 'Rose', color: 'bg-rose-500' },
];

function segmentClass(active: boolean) {
  return active
    ? 'bg-indigo-500 text-white'
    : 'bg-slate-100 text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300';
}

export function Playground() {
  const [justify, setJustify] = useState(justifyOptions[2].value);
  const [direction, setDirection] = useState(directionOptions[0].value);
  const [tagCount, setTagCount] = useState(6);

  return (
    <scroll>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-8">
        {/* Header */}
        <header className="flex flex-row items-center gap-4">
          <button
            className="rounded-2xl bg-white px-4 py-2 text-base font-semibold text-indigo-600 active:bg-indigo-50 dark:bg-slate-900 dark:text-indigo-300"
            onClick={goBack}
          >
            ← Back
          </button>
          <div className="flex flex-1 flex-col">
            <span className="eyebrow">Playground</span>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Layout, live</h1>
          </div>
        </header>

        {/* Flexbox */}
        <section className="card flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Flexbox</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tap an option to swap the classes on the container below.
            </p>
          </div>

          <div className="flex flex-row flex-wrap gap-2">
            {justifyOptions.map((option) => (
              <button
                key={option.value}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${segmentClass(justify === option.value)}`}
                onClick={() => setJustify(option.value)}
              >
                {option.label}
              </button>
            ))}
            {directionOptions.map((option) => (
              <button
                key={option.value}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${segmentClass(direction === option.value)}`}
                onClick={() => setDirection(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className={`flex h-56 gap-3 rounded-2xl bg-slate-100 p-3 dark:bg-slate-800 ${justify} ${direction}`}>
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex size-14 items-center justify-center rounded-xl bg-indigo-500">
                <span className="text-lg font-bold text-white">{n}</span>
              </div>
            ))}
          </div>

          <code className="text-sm text-indigo-600 dark:text-indigo-300">
            {`className="flex ${direction} ${justify} gap-3"`}
          </code>
        </section>

        {/* Grid */}
        <section className="card flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">CSS Grid</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              auto-fill columns with col-span and row-span. Resize the window to watch it reflow.
            </p>
          </div>

          <div className="grid grid-flow-row-dense grid-cols-[repeat(auto-fill,minmax(120,1fr))] auto-rows-[96] gap-3">
            {tiles.map((tile) => (
              <div
                key={tile.title}
                className={`flex flex-col justify-end rounded-2xl p-4 ${tile.span} ${tile.color}`}
              >
                <span className="text-base font-semibold text-white">{tile.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Wrapping */}
        <section className="card flex flex-col gap-4">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-1 flex-col gap-1">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Wrapping</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {`${tagCount} of ${allTags.length} chips`}
              </p>
            </div>
            <button
              className={`size-10 rounded-full text-lg font-bold ${segmentClass(false)}`}
              onClick={() => setTagCount((count) => Math.max(0, count - 1))}
            >
              −
            </button>
            <button
              className="size-10 rounded-full bg-indigo-500 text-lg font-bold text-white active:bg-indigo-600"
              onClick={() => setTagCount((count) => Math.min(allTags.length, count + 1))}
            >
              +
            </button>
          </div>

          <div className="flex flex-row flex-wrap gap-2">
            {allTags.slice(0, tagCount).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Palette */}
        <section className="card flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Palette</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Square swatches with aspect-square, straight from Tailwind's colour scale.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(88,1fr))] gap-3">
            {palette.map((swatch) => (
              <div key={swatch.name} className="flex flex-col gap-2">
                <div className={`aspect-square w-full rounded-2xl ${swatch.color}`} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{swatch.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </scroll>
  );
}
