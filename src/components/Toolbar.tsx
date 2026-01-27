"use client";

import { Toolbar as MuiToolbar } from "@mui/material";
import { usePathname } from "next/navigation";

export default function Toolbar() {
    const pathname = usePathname();
    if(pathname.startsWith('/live')) return;
    return <MuiToolbar />
}