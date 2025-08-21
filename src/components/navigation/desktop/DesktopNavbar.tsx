import React from "react";
import ThemeToggle from "../../ThemeToggle";
import DesktopNavLink from "./DesktopNavLink";
import { links } from "../../../constants/navlinks";
import { AppBar, Toolbar, Container, useTheme } from "@mui/material";

const DesktopNavbar: React.FC = () => {
    const theme = useTheme();

    return (
        <AppBar
            elevation={0}
            position="fixed"
            color="transparent"
            sx={{
                backdropFilter: "blur(8px)",
                backgroundColor: theme.palette.mode == 'light'? 
                    `${theme.palette.background.paper}22` : `transparent`,
            }}
        >
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    {links.map((_, index) => (
                        <DesktopNavLink key={index} index={index} />
                    ))}
                    <ThemeToggle />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default DesktopNavbar;
