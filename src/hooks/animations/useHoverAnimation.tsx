import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HoverAnimationConfig } from "./config";

// ===== HOVER ANIMATIONS =====
export const useHoverAnimation = (
  target: React.RefObject<HTMLElement | null>,
  config: HoverAnimationConfig & {
    hoverAnimation?: gsap.TweenVars;
    restAnimation?: gsap.TweenVars;
    scale?: number;
    lift?: number;
  }
) => {
  const {
    duration = 0.3,
    ease = "power2.out",
    scale = 1.05,
    lift = 8,
    hoverAnimation,
    restAnimation,
    disabled = false
  } = config;

  useGSAP(() => {
    if (disabled || !target.current) return;

    const element = target.current;
    
    const defaultHover = hoverAnimation || { 
      scale, 
      y: -lift,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
    };
    
    const defaultRest = restAnimation || { 
      scale: 1, 
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
    };

    const handleMouseEnter = () => {
      gsap.to(element, { ...defaultHover, duration, ease });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { ...defaultRest, duration, ease });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);
};

export const useHoverScale = (
    target: React.RefObject<HTMLElement>, 
    config: HoverAnimationConfig & {
        hoverAnimation?: gsap.TweenVars;
        restAnimation?: gsap.TweenVars;
        scale?: number;
        lift?: number;
    }) => useHoverAnimation(target, config);