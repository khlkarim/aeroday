"use client";

import { usePathname } from "next/navigation";
import { Container as MuiContainer } from "@mui/material";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    const pathname = usePathname();
    if (pathname.startsWith('/live')) return <div className={className}>{children}</div>;
    return <MuiContainer className={className}>{children}</MuiContainer>;
}