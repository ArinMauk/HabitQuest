export function Timer({
    running,
    minutes,
    seconds
}: {
    running: boolean;
    minutes: number;
    seconds: number;
}) {
    return (
        <div className="text-center">
            <div className="text-4xl font-mono">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <p className="text-xs text-slate-400">{running ? "Focusing…" : "Stopped"}</p>
        </div>
    );
}
