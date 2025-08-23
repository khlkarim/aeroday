"use client"

import NavLink from "./NavLink";
import React, { useState } from "react";
import ThemeToggle from "../../ThemeToggle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { links } from "../../../constants/navlinks";
import { AppBar, Toolbar, IconButton, Drawer, List, useTheme, Box, Stack } from "@mui/material";
import ThreeDToggle from "@/components/ThreeDToggle";

const Navbar: React.FC = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (state: boolean) => () => setOpen(state);

    return (
        <>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    display: 'flex',
                    justifyContent: "center",
                    backdropFilter: "blur(10px)",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.mode == 'light'? 
                        `${theme.palette.background.paper}22` : `transparent`,
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
                        backdropFilter: "blur(10px)",
                        backgroundColor: theme.palette.mode == 'light'? 
                            `${theme.palette.background.paper}22` : `transparent`,
                    },
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: "space-between",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Stack gap={2} flexDirection={'row'}>
                        <ThemeToggle />
                        <ThreeDToggle />
                    </Stack>
                </Box>
                <List>
                    {links.map((_, index) => (
                        <NavLink key={index} index={index} />
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;