"use client"

import { createContext } from "react";

export type ThemeMode = 'light' | 'dark';

export interface ThemeModeContextType {
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
}

export const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);