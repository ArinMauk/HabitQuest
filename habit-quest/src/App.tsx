import React, { useState } from "react";
import { PomodoroTab } from "./components/PomodoroTab";
import { FocusTab } from "./components/FocusTab";
import { GameTab } from "./components/GameTab";
import { AppProvider } from "./context/AppContext";

type TabKey = "pomodoro" | "focus" | "game";

export function App() {
  const [tab, setTab] = useState<TabKey>("pomodoro");

  return (
    <AppProvider>
      <div className="w-[720px] h-[640px] p-4 flex flex-col gap-3">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold">Habit Quest</h1>
        <p className="text-xs text-slate-400">
          Level up your life one habit at a time.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
        <TabButton
          icon="⏱️"
          label="Pomodoro"
          active={tab === "pomodoro"}
          onClick={() => setTab("pomodoro")}
        />
        <TabButton
          icon="✨"
          label="Focus"
          active={tab === "focus"}
          onClick={() => setTab("focus")}
        />
        <TabButton
          icon="🗡️"
          label="RPG"
          active={tab === "game"}
          onClick={() => setTab("game")}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-3 overflow-y-auto">
        {tab === "pomodoro" && <PomodoroTab />}
        {tab === "focus" && <FocusTab />}
        {tab === "game" && <GameTab />}
      </div>
    </div>
    </AppProvider>
  );
}

function TabButton({
  label,
  icon,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center justify-center gap-1 text-xs py-1.5 rounded-md font-medium",
        active
          ? "bg-sky-400 text-slate-950"
          : "text-slate-400 hover:bg-slate-800",
      ].join(" ")}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
