import { ANIMATION_PRESETS, AnimationDefinition, AnimationPreset, ScrollAnimationConfig } from "./config";
import { useAnimation } from "./useAnimation";

export const useRevealAnimation = (
  target: React.RefObject<HTMLElement>,
  config: ScrollAnimationConfig & {
    direction?: "left" | "right" | "up" | "down";
    clipPath?: boolean;
  } = {}
) => {
  const {
    direction = "up",
    clipPath = true,
    duration = 1,
    ease = "power3.out",
    ...restConfig
  } = config;

  const clipPathValues = {
    left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right: { from: "inset(0 0 0 100%)", to: "inset(0 0% 0 0%)" },
    up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" }
  };

  const animation: AnimationDefinition = clipPath
    ? {
        from: { clipPath: clipPathValues[direction].from },
        to: { clipPath: clipPathValues[direction].to }
      }
    : ANIMATION_PRESETS[`slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)}` as AnimationPreset]();

  return useAnimation(target, {
    ...restConfig,
    duration,
    ease,
    customAnimation: animation
  });
};