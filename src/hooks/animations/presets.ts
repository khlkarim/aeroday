import React from "react";

export interface useAnimationProps {
    to: gsap.TweenVars;
    from: gsap.TweenVars;
    target: React.RefObject<HTMLElement | null>;
    trigger?: React.RefObject<HTMLElement | null>;
    scrollTrigger?: Omit<ScrollTrigger.Vars, 'trigger'>;
}

export interface BaseAnimationConfig {
    duration?: number;
    ease?: string;
    delay?: number;
    stagger?: number | gsap.StaggerVars;
}

export interface ScrollAnimationConfig extends BaseAnimationConfig {
    scrollTrigger?: Omit<ScrollTrigger.Vars, 'trigger'>;
    trigger?: React.RefObject<HTMLElement | null>;
    disabled?: boolean;
}

export interface HoverAnimationConfig extends BaseAnimationConfig {
    disabled?: boolean;
}

export type AnimationPreset = 
    | 'slideInLeft'
    | 'slideInRight' 
    | 'slideInUp'
    | 'slideInDown'
    | 'fadeIn'
    | 'scaleIn'
    | 'rotateIn'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'slideOutUp'
    | 'slideOutDown'
    | 'fadeOut'
    | 'scaleOut';

export interface AnimationDefinition {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
}

export const ANIMATION_PRESETS: Record<AnimationPreset, (distance?: number) => AnimationDefinition> = {
    slideInLeft: (distance = 60) => ({
        from: { x: -distance, autoAlpha: 0 },
        to: { x: 0, autoAlpha: 1 }
    }),
    slideInRight: (distance = 60) => ({
        from: { x: distance, autoAlpha: 0 },
        to: { x: 0, autoAlpha: 1 }
    }),
    slideInUp: (distance = 60) => ({
        from: { y: distance, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 }
    }),
    slideInDown: (distance = 60) => ({
        from: { y: -distance, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 }
    }),
    slideOutLeft: (distance = 60) => ({
        from: { x: 0, autoAlpha: 1 },
        to: { x: -distance, autoAlpha: 0 }
    }),
    slideOutRight: (distance = 60) => ({
        from: { x: 0, autoAlpha: 1 },
        to: { x: distance, autoAlpha: 0 }
    }),
    slideOutUp: (distance = 60) => ({
        from: { y: 0, autoAlpha: 1 },
        to: { y: -distance, autoAlpha: 0 }
    }),
    slideOutDown: (distance = 60) => ({
        from: { y: 0, autoAlpha: 1 },
        to: { y: distance, autoAlpha: 0 }
    }),
    fadeIn: () => ({
        from: { autoAlpha: 0 },
        to: { autoAlpha: 1 }
    }),
    fadeOut: () => ({
        from: { autoAlpha: 1 },
        to: { autoAlpha: 0 }
    }),
    scaleIn: () => ({
        from: { scale: 0.8, autoAlpha: 0 },
        to: { scale: 1, autoAlpha: 1 }
    }),
    scaleOut: () => ({
        from: { scale: 1, autoAlpha: 1 },
        to: { scale: 0.8, autoAlpha: 0 }
    }),
    rotateIn: () => ({
        from: { rotation: -180, scale: 0.8, autoAlpha: 0 },
        to: { rotation: 0, scale: 1, autoAlpha: 1 }
    })
};

export const createCustomAnimation = (
    from: gsap.TweenVars,
    to: gsap.TweenVars
): AnimationDefinition => ({ from, to });

export const combineAnimations = (
    ...animations: AnimationDefinition[]
): AnimationDefinition => {
    return animations.reduce(
        (combined, current) => ({
            from: { ...combined.from, ...current.from },
            to: { ...combined.to, ...current.to }
        }),
        { from: {}, to: {} }
    );
};