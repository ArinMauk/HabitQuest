import type { AppState } from "./context/AppContext";
declare const chrome: any;

const KEY = "habit_quest";

export async function loadState(): Promise<AppState | null> {
    if (typeof chrome !== "undefined" && chrome.storage)
        return new Promise((resolve) =>
            chrome.storage.local.get(KEY, (r: { [key: string]: AppState; }) => resolve(r[KEY] ?? null))
        );

    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
}

export function saveState(state: AppState) {
    if (typeof chrome !== "undefined" && chrome.storage)
        chrome.storage.local.set({ [KEY]: state });
    else
        localStorage.setItem(KEY, JSON.stringify(state));
}
