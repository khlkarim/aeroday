import { AnimationPreset, ScrollAnimationConfig } from "./config";
import { useAnimation } from "./useAnimation";

// ===== ADVANCED COMPOSITION HOOKS =====
export const useStaggeredAnimation = (
  targets: React.RefObject<HTMLElement[]> | React.RefObject<NodeListOf<Element>>,
  config: ScrollAnimationConfig & {
    preset: AnimationPreset;
    distance?: number;
    staggerAmount?: number;
    staggerFrom?: "start" | "center" | "end" | "edges" | "random";
  }
) => {
  const {
    preset,
    distance,
    staggerAmount = 0.1,
    staggerFrom = "start",
    ...restConfig
  } = config;

  // Convert NodeListOf<Element> to HTMLElement[] if necessary
  let normalizedTargets: React.RefObject<HTMLElement | HTMLElement[]>;

  if (
    (targets as React.RefObject<NodeListOf<Element>>).current instanceof NodeList
  ) {
    const nodeList = (targets as React.RefObject<NodeListOf<Element>>).current;
    // Filter only HTMLElements
    const htmlElements = nodeList
      ? Array.from(nodeList).filter(
          (el): el is HTMLElement => el instanceof HTMLElement
        )
      : [];
    normalizedTargets = { current: htmlElements };
  } else {
    normalizedTargets = targets as React.RefObject<HTMLElement | HTMLElement[]>;
  }

  return useAnimation(normalizedTargets, {
    ...restConfig,
    preset,
    distance,
    stagger: {
      amount: staggerAmount,
      from: staggerFrom,
      ease: "power2.out"
    }
  });
};