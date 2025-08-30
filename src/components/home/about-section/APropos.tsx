import { gsap } from "gsap";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { event } from "@/content/event";
import { ScrollTrigger }  from "gsap/all";
import Earth from "@/components/scenes/APropos";
import { SceneContainer } from "@/components/scenes/SceneContainer";
import { Paragraph } from "@/components/text/Paragraph";
import { Typography, Box, Stack, useTheme } from "@mui/material";

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
                    width: { xs: 260, sm: 280 },
                    height: { xs: 260, sm: 280 },
                    position: 'relative',
                }}
            >
                <SceneContainer
                    image={
                    <Box
                        sx={{
                            width: { xs: 260, sm: 280 },
                            height: { xs: 260, sm: 280 },
                            overflow: "hidden",
                            borderRadius: "50%",
                            position: 'relative',
                        }}
                    >
                        <Image
                            fill
                            src={event.logo}
                            alt={`${event.name} logo`}
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                    }
                    canvas={
                        <Earth />
                    }
                />
            </Box>
            <Stack justifyContent={'center'}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        mb: 2,
                        fontSize: { xs: '1.3rem', sm: '2rem', md: '2rem', lg: '2rem' },
                    }}
                    className="animated" 
                >
                    A propos de <span style={{ color: theme.palette.secondary.main }}>{event.name}</span>
                </Typography>
                <Box className="animated">
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