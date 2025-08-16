import React from "react";
import { IconButton, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useThemeMode from "../../hooks/useThemeMode";

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
