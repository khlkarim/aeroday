import { useGSAP } from "@gsap/react";

export const useParallaxAnimation = (
  target: React.RefObject<HTMLElement>,
  config: {
    speed?: number;
    direction?: "vertical" | "horizontal";
    disabled?: boolean;
  } = {}
) => {
  const { speed = 0.5, direction = "vertical", disabled = false } = config;

  useGSAP(() => {
    if (disabled || !target.current) return;

    const element = target.current;
    
    gsap.to(element, {
      [direction === "vertical" ? "yPercent" : "xPercent"]: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }, [disabled, speed, direction]);
};