// src/components/Marquee/Marquee.jsx
// ─────────────────────────────────────
// Kinetic marquee with scroll-velocity blur
// ─────────────────────────────────────
import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';
import { MARQUEE_ITEMS } from '../../data/index.js';

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let lastScroll = 0;
    let velocity = 0;
    let currentBlur = 0;
    let rafId;

    const update = () => {
      const lenis = window.__lenis;
      if (lenis) {
        velocity = Math.abs(lenis.velocity || 0);
      } else {
        const currentScroll = window.scrollY;
        velocity = Math.abs(currentScroll - lastScroll);
        lastScroll = currentScroll;
      }

      // Map velocity to blur (0–3px range)
      const targetBlur = Math.min(velocity * 0.15, 3);
      currentBlur += (targetBlur - currentBlur) * 0.1;

      const tracks = wrapper.querySelectorAll('[data-marquee-track]');
      tracks.forEach(track => {
        track.style.filter = currentBlur > 0.1 ? `blur(${currentBlur.toFixed(1)}px)` : '';
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {/* Top row – left */}
      <div className={styles.row}>
        <div className={styles.track} data-marquee-track>
          {items.map((item, i) => (
            <MarqueeItem key={i} text={item} alt={i % 3 === 1} />
          ))}
        </div>
      </div>
      {/* Bottom row – right (reversed) */}
      <div className={styles.row}>
        <div className={`${styles.track} ${styles.reverse}`} data-marquee-track>
          {[...items].reverse().map((item, i) => (
            <MarqueeItem key={i} text={item} alt={i % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MarqueeItem({ text, alt }) {
  return (
    <span className={`${styles.item} ${alt ? styles.itemAlt : ''}`}>
      {text}
      <span className={styles.dot} />
    </span>
  );
}
