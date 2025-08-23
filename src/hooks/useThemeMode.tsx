import { useContext } from "react";
import { ThemeModeContext, type ThemeModeContextType } from "../contexts/ThemeModeContext";

const useThemeMode = (): ThemeModeContextType => {
    const context = useContext(ThemeModeContext);

    if (context === undefined) {
        throw new Error('useThemeMode must be used within a ThemeModeProvider');
    }
    
    return context;
};

export default useThemeMode;