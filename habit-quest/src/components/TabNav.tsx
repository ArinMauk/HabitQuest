export function TabNav({
    tab,
    setTab
}: {
    tab: string;
    setTab: (v: any) => void;
}) {
    const makeBtn = (id: string, label: string, icon: string) => (
        <button
            onClick={() => setTab(id)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1
        ${tab === id ? "bg-sky-500 text-black" : "hover:bg-slate-800"}`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <div className="grid grid-cols-3 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {makeBtn("pomodoro", "Pomodoro", "⏱️")}
            {makeBtn("focus", "Focus", "✨")}
            {makeBtn("game", "RPG", "🗡️")}
        </div>
    );
}
