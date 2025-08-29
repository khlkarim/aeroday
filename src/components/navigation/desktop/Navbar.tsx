import React from "react";
import { links } from "@/constants/navlinks";
import ThemeToggle from "@/components/ThemeToggle";
import ThreeDToggle from "@/components/ThreeDToggle";
import NavLink from "@/components/navigation/desktop/NavLink";
import { AppBar, Toolbar, Container, useTheme } from "@mui/material";

const DesktopNavbar: React.FC = () => {
    const theme = useTheme();

    return (
        <AppBar
            sx={{
                position: 'fixed',
                backdropFilter: "blur(8px)",
                backgroundColor: 
                    theme.palette.mode == 'light'? 
                        `${theme.palette.background.paper}22` : `transparent`,
            }}
        >
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    {links.map((_, index) => (
                        <NavLink key={index} index={index} />
                    ))}
                    
                    <ThemeToggle />
                    <ThreeDToggle />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default DesktopNavbar;
