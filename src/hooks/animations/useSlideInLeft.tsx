import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

interface UseSlideInLeftProps {
    container: React.RefObject<HTMLElement | null>;
    target?: string;
    stagger?: number;
    distance?: number;
    duration?: number;
    ease?: string;
    scrub?: boolean;
    start?: string;
    end?: string;
}

export const useSlideInLeft = ({
    container,
    target = ".slide-in-left",
    stagger = 0.1,
    distance = 50,
    duration = 0.5,
    ease = "power3.out",
    scrub = true,
    start = "top 100%",
    end = "top 0%"
}: UseSlideInLeftProps) => {
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            if (!container.current) return;

            tl.current = gsap.timeline({
                defaults: { opacity: 0, ease },
                scrollTrigger: {
                    trigger: container.current,
                    start,
                    end,
                    scrub,
                },
            });

            tl.current.from(
                target,
                {
                    x: -distance,
                    autoAlpha: 0,
                    duration,
                    stagger,
                },
                0
            );
        },
        { scope: container }
    );

    return tl.current;
};
