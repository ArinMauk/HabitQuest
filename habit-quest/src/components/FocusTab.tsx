import { useAppState } from "../context/AppContext";

export function FocusTab() {
    const { state } = useAppState();

    return (
        <div className="flex flex-col gap-2 text-sm">
            <p>Coins: {state.coins}</p>
            <p>Productive: {state.productiveSites.join(", ")}</p>
            <p>Distracting: {state.distractingSites.join(", ")}</p>
        </div>
    );
}
