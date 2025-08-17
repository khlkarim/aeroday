import React from "react";
import useThemeMode from "../hooks/useThemeMode";
import { IconButton, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeToggle: React.FC = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeMode();

    return (
        <IconButton sx={{ color: theme.palette.primary.main }} onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
};

export default ThemeToggle;
