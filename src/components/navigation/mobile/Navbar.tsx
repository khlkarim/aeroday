"use client"

import NavLink from "./NavLink";
import React, { useState } from "react";
import ThemeToggle from "../../ThemeToggle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { links } from "../../../constants/navlinks";
import ThreeDToggle from "@/components/ThreeDToggle";
import { AppBar, Toolbar, IconButton, Drawer, List, useTheme, Stack } from "@mui/material";

const Navbar: React.FC = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const toggleDrawer = (state: boolean) => () => setOpen(state);

    return (
        <>
            <AppBar
                sx={{
                    position: 'fixed',
                    backdropFilter: "blur(10px)",
                    backgroundColor: 
                        theme.palette.mode == 'light'? 
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
                        backgroundColor: 
                            theme.palette.mode == 'light'? 
                                `${theme.palette.background.paper}22` : `transparent`,
                    },
                }}
            >
                <Toolbar 
                    sx={{ 
                        borderBottom: `1px solid ${theme.palette.divider}` 
                    }}
                >
                    <Stack 
                        width={'100%'} 
                        flexDirection={'row'}
                        justifyContent={'space-between'} 
                    >
                        <IconButton 
                            onClick={toggleDrawer(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Stack 
                            gap={2} 
                            flexDirection={'row'}
                        >
                            <ThemeToggle />
                            <ThreeDToggle />
                        </Stack>
                    </Stack>
                </Toolbar>
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