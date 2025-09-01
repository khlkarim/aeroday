"use client"

import React, { useState } from "react";
import { links } from "@/constants/navlinks";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ThreeDToggle from "@/components/ThreeDToggle";
import NavLink from "@/components/navigation/mobile/NavLink";
import { AppBar, Toolbar, IconButton, Drawer, List, useTheme, Stack } from "@mui/material";

const Navbar: React.FC = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const toggleDrawer = (state: boolean) => () => setOpen(state);

    return (
        <>
            <AppBar
                sx={{
                    p: 1,
                    position: 'fixed',
                    background: 'none',
                    border: 'none',
                    boxShadow: 'none',
                }}
            >
                <Toolbar sx={{ 
                    p: 1,
                    borderRadius: 100,
                    border: '1px solid',
                    borderColor: "divider",
                    backgroundColor: `#FAF7F0`,
                }}>
                    <IconButton onClick={toggleDrawer(true)}>
                        <MenuIcon sx={theme => ({color: theme.palette.primary.main})} />
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
                        backgroundColor: `#FAF7F0`,
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
                            <CloseIcon color="primary" />
                        </IconButton>
                        <Stack 
                            gap={2} 
                            flexDirection={'row'}
                        >
                            <ThreeDToggle />
                        </Stack>
                    </Stack>
                </Toolbar>
                <List>
                    {links.map((_, index) => (
                        <NavLink key={index} index={index} toggleDrawer={toggleDrawer(false)} />
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;