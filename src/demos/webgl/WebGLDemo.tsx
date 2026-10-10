import { useRef, useState } from 'react';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import { shaderGallery, type GLInfo, type ShaderGallery, type ShaderName } from './shaders';

const options: { label: string; value: ShaderName }[] = [
  { label: 'Plasma', value: 'plasma' },
  { label: 'Aurora', value: 'aurora' },
  { label: 'Metaballs', value: 'metaballs' },
  { label: 'Tunnel', value: 'tunnel' },
];

const pill = 'rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white';

export function WebGLDemo() {
  const [shader, setShader] = useState<ShaderName>('plasma');
  const gallery = useRef<ShaderGallery>(null);
  const [info, setInfo] = useState<GLInfo>();

  const [demo] = useState(() => shaderGallery({ shader, onInfo: setInfo }));

  function chooseShader(name: ShaderName) {
    setShader(name);
    gallery.current?.setShader(name);
  }

  const details = info
    ? [
        { label: 'Version', value: info.version },
        { label: 'Renderer', value: info.renderer },
        { label: 'Vendor', value: info.vendor },
        { label: 'GLSL', value: info.shadingLanguage },
        { label: 'Max texture', value: `${info.maxTextureSize}px` },
      ]
    : [];

  return (
    <DemoPage
      fill={760}
      eyebrow="WebGL"
      title="Fragment shaders"
      description="Raw WebGL 1: one full-screen triangle, a GLSL fragment shader, and time, resolution and pointer uniforms. Drag across the canvas to move the effect."
    >
      <section className="card flex flex-1 flex-col gap-4">
        <CanvasView
          demo={demo}
          className="min-h-[240] w-full flex-1 rounded-2xl"
          onStarted={(instance) => (gallery.current = instance)}
        >
          <div className="absolute bottom-3 left-3 flex flex-row gap-2">
            <span className={pill}>getContext('webgl')</span>
            <span className={pill}>{`${shader}.frag`}</span>
          </div>
        </CanvasView>
        <Segmented options={options} value={shader} onChange={chooseShader} />
      </section>

      <section className="card flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">This context</h2>
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
      </section>
    </DemoPage>
  );
}
