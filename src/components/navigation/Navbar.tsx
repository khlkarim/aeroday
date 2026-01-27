"use client"

import React from "react";
import { Box } from "@mui/material";
import MobileNavbar from "@/components/navigation/mobile/Navbar";
import DesktopNavbar from "@/components/navigation/desktop/Navbar";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    if(pathname.startsWith('/live')) return;
    

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
