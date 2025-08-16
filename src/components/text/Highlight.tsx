export function Highlight({ children }: { children: React.ReactNode }) {
    return (
        <span className="bg-emerald-900/40 px-2 rounded-md text-white">
            {children}
        </span>
    );
}
