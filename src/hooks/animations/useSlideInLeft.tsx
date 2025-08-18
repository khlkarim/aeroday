import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseAnimationProps {
    ease?: string;
    scale?: number;
    stagger?: number;
    distance?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
    target: React.RefObject<HTMLElement | null>;
    trigger?: React.RefObject<HTMLElement | null>; // <-- Added
}

/**
 * Slide in from left
 */
export const useSlideInLeft = (props: UseAnimationProps) => {
    const { 
        target, 
        distance = 50, 
        duration = 0.5, 
        ease = "power3.out", 
        stagger = 0.1, 
        scrollTrigger,
        trigger
    } = props;

    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 0, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { x: -distance, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration, stagger }
        );
    });

    return tl.current;
};

/**
 * Slide in from right
 */
export const useSlideInRight = (props: UseAnimationProps) => {
    const { 
        target, 
        distance = 50, 
        duration = 0.5, 
        ease = "power3.out", 
        stagger = 0.1, 
        scrollTrigger,
        trigger
    } = props;
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 0, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { x: distance, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration, stagger }
        );
    }, { scope: target });

    return tl.current;
};

/**
 * Slide out to left
 */
export const useSlideOutLeft = (props: UseAnimationProps) => {
    const { 
        target, 
        distance = 50, 
        duration = 0.5, 
        ease = "power3.in", 
        stagger = 0.1, 
        scrollTrigger,
        trigger
    } = props;
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 1, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { x: 0, autoAlpha: 1 },
            { x: -distance, autoAlpha: 0, duration, stagger }
        );
    });

    return tl.current;
};

/**
 * Slide out to right
 */
export const useSlideOutRight = (props: UseAnimationProps) => {
    const { 
        target, 
        distance = 50, 
        duration = 0.5, 
        ease = "power3.in", 
        stagger = 0.1, 
        scrollTrigger,
        trigger
    } = props;
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 1, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { x: 0, autoAlpha: 1 },
            { x: distance, autoAlpha: 0, duration, stagger }
        );
    });

    return tl.current;
};

/**
 * Slide up
 */
export const useSlideUp = (props: UseAnimationProps) => {
    const { 
        target, 
        distance = 50, 
        duration = 0.5, 
        ease = "power3.out", 
        stagger = 0.1, 
        scrollTrigger,
        trigger
    } = props;
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 0, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { y: distance, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration, stagger }
        );
    }, { scope: target });

    return tl.current;
};

/**
 * Fade in
 */
export const useFadeIn = (props: UseAnimationProps) => {
    const { 
        target, 
        duration = 0.5, 
        ease = "power3.out", 
        stagger = 0.1, 
        scrollTrigger,
        trigger
    } = props;
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 0, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration, stagger }
        );
    });
  
    return tl.current;
};

/**
 * Fade out
 */
export const useFadeOut = (props: UseAnimationProps) => {
    const { 
        target, 
        duration = 0.5, 
        ease = "power3.out", 
        stagger = 0.1, 
        scrollTrigger,
        trigger
    } = props;
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 1, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration, stagger }
        );
    });

    return tl.current;
};

/**
 * Scale in (pop)
 */
export const useScaleIn = (props: UseAnimationProps) => {
    const { 
        target, 
        duration = 0.5, 
        ease = "power3.out", 
        scrollTrigger,
        trigger
    } = props;
    const tl = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!target.current) return;

        const triggerEl = trigger?.current;
        const mergedScrollTrigger = scrollTrigger
            ? { ...scrollTrigger, trigger: triggerEl ?? scrollTrigger.trigger }
            : triggerEl
                ? { trigger: triggerEl }
                : undefined;

        tl.current = gsap.timeline({
            defaults: { opacity: 0, ease },
            scrollTrigger: mergedScrollTrigger,
        });

        tl.current.fromTo(
            target.current,
            { scale: 0.8, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration }
        );
    });

    return tl.current;
};

/**
 * Scale up on hover
 */
export const useScaleOnHover = (props: UseAnimationProps) => {
    const {
        target,
        scale = 1.05,
        duration = 0.2,
        ease = "power3.out",
    } = props;

    useGSAP(() => {
        if (!target.current) return;

        const el = target.current;

        const handleMouseEnter = () => {
            gsap.to(el, { scale, duration, ease });
        };

        const handleMouseLeave = () => {
            gsap.to(el, { scale: 1, duration, ease });
        };

        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    });
};