import { createContext, useContext, useEffect, useState } from "react";
import { loadState, saveState } from "../storage";

export interface AppState {
    tasks: { id: string; name: string; completed: boolean }[];
    coins: number;
    focus: {
        productiveSites: { domain: string; favicon?: string }[];
        distractingSites: { domain: string; favicon?: string }[];
        balance: number;
        notifyOnLoss: boolean;
        notifyOnGain: boolean;
        lossThreshold: number;
        gainThreshold: number;
    };
    game: { level: number; xp: number; xpToNext: number };
}

const DEFAULT_STATE: AppState = {
    tasks: [],
    coins: 0,
    focus: {
        productiveSites: [{ domain: "github.com" }, { domain: "notion.so" }],
        distractingSites: [{ domain: "youtube.com" }],
        balance: 100,
        notifyOnLoss: true,
        notifyOnGain: true,
        lossThreshold: 10,
        gainThreshold: 20,
    },
    game: { level: 1, xp: 0, xpToNext: 100 }
};

// 👇 this fixes the TS error
interface AppContextValue {
    state: AppState;
    updateState: (fn: (prev: AppState) => AppState) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AppState>(DEFAULT_STATE);

    useEffect(() => {
        loadState().then((loaded) => loaded && setState(loaded));
    }, []);

    const updateState = (fn: (prev: AppState) => AppState) => {
        setState((prev) => {
            const next = fn(prev);
            saveState(next);
            return next;
        });
    };

    return (
        <AppContext.Provider value={{ state, updateState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppState() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppState must be used inside <AppProvider>");
    return ctx;
}
