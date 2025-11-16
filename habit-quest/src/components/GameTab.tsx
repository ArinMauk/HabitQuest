import { useAppState } from "../context/AppContext";

export function GameTab() {
    const { state } = useAppState();

    return (
        <div className="flex flex-col gap-3">
            <p>Level: {state.game.level}</p>
            <p>XP: {state.game.xp} / {state.game.xpToNext}</p>
            <p>Coins: {state.coins}</p>
            <div className="rounded-lg bg-slate-800 text-xs text-slate-400 p-3">
                RPG viewport goes here
            </div>
        </div>
    );
}
