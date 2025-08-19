"use client"

import { shadTheme } from "@/themes/shad/shadTheme";
import { useMemo, useState, type ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeModeContext, type ThemeMode } from "../contexts/ThemeModeContext";

const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    
    const setTheme = (m: ThemeMode) => setMode(m);
    const toggleTheme = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

    const theme = useMemo(() => shadTheme(mode), [mode]);

    return (
        <ThemeModeContext.Provider value={{ setTheme, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export default ThemeModeProvider;