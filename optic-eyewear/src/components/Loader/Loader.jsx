// src/components/Loader/Loader.jsx
import { useState, useEffect } from 'react';
import styles from './Loader.module.css';

export default function Loader({ onDone }) {
  const [count,  setCount]  = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(iv);
          setTimeout(() => {
            setHiding(true);
            setTimeout(onDone, 650);
          }, 300);
          return 100;
        }
        // Accelerate in the middle, slow at start/end
        const increment = c < 30 ? 1 : c < 70 ? 2 : 1;
        return Math.min(100, c + increment);
      });
    }, 20);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className={`${styles.loader} ${hiding ? styles.hiding : ''}`}>
      {/* Background ripple rings */}
      <div className={styles.rings}>
        <span /><span /><span />
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>Loading Vision Experience</p>
        <div className={styles.brand}>ŌPTIC</div>
        <div className={styles.counter}>{String(count).padStart(2, '0')}</div>
        <div className={styles.bar}>
          <div
            className={styles.barFill}
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
        <p className={styles.tagline}>See Beyond</p>
      </div>
    </div>
  );
}
