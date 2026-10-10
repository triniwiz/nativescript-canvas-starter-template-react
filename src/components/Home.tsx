import { version as reactVersion } from 'react';
import { Device, Screen } from '@nativescript/core';
import { navigate } from '../navigation';
import { CanvasView } from './CanvasView';
import { Playground } from '../demos/playground/Playground';
import { Canvas2DDemo } from '../demos/canvas2d/Canvas2DDemo';
import { WebGLDemo } from '../demos/webgl/WebGLDemo';
import { WebGPUDemo } from '../demos/webgpu/WebGPUDemo';
import { ThreeDemo } from '../demos/three/ThreeDemo';
import { PixiDemo } from '../demos/pixi/PixiDemo';
import { SvgDemo } from '../demos/svg/SvgDemo';
import { MixDemo } from '../demos/mix/MixDemo';
import { OffscreenDemo } from '../demos/offscreen/OffscreenDemo';
import { flowField } from '../demos/canvas2d/flow-field';
import { icons, reactAtom } from '../demos/svg/art';

const HERO_ATOM_SIZE = 120;

const platform = Device.os;
const screen = `${Math.round(Screen.mainScreen.widthDIPs)} × ${Math.round(
  Screen.mainScreen.heightDIPs,
)} dp`;

// The hero's background is a live Canvas 2D sketch, in React's blues.
const heroDemo = flowField({ density: 0.6, palette: 'ocean' });
const atom = reactAtom(HERO_ATOM_SIZE);

const stats = [
  { label: 'Running on', value: platform },
  { label: 'UI by', value: `React ${reactVersion}` },
  { label: 'Contexts', value: '2D · WebGL · WebGPU' },
  { label: 'Rendered by', value: 'Skia + wgpu' },
];

const demos = [
  {
    title: 'Canvas 2D',
    body: 'A flow field, an analog clock and a streaming chart, all plain ctx.* calls.',
    tags: ['Paths', 'Gradients', 'Text'],
    icon: icons.canvas2d,
    page: Canvas2DDemo,
  },
  {
    title: 'WebGL',
    body: 'Hand-written GLSL fragment shaders on a full-screen triangle.',
    tags: ['GLSL', 'Uniforms'],
    icon: icons.webgl,
    page: WebGLDemo,
  },
  {
    title: 'WebGPU',
    body: 'Thousands of boids steered by a WGSL compute shader every frame.',
    tags: ['Compute', 'WGSL', 'Instancing'],
    icon: icons.webgpu,
    page: WebGPUDemo,
  },
  {
    title: 'three.js',
    body: 'PBR materials, a PMREM environment and an instanced galaxy.',
    tags: ['3D', 'PBR'],
    icon: icons.three,
    page: ThreeDemo,
  },
  {
    title: 'PixiJS',
    body: 'A bunnymark of generated sprites on WebGL or WebGPU.',
    tags: ['Sprites', 'v8'],
    icon: icons.pixi,
    page: PixiDemo,
  },
  {
    title: 'SVG',
    body: 'Native SVG with SMIL animation and markup driven by React state.',
    tags: ['SMIL', 'Skia'],
    icon: icons.svg,
    page: SvgDemo,
  },
  {
    title: 'Offscreen & Workers',
    body: 'One scene drawn on the main thread and by a Worker that owns the canvas.',
    tags: ['OffscreenCanvas', 'Worker'],
    icon: icons.offscreen,
    page: OffscreenDemo,
  },
  {
    title: 'Mix & match',
    body: 'A dashboard where WebGL, 2D, SVG and three.js share one layout.',
    tags: ['MasonKit', 'Tailwind'],
    icon: icons.mix,
    page: MixDemo,
  },
  {
    title: 'Layout playground',
    body: 'Flexbox, CSS Grid and wrapping with MasonKit and Tailwind.',
    tags: ['Flexbox', 'Grid'],
    icon: icons.layout,
    page: Playground,
  },
];

export function Home() {
  return (
    <scroll>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-8">
        {/* Hero: MasonKit content layered over a live canvas */}
        <CanvasView demo={heroDemo} height={400} className="w-full rounded-3xl">
          <div className="absolute right-6 top-6">
            <svg src={atom} className="size-[120]" />
          </div>
          <section className="absolute inset-0 flex flex-col justify-end gap-4 p-8">
            <span className="self-start rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
              NativeScript × React × Canvas
            </span>
            <h1 className="text-4xl font-bold text-white">Draw anything, natively.</h1>
            <p className="text-base text-white/80">
              Canvas 2D, WebGL, WebGPU and SVG as native views, with three.js and PixiJS on top,
              laid out with Tailwind on iOS, Android and Windows.
            </p>
            <div className="flex flex-row flex-wrap gap-3 pt-2">
              <button
                className="btn bg-white text-indigo-600 active:bg-indigo-50"
                onClick={() => navigate(MixDemo)}
              >
                Open the dashboard →
              </button>
              <button
                className="btn bg-white/15 text-white active:bg-white/30"
                onClick={() => navigate(Canvas2DDemo)}
              >
                Start with 2D
              </button>
            </div>
          </section>
        </CanvasView>

        {/* Stats: each card is at least 160 wide, so they wrap on phones */}
        <div className="flex flex-row flex-wrap gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card flex flex-1 basis-40 flex-col gap-1">
              <span className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Demos: as many 260-wide columns as fit */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Demos</span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pick a renderer</h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260,1fr))] gap-4">
            {demos.map((demo) => (
              <article
                key={demo.title}
                className="card flex flex-col gap-3 active:bg-slate-50 dark:active:bg-slate-800"
                onClick={() => navigate(demo.page)}
              >
                <div className="flex flex-row items-center gap-3">
                  <svg src={demo.icon} className="size-12" />
                  <h3 className="flex-1 text-lg font-semibold text-slate-900 dark:text-white">
                    {demo.title}
                  </h3>
                  <span className="text-lg text-slate-400">→</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{demo.body}</p>
                <div className="flex flex-row flex-wrap gap-2">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="flex flex-col items-center py-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">{`${platform} · ${screen}`}</span>
        </footer>
      </main>
    </scroll>
  );
}
