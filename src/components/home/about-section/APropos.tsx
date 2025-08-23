import { gsap } from "gsap";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import useThreeD from "@/hooks/useThreeD";
import { event } from "../../../content/event";
import { Paragraph } from "../../text/Paragraph";
import LowPolyEarth from "@/components/scenes/Earth";
import { Typography, Box, Stack } from "@mui/material";

export const APropos = () => {
    const threeD = useThreeD();

    const titleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animate({ logoRef, titleRef, descriptionRef });
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
                ref={logoRef} 
                sx={{
                    mx: 'auto',
                    width: 300,
                    height: 300,
                    position: 'relative',
                }}
            >
                {threeD.active? 
                    <LowPolyEarth />
                        :
                    <Box
                        sx={{
                            width: 300,
                            height: 300,
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
            </Box>
            <Stack justifyContent={'center'}>
                <Typography ref={titleRef} className="animated" variant="h3" sx={{ mb: 2 }}>
                    A propos de {event.name}
                </Typography>
                <Box ref={descriptionRef} className="animated">
                    <Paragraph>{event.description.secondary}</Paragraph>
                </Box>
            </Stack>
        </Stack>
    );
};

function animate({
    logoRef,
    titleRef,
    descriptionRef,
}: {
    logoRef: React.RefObject<HTMLElement | null>;
    titleRef: React.RefObject<HTMLElement | null>;
    descriptionRef: React.RefObject<HTMLElement | null>;
}) {
    if (!logoRef.current || !titleRef.current || !descriptionRef.current) return;

    const onScrollIn = gsap.timeline();

        onScrollIn.from( 
            logoRef.current, 
            { 
                y: 50, 
                autoAlpha: 0, 
                duration: 0.8, 
                scrollTrigger: 
                { 
                    scrub: 1, 
                    end: "top 60%", 
                    start: "top 90%", 
                    trigger: logoRef.current, 
                } 
            });

        onScrollIn.from(titleRef.current, {
            autoAlpha: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
                end: "top 60%",
                scrub: 1
            }
        });

        onScrollIn.from(descriptionRef.current, {
            autoAlpha: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
                scrub: 1,
                end: "top 60%",
                start: "top 90%",
                trigger: descriptionRef.current,
            }
        });
}