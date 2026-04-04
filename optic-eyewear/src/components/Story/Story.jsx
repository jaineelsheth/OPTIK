// src/components/Story/Story.jsx
import styles from './Story.module.css';

export default function Story() {
  return (
    <section id="story" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.imageGrid}>
          <div className={`${styles.imgBox} ${styles.imgBoxWide} reveal-left`}><StoryVisual variant="wide"/></div>
          <div className={`${styles.imgBox} reveal-left delay-2`}><StoryVisual variant="sq1"/></div>
          <div className={`${styles.imgBox} reveal-left delay-3`}><StoryVisual variant="sq2"/></div>
        </div>
        <div className={styles.textCol}>
          <div className={styles.label}><span className={styles.labelLine}/>Our Story</div>
          <h2 className={`${styles.title} reveal-right`}>Born from a<br/>belief in <em className={styles.em}>clarity</em></h2>
          <div className={`${styles.body} reveal-right delay-2`}>
            <p>ŌPTIC was born in a small Mumbai optician's studio in 2019, when our founder — a third-generation optician — grew frustrated with the relentless compromise between comfort and quality.</p>
            <p>We believe <strong>vision is your most precious sense.</strong> That conviction drives every material choice, every coating, every lens curve we design.</p>
            <p>Today, we collaborate with optical engineers in Germany, polymer scientists in Japan, and frame designers in Milan to deliver eyewear that performs as beautifully as it looks.</p>
          </div>
          <div className={`${styles.pillars} reveal-right delay-3`}>
            {['Precision','Comfort','Clarity','Trust'].map(p=>(
              <div key={p} className={styles.pillar}><div className={styles.pillarDot}/>{p}</div>
            ))}
          </div>
          <a href="#" className={`${styles.readMore} reveal-right delay-4`}>
            Read the full story
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function StoryVisual({ variant }) {
  if (variant === 'wide') return (
    <svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" width="100%">
      <rect width="560" height="240" fill="#0d0d18"/>
      <circle cx="280" cy="120" r="130" fill="none" stroke="rgba(26,86,255,0.07)" strokeWidth="48"/>
      <circle cx="280" cy="120" r="66" fill="rgba(26,86,255,0.06)"/>
      <text x="280" y="108" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="18" fill="rgba(26,86,255,0.2)" fontStyle="italic" letterSpacing="3">The Vision</text>
      <text x="280" y="136" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="36" fill="rgba(255,255,255,0.04)" letterSpacing="10">ŌPTIC</text>
    </svg>
  );
  if (variant === 'sq1') return (
    <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" width="100%">
      <rect width="260" height="260" fill="#0a0a14"/>
      <g transform="translate(130,130)">
        <circle cx="0" cy="0" r="70" fill="none" stroke="rgba(26,86,255,0.12)" strokeWidth="1"/>
        <circle cx="0" cy="0" r="48" fill="rgba(26,86,255,0.05)"/>
        <circle cx="0" cy="0" r="24" fill="rgba(26,86,255,0.1)"/>
        <text x="0" y="5" textAnchor="middle" fontFamily="Syne,sans-serif" fontSize="8" fill="rgba(0,194,255,0.45)" letterSpacing="4">CLARITY</text>
      </g>
    </svg>
  );
  return (
    <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" width="100%">
      <rect width="260" height="260" fill="#080812"/>
      <line x1="0" y1="260" x2="260" y2="0" stroke="rgba(26,86,255,0.04)" strokeWidth="50"/>
      <text x="130" y="114" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="56" fill="rgba(26,86,255,0.1)" fontStyle="italic">2019</text>
      <text x="130" y="142" textAnchor="middle" fontFamily="Syne,sans-serif" fontSize="8" fill="rgba(0,194,255,0.35)" letterSpacing="5">FOUNDED</text>
    </svg>
  );
}
