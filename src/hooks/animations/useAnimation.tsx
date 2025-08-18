import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ANIMATION_PRESETS, AnimationDefinition, AnimationPreset, ScrollAnimationConfig } from "./config";

// ===== CORE ANIMATION HOOK =====
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
        distance,
        customAnimation,
        duration = 0.6,
        ease = "power2.out",
        delay = 0,
        stagger,
        scrollTrigger,
        trigger,
        disabled = false,
    } = config;

    const timelineRef = React.useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            if (disabled) return;
            const raw = target.current;
            if (!raw) return;

            // Normalize targets into a non-empty array of HTMLElements
            const els: HTMLElement[] = Array.isArray(raw)
                ? (raw.filter(Boolean) as HTMLElement[])
                : raw
                ? [raw as HTMLElement]
                : [];

            if (els.length === 0) return;

            // Resolve trigger element: explicit trigger ref or first target
            const triggerEl = trigger?.current ?? els[0];

            // Resolve animation definition
            const animation =
                customAnimation || (preset ? ANIMATION_PRESETS[preset](distance) : null);

            if (!animation) {
                console.warn(
                    "useAnimation: No animation preset or custom animation provided"
                );
                return;
            }

            // Build timeline (attach ScrollTrigger here so scrubbing/controls work)
            const tl = gsap.timeline({
                defaults: {
                    duration,
                    ease,
                    delay,
                    // Avoid conflicts with other timelines on same targets
                    overwrite: "auto",
                },
                scrollTrigger:
                    scrollTrigger || triggerEl
                        ? {
                              trigger: triggerEl,
                              start: "top 80%",
                              toggleActions: "play none none reverse",
                              invalidateOnRefresh: true,
                              // allow caller to override anything above
                              ...scrollTrigger,
                          }
                        : undefined,
            });

            // With ScrollTrigger, prevent early render of "from" values
            const fromSide = tl.vars.scrollTrigger
                ? { ...animation.from, immediateRender: false }
                : animation.from;

            tl.fromTo(
                els,
                fromSide,
                {
                    ...animation.to,
                    // Pass stagger through as-is (number or object)
                    ...(stagger !== undefined ? { stagger } : {}),
                }
            );

            timelineRef.current = tl;
            // Cleanup: revert clears inline styles and kills ScrollTriggers
            return () => {
                timelineRef.current = null;
            };
        },
        {
            dependencies: [
                disabled,
                preset,
                distance,
                duration,
                ease,
                delay,
                stagger,
                scrollTrigger,
                customAnimation,
                trigger?.current,
            ],
            // ✅ Scope – lets GSAP context automatically track & revert
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

// ===== CONVENIENCE HOOKS =====
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

