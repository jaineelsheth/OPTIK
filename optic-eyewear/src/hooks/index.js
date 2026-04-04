// src/hooks/useReveal.js
import { useEffect } from 'react';

/**
 * Adds 'is-visible' class to all .reveal / .reveal-left / .reveal-right
 * elements inside the given ref (or document if no ref) when they enter viewport.
 */
export function useReveal(containerRef = null) {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right';
    const root = containerRef?.current ?? document;
    const elements = root.querySelectorAll(selectors);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [containerRef]);
}


// src/hooks/useScrollProgress.js
import { useState, useEffect } from 'react';

/**
 * Returns scroll progress (0–1) of the element identified by `ref`
 * relative to the viewport.
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}


// src/hooks/useSmoothScroll.js
import { useEffect } from 'react';

/**
 * Lightweight CSS smooth scroll emulation.
 * In a real setup, import Lenis here.
 * Provides a global scroll-progress CSS variable for parallax layers.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Update --scroll-y CSS custom property for use in pure CSS parallax
    const onScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-y', window.scrollY + 'px');
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
