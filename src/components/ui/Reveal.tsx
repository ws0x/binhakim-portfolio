"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal primitive.
 *
 * Replaces the per-section framer-motion `useInView` + `<motion.div variants>`
 * pattern. That pattern forced every section component to be a Client
 * Component purely to animate, which pulled the whole animation library onto
 * the critical path of a page that is otherwise static content.
 *
 * This is the only client component the sections need: it observes once and
 * adds a class, letting CSS do the transition. Sections stay Server Components.
 *
 * The visible flag is applied straight to the DOM node rather than held in
 * React state — the class *is* the state, it lives on an external system, and
 * routing it through `useState` would only buy an extra render per element
 * (53 of them on the homepage).
 *
 * `delay` staggers siblings; pass the map index to reproduce the old
 * `custom={i}` stagger.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("reveal-in");

    // Viewers who asked for less motion get the final state immediately.
    // The CSS guards this too, but there is no point running an observer
    // whose outcome is already decided.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    // Already on screen at mount (above the fold) — reveal without waiting for
    // the first intersection callback, which would otherwise flash empty space.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect(); // reveal once, never re-hide
        }
      },
      { rootMargin: "-60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay * 0.08}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
