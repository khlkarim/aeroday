"use client"

import MaxCard from "@/components/axes/MaxCard";
import ProfileCard from "@/components/team/ProfileCard";
import { axes } from "@/content/axes";
import { team } from "@/content/team";
import { useGSAP } from "@gsap/react";
import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";

export default function Page({ id }: { id: number }) {
    const axe = axes[id];

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
                    <MaxCard item={axe} />
                </Box>
                <Box className="flex flex-col justify-around items-center">
                    <Typography ref={titleRef} className='animated' variant="h2" margin={2}>
                        Responsable
                    </Typography>
                    <Box ref={profileRef} className='animated'>
                       <ProfileCard item={team[axe.responsableId]} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}