import { useState, useEffect } from "react";
import { Timer } from "./Timer";
import { useAppState } from "../context/AppContext";

export function PomodoroTab() {
    const { state, updateState } = useAppState();

    const [running, setRunning] = useState(false);
    const [remaining, setRemaining] = useState(25 * 60);

    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => {
            setRemaining((t) => {
                if (t <= 1) {
                    setRunning(false);
                    rewardXP();
                    return 25 * 60;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [running]);

    function rewardXP() {
        updateState((prev) => {
            const newXP = prev.game.xp + 25;
            const nextLevel =
                newXP >= prev.game.xpToNext
                    ? { level: prev.game.level + 1, xp: newXP - prev.game.xpToNext, xpToNext: prev.game.xpToNext * 1.4 }
                    : prev.game;

            return {
                ...prev,
                coins: prev.coins + 5,
                game:
                    newXP >= prev.game.xpToNext
                        ? { ...nextLevel }
                        : { ...prev.game, xp: newXP }
            };
        });
    }

    const min = Math.floor(remaining / 60);
    const sec = remaining % 60;

    return (
        <div className="flex flex-col gap-3">
            <Timer running={running} minutes={min} seconds={sec} />

            <button
                onClick={() => setRunning((v) => !v)}
                className="px-3 py-2 bg-sky-500 rounded-lg text-black font-semibold"
            >
                {running ? "Pause" : "Start"}
            </button>

            <p className="text-xs text-slate-400">+5 coins when finished</p>
        </div>
    );
}
