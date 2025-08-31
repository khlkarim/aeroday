import { gsap } from "gsap";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { event } from "@/content/event";
import { ScrollTrigger }  from "gsap/all";
import { Paragraph } from "@/components/text/Paragraph";
import { Typography, Box, Stack, useTheme } from "@mui/material";
import { Star } from "@mui/icons-material";

export const APropos = () => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => { 
        if(containerRef.current) 
        {
            animate({ container: containerRef.current });
        }
    }, { scope: containerRef });

    return (
        <Stack 
            gap={6}
            flexWrap={'wrap'}
            ref={containerRef} 
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-around'}
        >
            <Box
                className='animated' 
                sx={{
                    mx: 'auto',
                    width: { xs: 300, sm: 280 },
                    height: { xs: 260, sm: 280 },
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        width: { xs: 300, sm: 280 },
                        height: { xs: 260, sm: 280 },
                        overflow: "hidden",
                        position: 'relative',
                    }}
                >
                    <Image
                        fill
                        src={event.logo}
                        alt={`${event.name} logo`}
                        style={{ objectFit: "contain" }}
                    />
                </Box>
            </Box>
            <Stack gap={2} justifyContent={'center'} alignItems={'center'}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontSize: { xs: '2rem', sm: '2rem', md: '2rem', lg: '2rem' },
                    }}
                    className="animated" 
                >
                    <Stack gap={1} alignItems={'center'} flexDirection={{ xs: 'column', sm: 'row' }}>
                        <Box>The Greatest Event</Box>
                        <Box><span style={{ color: theme.palette.primary.main }}>IN THE WORLD</span></Box>
                    </Stack>
                    <Box
                        className="animated"
                        sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Star sx={{ color: theme.palette.warning.main, fontSize: 18 }} />
                        <Star sx={{ color: theme.palette.warning.main, fontSize: 24 }} />
                        <Star sx={{ color: theme.palette.warning.main, fontSize: 32 }} />
                        <Star sx={{ color: theme.palette.warning.main, fontSize: 24 }} />
                        <Star sx={{ color: theme.palette.warning.main, fontSize: 18 }} />
                    </Box>
                </Typography>
                <Box className="animated" textAlign={'center'}>
                    <Paragraph>{event.description.secondary}</Paragraph>
                </Box>
            </Stack>
        </Stack>
    );
};

type AnimateRefs = {
    container: HTMLElement;
};

function animate({ container }: AnimateRefs) {
    const onScroll = gsap.timeline({
        overwrite: "auto",
        defaults: { ease: "power2.inOut" },
    });

    onScroll.from('.animated', {
        y: 50,
        autoAlpha: 0,
        stagger: 0.1,
    });

    ScrollTrigger.create({
        scrub: 1,
        start: "top 90%",
        end: "top center",
        trigger: container,
        animation: onScroll,
    });
}