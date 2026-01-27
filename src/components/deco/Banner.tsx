"use client"

import gsap from "gsap";
import React, { useRef } from "react";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";

const Banner: React.FC = () => {
    const pathname = usePathname();
    const bannerRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        if (bannerRef.current) animate(bannerRef.current);
    }, { dependencies: [pathname], scope: bannerRef });
    
    if(pathname.length > 1)
    {
        return <></>;
    }

    return (
        <Box
            ref={bannerRef}
            className='animated'
            sx={{
                width: '100%',
                height: { xs: '8rem', sm: '8rem', md: '10rem'},
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

function animate(element: HTMLDivElement)
{
    gsap.fromTo(
        element,
        {
            y: -40,
            autoAlpha: 0,
        },
        {
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.out",
        }
    );
}