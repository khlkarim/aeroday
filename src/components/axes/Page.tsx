"use client"

import gsap from "gsap";
import { useRef } from "react";
import { axes } from "@/content/axes";
import { useGSAP } from "@gsap/react";
import { team } from "@/content/team";
import { Box, Stack } from "@mui/material";
import Title from "@/components/text/Title";
import MaxCard from "@/components/axes/MaxCard";
import ProfileCard from "@/components/team/ProfileCard";

export default function Page({ id }: { id: number }) {
    const axe = axes[id];

    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animate({ cardRef, titleRef, profileRef });
    });

    return (
        <Stack 
            flexWrap={'wrap'} 
            gap={{ xs: 6, sm: 6, md: 2 }}
            justifyContent={'space-around'}
            flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} 
        >
            <Box ref={cardRef} className='animated' flex={2}>
                <MaxCard item={axe} />
            </Box>
            <Stack 
                gap={2}
                flex={1}
                alignItems={'center'}
                justifyContent={'space-around'} 
            >
                <Box ref={titleRef} className='animated' display="flex" alignItems="center" gap={1}>
                    <Title label="Responsable" />
                </Box>
                <Box ref={profileRef} className='animated'>
                    <ProfileCard item={team[axe.responsableId]} />
                </Box>
            </Stack>
        </Stack>
    );
}

function animate({
    cardRef,
    titleRef,
    profileRef,
}: {
    cardRef: React.RefObject<HTMLDivElement | null>;
    titleRef: React.RefObject<HTMLDivElement | null>;
    profileRef: React.RefObject<HTMLDivElement | null>;
}) {
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
}