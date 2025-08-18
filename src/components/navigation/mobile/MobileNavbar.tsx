"use client"

import React, { useState } from "react";
import ThemeToggle from "../../ThemeToggle";
import MobileNavLink from "./MobileNavLink";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { links } from "../../../constants/navlinks";
import { AppBar, Toolbar, IconButton, Drawer, List, useTheme, Box } from "@mui/material";

const MobileNavbar: React.FC = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const toggleDrawer = (state: boolean) => () => setOpen(state);

    return (
        <>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    backdropFilter: "blur(8px)",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: `${theme.palette.background.paper}88`,
                }}
            >
                <Toolbar>
                    <IconButton onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                anchor="right"
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiPaper-root": {
                        width: "100%",
                        backdropFilter: "blur(8px)",
                        backgroundColor: `${theme.palette.background.paper}88`,
                    },
                }}
                >
                <Box
                    sx={{
                        padding: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                    <ThemeToggle />
                </Box>

                <List>
                    {links.map((_, index) => (
                        <MobileNavLink key={index} index={index} />
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default MobileNavbar;
