import { Stack } from "@mui/material";
import React, { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

const Badge: React.FC<BadgeProps> = ({ ref, children }) => (
    <Stack
        ref={ref}
        alignItems={'center'}
        flexDirection={'column'}
        justifyContent={'center'}
        sx={theme => ({
            borderRadius: 3,
            minWidth: 220,
            minHeight: 160,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            cursor: "pointer",
            background:
                theme.palette.mode === "light"
                    ? "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
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
                    theme.palette.mode === "light"
                        ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.5s",
            },
            "&:hover::before": {
                left: "100%",
            },
        })}
    >
        {children}
    </Stack>
);

export default Badge;