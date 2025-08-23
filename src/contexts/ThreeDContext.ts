"use client"

import { createContext } from "react";

export interface ThreeDContextType {
    active: boolean;
    toggle: () => void;
}

export const ThreeDContext = createContext<ThreeDContextType | undefined>(undefined);