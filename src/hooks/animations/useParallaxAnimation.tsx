import gsap from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import { ScrollAnimationConfig } from "./presets";

export const useParallaxAnimation = (
    target: React.RefObject<HTMLElement | HTMLElement[] | null>,
    config: ScrollAnimationConfig & {
        speed?: number;
        direction?: "vertical" | "horizontal";
    } = {}
) => {
    const { 
        ease,
        delay, 
        trigger,
        duration,
        speed = 0.5, 
        scrollTrigger, 
        disabled = false,
        direction = "vertical", 
    } = config;

    const timelineRef = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (disabled || !target.current) return;

        const elements: HTMLElement[] = Array.isArray(target.current)
            ? (target.current.filter(Boolean) as HTMLElement[])
            : target.current
            ? [target.current as HTMLElement]
            : [];

        if (elements.length === 0) return;

        const triggerEl = trigger?.current ?? elements[0];

        const axis = direction === "vertical" ? "yPercent" : "xPercent";

        const tl = gsap.timeline({
            defaults: {
                ease,
                delay,
                duration,
                overwrite: "auto",
            },
            scrollTrigger: (scrollTrigger || triggerEl)
                ? {
                      scrub: 1,
                      start: "top bottom",
                      end: "bottom top",
                      trigger: triggerEl,
                      ...scrollTrigger,
                  }
                : undefined,
        });

        tl.fromTo(
            elements,
            { [axis]: -100 * speed },
            { [axis]: 0, ease: "none" }
        );

        timelineRef.current = tl;
        console.log(trigger?.current);

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            timelineRef.current = null;
        };
    }, { dependencies: [target, config] });

    return {
        timeline: timelineRef.current,
        play: () => timelineRef.current?.play(),
        pause: () => timelineRef.current?.pause(),
        reverse: () => timelineRef.current?.reverse(),
        restart: () => timelineRef.current?.restart(),
    };
};
