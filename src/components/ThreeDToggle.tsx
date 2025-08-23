import React from "react";
import { Button, Tooltip } from "@mui/material";
import useThreeD from "@/hooks/useThreeD";

const ThreeDToggle: React.FC = () => {
    const { toggle, active } = useThreeD();

    return (
        <Tooltip title={
            active? 
                "Disable 3D assets if your device feels slow."
                :
                "Enable 3D effects"
            }
        >
            <Button 
                onClick={toggle}
                sx={{ 
                    minWidth: 40, 
                    padding: 0,
                    width: 40, 
                    height: 40, 
                    borderRadius: "50%", 
                }} 
            >
                {active ? '2D' : '3D'}
            </Button>
        </Tooltip>
    );
};

export default ThreeDToggle;
