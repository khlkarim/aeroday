"use client"

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MaxCard from "@/components/challenges/MaxCard";
import ProfileCard from "@/components/team/ProfileCard";
import { challenges } from "@/content/challenges";
import { team } from "@/content/team";
import { Box, Typography } from "@mui/material";

export default function Page({ id }: { id: number }) {
    const challenge = challenges[id];

    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current || !titleRef.current || !profileRef.current) return;

        gsap.fromTo(
            cardRef.current,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }
        );

        gsap.fromTo(
            titleRef.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
        );

        gsap.fromTo(
            profileRef.current,
            { autoAlpha: 0, scale: 0.9 },
            { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.7, ease: "power3.out" }
        );
    }, []);

    return (
        <>
            <Box className="flex flex-wrap items-center justify-around gap-6">
                <Box ref={cardRef} className='animated'>
                    <MaxCard item={challenge} />
                </Box>
                <Box className="flex flex-col justify-around items-center">
                    <Typography ref={titleRef} className='animated' variant="h2" margin={2}>
                        Responsable
                    </Typography>
                    <Box ref={profileRef} className='animated'>
                        <ProfileCard item={team[challenge.responsableId]} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}