import React from "react";
import useThreeD from "@/hooks/useThreeD";
import { Button, Tooltip } from "@mui/material";

const ThreeDToggle: React.FC = () => {
    const { toggle, active } = useThreeD();

    return (
        <Tooltip title={
            active? 
                "Disable 3D effects if your device feels slow."
                :
                "Enable 3D effects"
            }
        >
            <Button 
                onClick={toggle}
                sx={{ 
                    padding: 0,
                    minWidth: 40, 
                    minHeight: 40,
                    borderRadius: "50%", 
                }} 
            >
                {active ? '2D' : '3D'}
            </Button>
        </Tooltip>
    );
};

export default ThreeDToggle;
