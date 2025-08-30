import React from "react";
import { links } from "@/constants/navlinks";
import ThemeToggle from "@/components/ThemeToggle";
import ThreeDToggle from "@/components/ThreeDToggle";
import NavLink from "@/components/navigation/desktop/NavLink";
import { AppBar, Toolbar, Container } from "@mui/material";

const DesktopNavbar: React.FC = () => {
    return (
        <AppBar
            sx={{
                p: 2,
                position: 'fixed',
                background: 'none',
                border: 'none',
                boxShadow: 'none'
            }}
        >
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ 
                    bgcolor: 'red',
                    pl: 2, pr: 2,
                    borderRadius: 50,
                    border: '1px solid',
                    borderColor: "divider",
                    backdropFilter: "blur(100px)",
                    backgroundColor: `#FAF7F0`,
                    justifyContent: "space-between",
                }}>
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
