// src/components/ParallaxText/ParallaxText.jsx
import { useRef, useEffect, useState } from 'react';
import styles from './ParallaxText.module.css';

export default function ParallaxText() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = 1 - rect.bottom / (window.innerHeight + rect.height);

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${progress * -18}%)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${progress * 12}%)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.wrapper} ref={sectionRef}>
      {/* Top row – drifts left */}
      <div className={styles.row}>
        <div
          ref={row1Ref}
          className={styles.track}
          style={{ willChange: 'transform' }}
        >
          <span className={styles.text}>
            Vision is not a luxury — it's a{' '}
            <em className={styles.em}>right</em> — See beyond ordinary —{' '}
          </span>
          <span className={styles.text} aria-hidden>
            Vision is not a luxury — it's a{' '}
            <em className={styles.em}>right</em> — See beyond ordinary —{' '}
          </span>
        </div>
      </div>

      {/* Bottom row – drifts right, outlined style */}
      <div className={styles.row}>
        <div
          ref={row2Ref}
          className={`${styles.track} ${styles.trackOutline}`}
          style={{ willChange: 'transform' }}
        >
          <span className={styles.text}>
            Clarity &mdash; Precision &mdash; Comfort &mdash; Science &mdash;{' '}
          </span>
          <span className={styles.text} aria-hidden>
            Clarity &mdash; Precision &mdash; Comfort &mdash; Science &mdash;{' '}
          </span>
        </div>
      </div>
    </div>
  );
}
