import React from "react";
import { Box } from "@mui/material";

const Banner: React.FC = () => {
    return (
        <Box
            sx={{
                top: 0,
                left: 0,
                zIndex: 0,
                width: '100dvw',
                height: { xs: '16dvh', sm: '16dvh', md: '18dvh' },
                overflow: 'hidden',
                position: 'absolute',
                backgroundImage: "url('/assets/images/deco/strand.jpg')",
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'auto 150%',
                backgroundPosition: 'bottom',
            }}
        />
    );
}

export default Banner;