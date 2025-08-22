"use client"

import React from "react";
import { Box } from "@mui/material";
import MobileNavbar from "./mobile/Navbar";
import DesktopNavbar from "./desktop/Navbar";

const Navbar: React.FC = () => {
    return (
        <>
            <Box display={{ xs: "block", md: "none" }}>
                <MobileNavbar />
            </Box>
            <Box display={{ xs: "none", md: "block" }}>
                <DesktopNavbar />
            </Box>
        </>
    );
};

export default Navbar;
