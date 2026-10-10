export function Segmented<V extends string | number>(props: {
  options: readonly { label: string; value: V }[];
  value: V;
  onChange: (value: V) => void;
}) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {props.options.map((option) => (
        <button
          key={String(option.value)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            props.value === option.value
              ? 'bg-indigo-500 text-white'
              : 'bg-slate-100 text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
          onClick={() => props.onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
