import React from "react";
import useThreeD from "@/hooks/useThreeD";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";

const ThreeDToggle: React.FC = () => {
    const theme = useTheme();
    const { toggle, active } = useThreeD();

    return (
        <>
            {active?
                <Button sx={{ borderRadius: 100 }} onClick={toggle}>
                    <Typography>2D</Typography>
                </Button>
                    : 
                <IconButton sx={{ color: theme.palette.primary.main }} onClick={toggle}>
                    <ThreeDRotationIcon />
                </IconButton>
            }
        </>
    );
};

export default ThreeDToggle;
