"use client"

import React from "react";
import MobileNavbar from "./mobile/MobileNavbar";
import DesktopNavbar from "./desktop/DesktopNavbar";
import { Box } from "@mui/material";

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
