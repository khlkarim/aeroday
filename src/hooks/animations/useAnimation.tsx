import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ANIMATION_PRESETS, AnimationDefinition, AnimationPreset, ScrollAnimationConfig } from "./presets";

export const useAnimation = (
    target: React.RefObject<HTMLElement | HTMLElement[] | null>,
    config: ScrollAnimationConfig & {
        preset?: AnimationPreset;
        distance?: number;
        customAnimation?: AnimationDefinition;
    }   
) => {
    const {
        preset,
        stagger,
        trigger,
        distance,
        delay = 0,
        scrollTrigger,
        duration = 0.6,
        customAnimation,
        disabled = false,
        ease = "power2.out",
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
        const animation = customAnimation || (preset ? ANIMATION_PRESETS[preset](distance) : null);

        if (!animation) {
            console.warn("useAnimation: No animation preset or custom animation provided");
            return;
        }

        const tl = gsap.timeline({
            defaults: {
                ease,
                delay,
                duration,
                overwrite: "auto",
            },
            scrollTrigger:
                scrollTrigger || triggerEl
                    ? {
                            start: "top 80%",
                            trigger: triggerEl,
                            ...scrollTrigger,
                        }
                    : undefined,
        });

        const from = tl.vars.scrollTrigger
            ? { ...animation.from, immediateRender: false }
            : animation.from;

        tl.fromTo(
            elements,
            from,
            {
                ...animation.to,
                ...(stagger !== undefined ? { stagger } : {}),
            }
        );

        timelineRef.current = tl;
        return () => {
            timelineRef.current = null;
        };
    },
    {
        dependencies: [ target, config ],
        scope: target,
    }
    );

    return {
        timeline: timelineRef.current,
        play: () => timelineRef.current?.play(),
        pause: () => timelineRef.current?.pause(),
        reverse: () => timelineRef.current?.reverse(),
        restart: () => timelineRef.current?.restart(),
    };
};

export const useFadeIn = (target: React.RefObject<HTMLElement | null>, config?: ScrollAnimationConfig) =>
  useAnimation(target, { preset: "fadeIn", ...config });

export const useSlideInUp = (target: React.RefObject<HTMLElement>, config?: ScrollAnimationConfig & { distance?: number }) =>
  useAnimation(target, { preset: "slideInUp", ...config });

export const useSlideInLeft = (target: React.RefObject<HTMLElement>, config?: ScrollAnimationConfig & { distance?: number }) =>
  useAnimation(target, { preset: "slideInLeft", ...config });

export const useSlideInRight = (target: React.RefObject<HTMLElement>, config?: ScrollAnimationConfig & { distance?: number }) =>
  useAnimation(target, { preset: "slideInRight", ...config });

export const useScaleIn = (target: React.RefObject<HTMLElement>, config?: ScrollAnimationConfig) =>
  useAnimation(target, { preset: "scaleIn", ...config });

