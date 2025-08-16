"use client"

import React from "react";
import MobileNavbar from "./mobile/MobileNavbar";
import DesktopNavbar from "./desktop/DesktopNavbar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Navbar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    return (
        <>
            {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
        </>
    );
};

export default Navbar;
