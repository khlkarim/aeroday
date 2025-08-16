import React from "react";
import { AppBar, Toolbar, Container, useTheme } from "@mui/material";
import ThemeToggle from "../../theme/ThemeToggle";
import DesktopNavLink from "./DesktopNavLink";
import { links } from "../../../content/navlinks";

const DesktopNavbar: React.FC = () => {
    const theme = useTheme();

    return (
        <AppBar
            elevation={0}
            position="fixed"
            color="transparent"
            sx={{
                backdropFilter: "blur(8px)",
                borderBottom: `1px solid ${theme.palette.divider}`,
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
