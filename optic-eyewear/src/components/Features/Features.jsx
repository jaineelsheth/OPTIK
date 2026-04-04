// src/components/Features/Features.jsx
import { useRef } from 'react';
import styles from './Features.module.css';
import { FEATURES } from '../../data/index.js';

export default function Features() {
  const ref = useRef(null);

  return (
    <section id="technology" className={styles.section} ref={ref}>
      {/* Section header */}
      <div className={styles.header}>
        <div className={styles.label}>
          <span className={styles.labelLine} />
          Technology
        </div>
        <h2 className={`${styles.title} reveal`}>
          The science<br />of <em className={styles.em}>perfect</em> vision
        </h2>
        <p className={`${styles.headerSub} reveal delay-2`}>
          Four pillars engineered to protect, comfort, and enhance your sight every single day.
        </p>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];
  return (
    <div className={`${styles.card} reveal ${delays[index]}`}>
      {/* Big number */}
      <div className={styles.num}>{feature.num}</div>

      {/* Tag */}
      <div className={styles.cardTag}>{feature.tag}</div>

      {/* Title */}
      <h3 className={styles.cardTitle}>
        {feature.title.split('\n').map((line, i) => (
          <span key={i} className={styles.cardTitleLine}>{line}</span>
        ))}
      </h3>

      {/* Description */}
      <p className={styles.cardDesc}>{feature.desc}</p>

      {/* Stat callout */}
      <div className={styles.statRow}>
        <span className={styles.statNum}>{feature.stat}</span>
        <span className={styles.statLabel}>{feature.statLabel}</span>
      </div>

      {/* Animated progress bar */}
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>

      {/* Corner accent */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
    </div>
  );
}
