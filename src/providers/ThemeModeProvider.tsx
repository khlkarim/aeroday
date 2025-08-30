"use client"

import "@fontsource/righteous";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/geist-sans/300.css"; 
import "@fontsource/geist-sans/400.css"; 
import "@fontsource/geist-sans/500.css"; 
import "@fontsource/geist-sans/700.css"; 

import { shadTheme } from "@/themes/shad/shadTheme";
import { useMemo, useState, type ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeModeContext, type ThemeMode } from "@/contexts/ThemeModeContext";

const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    
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