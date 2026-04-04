// src/components/CinematicHero/CinematicHero.jsx
// ─────────────────────────────────────────────────────────────
//  THE EYE ENGINE — drinksom.eu-inspired scrollytelling
//  • Fixed hyper-realistic eye stays centered for entire 500vh scroll
//  • Cinematic 15vw typography with Z-axis zoom-through
//  • Z-index depth layering: text behind AND in front of eye
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CinematicHero.module.css';
import eyeIrisSrc from '../../assets/eye_iris.png';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────── */
export default function CinematicHero() {
  const sectionRef = useRef(null);
  const eyeWrapRef = useRef(null);
  const heroTextRef = useRef(null);
  const tagRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Lenis ↔ GSAP integration ──
    if (window.__lenis) {
      window.__lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        window.__lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Wrap all GSAP animations in a context for perfect React cleanup
    const ctx = gsap.context(() => {
      // ── MASTER TIMELINE — 3-phase eye animation ──
        // scrub: 1.5 for smooth, weighted following
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });

        // Phase 1: 0–30% → Eye scales from 0.5 to 1.2
        tl.fromTo(eyeWrapRef.current,
          { scale: 0.5, opacity: 1 },
          { scale: 1.2, opacity: 1, ease: 'power2.out', duration: 0.3 },
          0
        );

        // Phase 2: 30–60% → Eye holds at 1.2 (no animation needed, it stays)

        // Phase 3: 60–100% → Eye scales to 4.0, fades out, adds depth-of-field blur
        tl.to(eyeWrapRef.current, {
          scale: 4.0,
          opacity: 0,
          ease: 'power2.out',
          duration: 0.4,
        }, 0.6);

        // ── HERO TEXT — Z-axis zoom-through ──
        gsap.to(heroTextRef.current, {
          scale: 2.0,
          opacity: 0,
          y: '-12vh',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '25% top',
            scrub: 0.6,
          },
        });

        // Tag line fades out faster
        gsap.to(tagRef.current, {
          opacity: 0,
          y: -40,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '15% top',
            scrub: 0.6,
          },
        });

        // CTA fades out
        gsap.to(ctaRef.current, {
          opacity: 0,
          y: 30,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '18% top',
            scrub: 0.6,
          },
        });

        // ── Panel text staggered reveals via ScrollTrigger ──
        const panels = section.querySelectorAll('[data-panel-text]');
        panels.forEach((panel) => {
          gsap.fromTo(panel,
            { opacity: 0, y: 80, scale: 0.92 },
            {
              opacity: 1, y: 0, scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            }
          );
        });

        // ── Staggered letter reveals for big headings ──
        const staggerHeadings = section.querySelectorAll('[data-stagger]');
        staggerHeadings.forEach(heading => {
          const letters = heading.querySelectorAll('span');
          gsap.fromTo(letters,
            { opacity: 0, y: 60, filter: 'blur(8px)' },
            {
              opacity: 1, y: 0, filter: 'blur(0px)',
              stagger: 0.03,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1.5,
              },
            }
          );
        });

        // Scroll progress line
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: self => {
            const el = document.getElementById('scroll-progress-line');
            if (el) el.style.transform = `scaleX(${self.progress})`;
          },
        });

        // Vanish eye when reaching Collection
        gsap.to(eyeWrapRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: '#collection',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1.5,
            onLeave: () => { if (eyeWrapRef.current) eyeWrapRef.current.style.display = 'none'; },
            onEnterBack: () => { if (eyeWrapRef.current) eyeWrapRef.current.style.display = 'block'; }
          }
        });
    }); // End gsap.context

    return () => {
      // Revert ALL animations and inline styles tied to this context!
      ctx.revert();
      
      // Clean up Lenis ticker listener
      if (window.__lenis) {
        gsap.ticker.remove(window.__lenis.raf);
      }
    };
  }, []);

  return (
    <>
      {/* ── VIEWPORT VIGNETTE ── */}
      <div className={styles.vignette} />

      {/* ── FIXED EYE (stays center for entire scroll) ── */}
      <div className={styles.eyeWrap} ref={eyeWrapRef}>
        <img
          src={eyeIrisSrc}
          alt=""
          className={styles.irisImg}
          draggable={false}
        />
      </div>

      {/* ── SCROLL CONTAINER ── 500vh */}
      <div ref={sectionRef} className={styles.heroSection}>

        {/* ── PANEL 1: Hero copy (IN FRONT of eye) ── */}
        <div className={styles.panel1}>
          <div className={styles.bgWord1} aria-hidden>VISION</div>

          {/* Hero text — GSAP will zoom + fade this */}
          <div ref={heroTextRef} className={styles.heroText}>
            <span className={styles.heroLine}>
              <span className={styles.heroLineInner} style={{ animationDelay: '0.2s' }}>See the</span>
            </span>
            <span className={styles.heroLine}>
              <span className={`${styles.heroLineInner} ${styles.heroAccent}`} style={{ animationDelay: '0.38s' }}>world</span>
            </span>
            <span className={styles.heroLine}>
              <span className={styles.heroLineInner} style={{ animationDelay: '0.56s' }}>clearly.</span>
            </span>
          </div>

          {/* Tag — fades separately */}
          <div ref={tagRef} className={styles.heroTag}>
            <span className={styles.tagPulse} />
            Vision. Redefined.
          </div>

          {/* CTA row */}
          <div ref={ctaRef} className={styles.heroCta}>
            <button className={styles.btnPrimary}>
              <span>Shop Collection</span>
              <ArrowIcon />
            </button>
            <button className={styles.btnGhost}>Our Technology</button>
          </div>

          {/* Scroll progress line */}
          <div className={styles.progressBar}>
            <div id="scroll-progress-line" className={styles.progressFill} />
          </div>

          {/* Scroll hint */}
          <div className={styles.scrollHint}>
            <span>Scroll</span>
            <div className={styles.scrollCaret} />
          </div>
        </div>

        {/* ── PANEL 2: Text slides left BEHIND eye ── */}
        <div className={styles.panel2}>
          <div className={styles.slideTextLeft} data-panel-text>
            <div className={styles.panelLabel}>
              <span />HydraCore™ Technology
            </div>
            <h2 className={styles.panelTitle} data-stagger>
              {splitToSpans('98% moisture')}
              <br />
              <em>{splitToSpans('retained.')}</em>
            </h2>
            <p className={styles.panelDesc}>
              Silicone hydrogel lenses that breathe,
              flex, and hydrate all day. Engineered for
              the modern eye.
            </p>
          </div>
        </div>

        {/* ── PANEL 3: Text slides right, BEHIND eye ── */}
        <div className={styles.panel3}>
          <div className={styles.slideTextRight} data-panel-text>
            <div className={styles.panelLabel}>
              <span />Mental Clarity
            </div>
            <h2 className={styles.panelTitle} data-stagger>
              {splitToSpans('FOCUS')}
              <br />
              <em>{splitToSpans('your vision.')}</em>
            </h2>
            <p className={styles.panelDesc}>
              HEV-block technology built into every
              lens. Screen all day — sleep all night.
            </p>
          </div>
        </div>

        {/* ── PANEL 4: Specs reveal IN FRONT of eye ── */}
        <div className={styles.panel4}>
          <div className={styles.specsGrid} data-panel-text>
            {[
              { num: 'UV', sup: '400', label: 'Full Spectrum Shield' },
              { num: '16', sup: 'h', label: 'Comfort Wear Rating' },
              { num: '0.001', sup: 'mm', label: 'Precision Tolerance' },
              { num: '7', sup: '×', label: 'Coating Layers' },
            ].map((s, i) => (
              <div key={i} className={styles.specItem}>
                <div className={styles.specNum}>{s.num}<sup>{s.sup}</sup></div>
                <div className={styles.specLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PANEL 5: Exit ── */}
        <div className={styles.panel5}>
          <div className={styles.exitText} data-panel-text>
            <h2 className={styles.exitTitle} data-stagger>
              {splitToSpans('The only lens')}
              <br />
              {splitToSpans("you'll ever")}
              <br />
              <em>{splitToSpans('need.')}</em>
            </h2>
            <button className={styles.btnPrimary} style={{ marginTop: '40px' }}>
              <span>Explore Collection</span>
              <ArrowIcon />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

/* ── Utility: split text into individually animatable <span>s ── */
function splitToSpans(text) {
  return text.split('').map((char, i) => (
    <span key={i} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}>
      {char}
    </span>
  ));
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2 7.5h11M9 3l4 4.5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
