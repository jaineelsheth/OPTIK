# ŌPTIC v2 — Cinematic Dark Luxury

> Deep charcoal · white text · GSAP ScrollTrigger · Lenis smooth scroll
> Fixed lens · scroll-speed rotation · mouse-follow 3-D tilt

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # or: npm start
```
Open **http://localhost:5173**

---

## 📁 Structure

```
src/
├── App.jsx                       ← Root: Lenis init, GSAP, global IntersectionObserver
├── main.jsx
├── styles/globals.css            ← Dark vars (#050505), all keyframes, reveal utilities
│
├── data/
│   ├── index.js                  ← Features, stats, marquee, scroll steps
│   └── products.jsx              ← 5 products with dark SVG illustrations
│
└── components/
    ├── Cursor/                   ← Blue dot + lagging ring, mix-blend: screen
    ├── Loader/                   ← Counter 00→100 on dark bg with ripple rings
    ├── Nav/                      ← Glassmorphism on scroll (dark)
    │
    ├── CinematicHero/ ★★★        ← THE ENGINE
    │   ├── CinematicHero.jsx     ←   • Fixed lens (stays center 500vh)
    │   └── CinematicHero.module.css  • GSAP: text scales 1→1.55 + fades (Z-axis)
    │                                 • RAF loop: scroll velocity → rotation speed
    │                                 • Mouse-follow 3-D tilt (rotateX/Y)
    │                                 • 5 panels of sliding copy behind the lens
    │
    ├── Marquee/                  ← Dual-row infinite, dark bg
    ├── Features/                 ← 2×2 dark card grid
    ├── Collection/               ← Products with dark SVG illustrations
    ├── ParallaxText/             ← Outlined big text, bidirectional drift
    ├── TechStats/                ← Dark ring animation + counting stats
    ├── Story/                    ← Sticky text + dark image collage
    ├── Signup/                   ← Dark CTA with ripples
    └── Footer/                   ← Dark footer + "SEE BEYOND" ghost type
```

---

## 🎨 Dark Palette

| Token       | Value       |
|-------------|-------------|
| `--bg`      | `#050505`   |
| `--bg-2`    | `#080810`   |
| `--bg-3`    | `#0d0d18`   |
| `--bg-card` | `#0a0a12`   |
| `--fg`      | `#f0ece4`   |
| `--fg-dim`  | `rgba(240,236,228,.38)` |
| `--blue`    | `#1a56ff`   |
| `--cyan`    | `#00c2ff`   |

---

## ⚙️ How the Cinematic Effects Work

### 1. Fixed Lens
```css
.fixedLensWrap { position: fixed; top: 50%; left: 50%; … }
```
The lens stays pinned to the viewport center for all 500vh.
The scroll container beneath it has 5 sticky panels that slide text in/out.

### 2. GSAP Z-axis Zoom (hero text)
```js
gsap.to(heroTextRef.current, {
  scale: 1.55, opacity: 0, y: '-8vh',
  scrollTrigger: { trigger: section, start: 'top top', end: '30% top', scrub: 1.2 }
});
```

### 3. Scroll-Speed Rotation
```js
// In RAF loop:
velocityRef.current += delta * 0.25;   // delta = scrollY change
velocityRef.current *= 0.88;           // damping
rotationRef.current += velocityRef.current + 0.08; // + idle drift
```

### 4. Mouse-Follow 3-D Tilt
```js
tiltRef.current.x += (mouse.y * -10 - tiltRef.current.x) * 0.06;
tiltRef.current.y += (mouse.x *  10 - tiltRef.current.y) * 0.06;
svg.style.transform = `rotate(…) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
```

### 5. Lenis Smooth Scroll
```js
const lenis = new Lenis({ duration: 1.4, easing: t => … });
```
