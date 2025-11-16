import { useState } from "react";
import { PomodoroTab } from "./components/PomodoroTab";
import { FocusTab } from "./components/FocusTab";
import { GameTab } from "./components/GameTab";
import { TabNav } from "./components/TabNav";

export function App() {
  const [tab, setTab] = useState<"pomodoro" | "focus" | "game">("pomodoro");

  return (
    <div className="w-full h-full bg-slate-950 text-slate-50 p-4 flex flex-col gap-4">
      <header className="flex flex-col">
        <h1 className="text-xl font-semibold">Habit Quest</h1>
        <p className="text-xs text-slate-400">
          Turn habits into XP and gold coins.
        </p>
      </header>

      <TabNav tab={tab} setTab={setTab} />

      <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-xl p-3">
        {tab === "pomodoro" && <PomodoroTab />}
        {tab === "focus" && <FocusTab />}
        {tab === "game" && <GameTab />}
      </div>
    </div>
  );
}
