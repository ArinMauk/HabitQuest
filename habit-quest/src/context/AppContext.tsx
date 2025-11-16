import { createContext, useContext, useEffect, useState } from "react";
import { loadState, saveState } from "../storage";

export interface AppState {
    tasks: { id: string; name: string; completed: boolean }[];
    coins: number;
    productiveSites: string[];
    distractingSites: string[];
    game: { level: number; xp: number; xpToNext: number };
}

const DEFAULT_STATE: AppState = {
    tasks: [],
    coins: 0,
    productiveSites: ["github.com", "notion.so"],
    distractingSites: ["youtube.com"],
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
