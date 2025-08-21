"use client"

import gsap from 'gsap';
import { useRef } from 'react';
import { Box } from '@mui/material';
import { useGSAP } from '@gsap/react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Title = ({ label }: { label: string }) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLHRElement>(null);

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
            }}
        >
            <Typography
                variant="h3"
                ref={titleRef}
            >
                {label}
            </Typography>
            <Divider
                ref={dividerRef}
                sx={{
                    mt: 1,
                    width: '60%',
                    borderBottomWidth: 2,
                    borderColor: 'primary.main',
                }}
            />
        </Box>
    );
}

export default Title;