import { useRef, useState } from 'react';
import { formatCount } from '../../format';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import { threeGalaxy, type GalaxyMaterial, type ThreeGalaxy, type ThreeStats } from './galaxy';

const materials: { label: string; value: GalaxyMaterial }[] = [
  { label: 'Iridescent', value: 'glass' },
  { label: 'Chrome', value: 'chrome' },
  { label: 'Normals', value: 'normals' },
  { label: 'Wireframe', value: 'wireframe' },
];

const snippet = `const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Screen.mainScreen.scale);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);`;

const pill = 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white';

export function ThreeDemo() {
  const [material, setMaterial] = useState<GalaxyMaterial>('glass');
  const galaxy = useRef<ThreeGalaxy>(null);
  const [stats, setStats] = useState<ThreeStats>({ fps: 0, drawCalls: 0, triangles: 0 });

  const [demo] = useState(() =>
    threeGalaxy({
      cubes: __ANDROID__ ? 600 : 1200,
      onStats: setStats,
    }),
  );

  function chooseMaterial(value: GalaxyMaterial) {
    setMaterial(value);
    galaxy.current?.setMaterial(value);
  }

  return (
    <DemoPage
      fill={760}
      eyebrow="three.js"
      title="Galaxy"
      description="Unmodified three.js on @nativescript/canvas-three: a physically based torus knot lit by a PMREM room environment and orbiting point lights, circled by an InstancedMesh galaxy. Drag to orbit."
    >
      <section className="card flex flex-1 flex-col gap-4">
        <CanvasView
          demo={demo}
          className="min-h-[240] w-full flex-1 rounded-2xl"
          onStarted={(instance) => (galaxy.current = instance)}
        >
          <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
            <span className={pill}>{`${stats.fps} fps`}</span>
            <span className={pill}>{`${stats.drawCalls} draw calls`}</span>
            <span className={pill}>{`${formatCount(stats.triangles)} triangles`}</span>
          </div>
        </CanvasView>
        <Segmented options={materials} value={material} onChange={chooseMaterial} />
      </section>

      <section className="card flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Hand three.js the canvas</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The native canvas stands in for an HTMLCanvasElement, so the usual setup works as is.
        </p>
        <code className="rounded-2xl bg-slate-100 p-4 text-sm text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
          {snippet}
        </code>
      </section>
    </DemoPage>
  );
}
