import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface UseStaggeredListProps {
    container: React.RefObject<HTMLElement | null>;
    target?: string;                      // selector relative to container
    stagger?: number | gsap.StaggerVars;  // number or stagger object
    y?: number;                           // distance to move from
    duration?: number;
    ease?: string;
    scrub?: boolean | number;             // allow smooth scrubbing
    start?: string;
    end?: string;
}

/**
 * Reusable hook to stagger in a list/grid of elements with scroll trigger support.
 * Usage: add className="stagger" to elements inside container.
 */
export const useStaggeredList = ({
    container,
    target = ".stagger",
    stagger = 0.15,
    y = 30,
    duration = 0.8,
    ease = "power3.out",
    scrub = 0.5,
    start = "top 80%",
    end = "bottom 10%",
}: UseStaggeredListProps) => {
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

            tl.current.from(target, {
                y,
                autoAlpha: 0,
                duration,
                stagger,
                ease,
            });
        },
        { scope: container }
    );

    return tl.current;
};
