// src/components/LensScrollReveal/LensScrollReveal.jsx
// ─────────────────────────────────────────────────────────────
// THE CENTERPIECE: Sticky scroll-driven storytelling section
// ─────────────────────────────────────────────────────────────
import { useRef, useEffect, useState } from 'react';
import styles from './LensScrollReveal.module.css';
import { LENS_STORY_STEPS } from '../../data/index.js';

// The 3D contact lens SVG (large, detailed)
function Lens3D({ rotation, scale, glowIntensity, tilt }) {
  const s = scale ?? 1;
  const r = rotation ?? 0;
  const g = glowIntensity ?? 0.5;
  const tx = tilt?.x ?? 0;
  const ty = tilt?.y ?? 0;

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        height: '100%',
        transform: `rotate(${r}deg) scale(${s}) perspective(800px) rotateX(${tx}deg) rotateY(${ty}deg)`,
        transition: 'transform 0.1s linear',
        filter: `drop-shadow(0 0 ${40 + g * 60}px rgba(26,86,255,${0.1 + g * 0.25}))
                 drop-shadow(0 0 ${80 + g * 80}px rgba(0,194,255,${0.04 + g * 0.12}))`,
      }}
    >
      <defs>
        <radialGradient id="lg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1A56FF" stopOpacity={0.08 + g * 0.12} />
          <stop offset="60%"  stopColor="#00C2FF" stopOpacity={0.02 + g * 0.04} />
          <stop offset="100%" stopColor="#1A56FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lg2" cx="38%" cy="33%" r="62%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%"  stopColor="#E8F0FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C8D9FF" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="pupilGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1A56FF" stopOpacity="0.6" />
          <stop offset="70%"  stopColor="#0038E0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#001EA8" stopOpacity="0.2" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Aura glow layers */}
      <circle cx="250" cy="250" r="240" fill="url(#lg1)" />
      <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(26,86,255,0.06)" strokeWidth="1" />

      {/* Outer lens ring */}
      <circle cx="250" cy="250" r="185"
        fill="none"
        stroke={`rgba(26,86,255,${0.12 + g * 0.2})`}
        strokeWidth="1.5" />

      {/* Lens body – frosted glass look */}
      <circle cx="250" cy="250" r="184" fill="rgba(245,248,255,0.6)" />
      <circle cx="250" cy="250" r="184" fill="url(#lg2)" opacity="0.4" />

      {/* Iris outer */}
      <circle cx="250" cy="250" r="140" fill="none" stroke={`rgba(0,194,255,${0.15 + g * 0.2})`} strokeWidth="1" />
      <circle cx="250" cy="250" r="140" fill={`rgba(26,86,255,${0.03 + g * 0.05})`} />

      {/* Iris texture lines */}
      <g opacity={0.12 + g * 0.1} stroke="rgba(26,86,255,0.8)" strokeWidth="0.7" fill="none">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          return (
            <line key={i}
              x1={250 + cos * 68}  y1={250 + sin * 68}
              x2={250 + cos * 136} y2={250 + sin * 136}
            />
          );
        })}
      </g>

      {/* Iris medium ring */}
      <circle cx="250" cy="250" r="90"
        fill="none"
        stroke={`rgba(26,86,255,${0.18 + g * 0.25})`}
        strokeWidth="1" />

      {/* Pupil gradient circle */}
      <circle cx="250" cy="250" r="68" fill="url(#pupilGrad)" />

      {/* Deep pupil */}
      <circle cx="250" cy="250" r="45" fill={`rgba(0,30,168,${0.6 + g * 0.3})`} />
      <circle cx="250" cy="250" r="28" fill={`rgba(0,20,100,${0.8 + g * 0.2})`} />

      {/* Center catchlight */}
      <circle cx="250" cy="250" r="7"
        fill="#1A56FF"
        filter="url(#softGlow)"
        opacity={0.6 + g * 0.4}
      />

      {/* Primary specular highlight */}
      <path
        d="M 198 214 Q 222 198 244 210"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#innerGlow)"
      />
      {/* Secondary specular */}
      <path
        d="M 210 228 Q 220 222 232 226"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Tertiary micro */}
      <ellipse cx="192" cy="198" rx="5" ry="2.5"
        fill="rgba(255,255,255,0.35)"
        transform="rotate(-25, 192, 198)"
      />

      {/* Dashed orbit */}
      <circle cx="250" cy="250" r="185"
        fill="none"
        stroke={`rgba(0,194,255,${0.15 + g * 0.2})`}
        strokeWidth="0.8"
        strokeDasharray="6 16"
      />

      {/* Orbit data points */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle key={deg}
            cx={250 + Math.cos(rad) * 185}
            cy={250 + Math.sin(rad) * 185}
            r="3.5"
            fill={`rgba(26,86,255,${0.3 + g * 0.4})`}
            filter="url(#softGlow)"
          />
        );
      })}

      {/* Cyan limbal ring */}
      <circle cx="250" cy="250" r="140"
        fill="none"
        stroke={`rgba(0,194,255,${0.3 + g * 0.35})`}
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}

export default function LensScrollReveal() {
  const sectionRef = useRef(null);
  const stickyRef  = useRef(null);
  const [scrollState, setScrollState] = useState({
    progress:       0,
    stepIndex:      0,
    rotation:       0,
    scale:          0.85,
    glowIntensity:  0,
    tilt:           { x: 0, y: 0 },
    bgOpacity:      0,
  });

  const steps = LENS_STORY_STEPS;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect   = section.getBoundingClientRect();
      const total  = section.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));

      const stepIndex = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length)
      );
      const stepProgress = (progress * steps.length) % 1;

      // Lens transforms driven by scroll
      const rotation      = progress * 360;                           // full rotation over scroll
      const scale         = 0.75 + progress * 0.35;                   // 0.75 → 1.1
      const glowIntensity = Math.sin(progress * Math.PI);             // bell curve glow
      const tiltX         = Math.sin(progress * Math.PI * 2) * 8;    // subtle 3-D tilt
      const tiltY         = Math.cos(progress * Math.PI * 2) * 5;
      const bgOpacity     = Math.min(1, progress * 3);

      setScrollState({ progress, stepIndex, stepProgress, rotation, scale, glowIntensity, tilt: { x: tiltX, y: tiltY }, bgOpacity });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [steps.length]);

  const { stepIndex, stepProgress, rotation, scale, glowIntensity, tilt, bgOpacity } = scrollState;
  const currentStep = steps[stepIndex] ?? steps[0];
  const nextStep    = steps[Math.min(steps.length - 1, stepIndex + 1)];

  // Interpolated blue intensity for background
  const bgBlue = Math.round(bgOpacity * 12);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{
        background: `rgb(${245 - bgBlue}, ${248 - bgBlue}, ${255})`,
      }}
    >
      {/* Sticky container – lens + copy overlay */}
      <div ref={stickyRef} className={styles.sticky}>

        {/* Background large text (behind lens) */}
        <div
          className={styles.bgText}
          style={{ opacity: Math.min(0.06, bgOpacity * 0.08) }}
        >
          VISION
        </div>

        {/* Ripple rings behind lens */}
        <div className={styles.ripples}>
          {[1,2,3].map((i) => (
            <div
              key={i}
              className={styles.rippleRing}
              style={{
                width:   `${300 + i * 120}px`,
                height:  `${300 + i * 120}px`,
                opacity: (glowIntensity * 0.3) / i,
                transitionDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* The 3D Lens – centered and sticky */}
        <div className={styles.lensContainer}>
          <Lens3D
            rotation={rotation}
            scale={scale}
            glowIntensity={glowIntensity}
            tilt={tilt}
          />
        </div>

        {/* Typography overlay – exits upward as step changes */}
        <div className={styles.copyArea}>
          {/* Step counter */}
          <div className={styles.stepCounter}>
            <span className={styles.stepCurrent}>{String(stepIndex + 1).padStart(2, '0')}</span>
            <span className={styles.stepSep}>/</span>
            <span className={styles.stepTotal}>{String(steps.length).padStart(2, '0')}</span>
          </div>

          {/* Heading with exit-up / enter-up transition */}
          <div
            className={styles.copyInner}
            key={stepIndex}
            style={{ animation: `${styles.stepEnter ?? 'stepEnterKf'} 0.7s cubic-bezier(0.22,1,0.36,1) both` }}
          >
            <h2 className={styles.heading}>
              {currentStep.heading.split('\n').map((line, i) => (
                <span key={i} className={styles.headLine}>
                  <span
                    className={
                      currentStep.accentIdx === i
                        ? styles.headAccent
                        : styles.headNormal
                    }
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <p className={styles.sub}>{currentStep.sub}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ transform: `scaleX(${scrollState.progress})` }}
          />
        </div>

        {/* Step dots */}
        <div className={styles.stepDots}>
          {steps.map((_, i) => (
            <div
              key={i}
              className={`${styles.stepDot} ${i === stepIndex ? styles.stepDotActive : ''}`}
            />
          ))}
        </div>

        {/* Metrics strip at bottom */}
        <div className={styles.metrics}>
          {['HydraCore™', 'UV400', '98% Moisture', '16h Wear'].map((m, i) => (
            <div
              key={i}
              className={styles.metric}
              style={{ opacity: Math.max(0, glowIntensity * 2 - 0.2) }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
