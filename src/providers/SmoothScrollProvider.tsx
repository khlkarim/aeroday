"use client"

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
 
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useGSAP(() => {
        ScrollSmoother.create({
            smooth: 1
        });
    });

    return (
        <div id="smooth-wrapper" className="App">
            <div id="smooth-content">
                {children}
            </div>
        </div>
    );
}