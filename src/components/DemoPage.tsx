import { useEffect, useState, type ReactNode } from 'react';
import { goBack, usePage } from '../navigation';

/**
 * `fill` (dp): the page is as tall as the window, but at least `fill`, so
 * content with `flex-1` takes the height left over and the page scrolls once
 * the window is shorter than that. It is a definite height rather than a
 * minimum because nested `flex-1` and percentage heights need one.
 */
export function DemoPage(props: {
  eyebrow: string;
  title: string;
  description: string;
  fill?: number;
  children?: ReactNode;
}) {
  const page = usePage();
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    if (!page || !props.fill) {
      return;
    }
    const onLayout = () => setPageHeight(page.getActualSize().height);
    onLayout();
    page.on('layoutChanged', onLayout);
    return () => page.off('layoutChanged', onLayout);
  }, [page, props.fill]);

  return (
    <scroll>
      <main
        className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-8"
        style={props.fill ? { height: Math.max(pageHeight, props.fill) } : undefined}
      >
        <header className="flex flex-row items-center gap-4">
          <button
            className="rounded-2xl bg-white px-4 py-2 text-base font-semibold text-indigo-600 active:bg-indigo-50 dark:bg-slate-900 dark:text-indigo-300"
            onClick={goBack}
          >
            ← Back
          </button>
          <div className="flex flex-1 flex-col">
            <span className="eyebrow">{props.eyebrow}</span>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{props.title}</h1>
          </div>
        </header>
        <p className="text-base text-slate-600 dark:text-slate-400">{props.description}</p>
        {props.children}
      </main>
    </scroll>
  );
}
