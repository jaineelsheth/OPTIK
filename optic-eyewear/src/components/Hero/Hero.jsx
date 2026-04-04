// src/components/Hero/Hero.jsx
import styles from './Hero.module.css';

const HERO_LENS_SVG = (
  <svg viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg" className={styles.lenssvg}>
    <defs>
      <radialGradient id="hg1" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#1A56FF" stopOpacity="0.18" />
        <stop offset="55%"  stopColor="#00C2FF" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#1A56FF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="hg2" cx="38%" cy="35%" r="58%">
        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#C8D9FF" stopOpacity="0.2" />
      </radialGradient>
      <filter id="hglow">
        <feGaussianBlur stdDeviation="8" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="softblur">
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>

    {/* Outer aura */}
    <circle cx="220" cy="220" r="210" fill="url(#hg1)" className={styles.aura} />

    {/* Orbit rings */}
    <circle cx="220" cy="220" r="195" fill="none" stroke="rgba(26,86,255,0.08)" strokeWidth="1" className={styles.ring1} />
    <circle cx="220" cy="220" r="168" fill="none" stroke="rgba(0,194,255,0.06)" strokeWidth="0.5" className={styles.ring2} />

    {/* Lens body */}
    <circle cx="220" cy="220" r="130" fill="none" stroke="rgba(26,86,255,0.2)" strokeWidth="2" />
    <circle cx="220" cy="220" r="129" fill="rgba(26,86,255,0.04)" />

    {/* Iris gradient */}
    <circle cx="220" cy="220" r="100" fill="url(#hg2)" opacity="0.5" />
    <circle cx="220" cy="220" r="100" fill="none" stroke="rgba(26,86,255,0.15)" strokeWidth="1" />

    {/* Iris lines */}
    <g opacity="0.14" stroke="rgba(26,86,255,0.8)" strokeWidth="0.6">
      {[0,22.5,45,67.5,90,112.5,135,157.5].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={220 + Math.cos(rad) * 55}
            y1={220 + Math.sin(rad) * 55}
            x2={220 + Math.cos(rad) * 100}
            y2={220 + Math.sin(rad) * 100}
          />
        );
      })}
    </g>

    {/* Pupil */}
    <circle cx="220" cy="220" r="42" fill="rgba(26,86,255,0.18)" />
    <circle cx="220" cy="220" r="28" fill="rgba(26,86,255,0.28)" />
    <circle cx="220" cy="220" r="14" fill="rgba(26,86,255,0.45)" />
    <circle cx="220" cy="220" r="5" fill="#1A56FF" filter="url(#hglow)" className={styles.pupil} />

    {/* Specular highlights */}
    <path d="M 178 186 Q 196 174 212 182" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" className={styles.glare1} />
    <path d="M 186 200 Q 194 195 202 198" fill="none" stroke="rgba(255,255,255,0.5)"  strokeWidth="2" strokeLinecap="round" className={styles.glare2} />

    {/* Data points on orbit */}
    {[0,90,180,270].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return (
        <circle
          key={deg}
          cx={220 + Math.cos(rad) * 168}
          cy={220 + Math.sin(rad) * 168}
          r="3"
          fill="#1A56FF"
          opacity="0.4"
        />
      );
    })}

    {/* Cyan accent ring */}
    <circle cx="220" cy="220" r="130" fill="none" stroke="rgba(0,194,255,0.2)" strokeWidth="1" strokeDasharray="4 12" className={styles.dashRing} />
  </svg>
);

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background gradient blobs */}
      <div className={styles.blobTop} />
      <div className={styles.blobRight} />
      <div className={styles.grid} />

      {/* Lens visual */}
      <div className={styles.lensWrap}>
        {HERO_LENS_SVG}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} />
          Vision. Redefined.
        </div>

        <h1 className={styles.title}>
          <span className={styles.line}><span>See the</span></span>
          <span className={styles.line}><span className={styles.accent}>world</span></span>
          <span className={styles.line}><span>clearly.</span></span>
        </h1>

        <div className={styles.bottom}>
          <p className={styles.desc}>
            Premium contact lenses engineered<br />
            for the modern eye. Crafted for those<br />
            who refuse to compromise on clarity.
          </p>
          <div className={styles.ctas}>
            <button className={styles.btnPrimary}>
              <span>Shop Collection</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.btnGhost}>Our Technology</button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollCaret} />
      </div>
    </section>
  );
}
