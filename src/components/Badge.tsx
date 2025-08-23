import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface BadgeProps {
    className?: string;
    children: ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

const Badge: React.FC<BadgeProps> = ({ ref, className, children }) => (
    <Box
        ref={ref}
        className={`${className} shadow-md rounded-lg flex flex-col items-center justify-center`}
        sx={{
            minWidth: 220,
            minHeight: 160,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            cursor: "pointer",
            background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
            position: "relative",
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.5s",
            },
            "&:hover::before": {
                left: "100%",
            },
        }}
    >
        {children}
    </Box>
);

export default Badge;