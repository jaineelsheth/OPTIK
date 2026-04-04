// src/components/TechStats/TechStats.jsx
import { useRef, useEffect, useState } from 'react';
import styles from './TechStats.module.css';
import { STATS } from '../../data/index.js';

function Counter({ target }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        if (isNaN(target)) { setValue(target); return; }
        const end = parseFloat(target), duration = 1600, steps = 60, step = end / steps;
        let cur = 0;
        const iv = setInterval(() => {
          cur = Math.min(end, cur + step);
          setValue(cur % 1 === 0 ? cur : cur.toFixed(0));
          if (cur >= end) clearInterval(iv);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref} className={styles.counterVal}>{value}</span>;
}

export default function TechStats() {
  return (
    <section id="technology" className={styles.section}>
      <div className={styles.banner}>
        <div className={styles.ringWrap}>
          <div className={styles.ringOuter}/>
          <div className={styles.ringMid}/>
          <div className={styles.ringInner}/>
          <div className={styles.ringCore}>
            <svg viewBox="0 0 80 80" width="48">
              <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(26,86,255,0.2)" strokeWidth="1"/>
              <circle cx="40" cy="40" r="16" fill="rgba(26,86,255,0.3)"/>
              <circle cx="40" cy="40" r="6" fill="#1a56ff" opacity="0.9"/>
            </svg>
          </div>
          {['HydraCore™','UV Shield','HEV Block','O₂ Flow'].map((label,i) => {
            const angle = (i/4)*Math.PI*2 - Math.PI/2;
            const r = 110;
            return (
              <div key={label} className={styles.ringLabel}
                style={{ left:`${50+Math.cos(angle)*r}%`, top:`${50+Math.sin(angle)*r}%` }}>
                {label}
              </div>
            );
          })}
        </div>
        <div className={styles.bannerCopy}>
          <div className={`${styles.label} reveal-left`}><span className={styles.labelLine}/>Science</div>
          <h2 className={`${styles.bannerTitle} reveal-left delay-2`}>
            Built for<br/>the <em className={styles.em}>modern</em><br/>eye.
          </h2>
          <p className={`${styles.bannerDesc} reveal-left delay-3`}>
            We obsess over details others ignore. Every lens starts as a raw polymer blank,
            precision-ground to within 0.001 mm. Seven individual coating layers — each tested
            for durability, clarity, and UV performance.
          </p>
          <button className={`${styles.learnBtn} reveal-left delay-4`}>
            <span>Learn our process</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.statsRow}>
        {STATS.map((s,i) => (
          <div key={i} className={`${styles.stat} reveal delay-${i+1}`}>
            <div className={styles.statTop}>
              <Counter target={s.num}/>
              <sup className={styles.statSup}>{s.sup}</sup>
            </div>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statBar}><div className={styles.statBarFill}/></div>
          </div>
        ))}
      </div>
    </section>
  );
}
