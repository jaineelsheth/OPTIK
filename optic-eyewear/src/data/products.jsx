// src/data/products.jsx — Bausch & Lomb India Catalog

const LK = 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/1080x1080/9df78eab33525d08d6e5fb8d27136e95/';
const BL = 'https://www.bauschandlomb.in/assets/cms/uploads/';

export const PRODUCTS = [
  // ═══════════════ SPHERICAL ═══════════════
  {
    id: 'bl-sph-001', name: 'SofLens 59 (6-Pack)', type: 'Contact Lenses', price: '\u20B91,499',
    category: 'Spherical', tag: 'Bestseller', isContactLens: true,
    desc: "Monthly disposable lenses made with hilafilcon B material. 59% water content keeps your eyes hydrated while the protein-resistant surface stays clean for the full 30 days. UniFit design means these practically fit everyone.",
    review: "Been using these for 2 years straight. Never had any irritation, even on long days. My optician recommended them and I haven't looked back. \u2014 Rahul M.",
    image: LK + '/b/i/soflens-59-6-lens-per-box-bausch-lomb_sl59.jpg',
    images: [
      LK + '/b/i/soflens-59-6-lens-per-box-bausch-lomb_sl59.jpg',
      LK + '/b/i/soflens-59-6-lens-per-box-bausch-lomb_sl59_side_2.jpg',
      LK + '/b/i/soflens-59-6-lens-per-box-bausch-lomb_sl_59_back.jpg'
    ]
  },
  {
    id: 'bl-sph-002', name: 'B+L Ultra (6-Pack)', type: 'Contact Lenses', price: '\u20B94,031',
    category: 'Spherical', tag: 'Premium', isContactLens: true,
    desc: "Built for people glued to their screens. MoistureSeal technology locks in hydration for a full 16 hours. If you work in IT, design, or just doom-scroll a lot, these were made for you.",
    review: "I'm a software developer and I wear these 14 hours a day. Zero dryness, zero fatigue. Worth the premium price. \u2014 Arjun K.",
    image: BL + 'products/ultra_sup_tm__sup_823d7c8b9f4476c26ba5386f0b912551.png',
    images: [
      BL + 'products/ultra_sup_tm__sup_823d7c8b9f4476c26ba5386f0b912551.png',
      BL + 'lenses/ultra_sup_tm__sup__sphericald3b59e6c5f220a7acd7f6c7eb01a630c.png',
      BL + 'lenses/ultra_sup_tm__sup__sphericalc8c46717a8beaee317c6a10090e43738.png'
    ]
  },
  {
    id: 'bl-sph-003', name: 'Biotrue ONEday (30-Pack)', type: 'Contact Lenses', price: '\u20B92,765',
    category: 'Spherical', tag: 'Popular', isContactLens: true,
    desc: "HyperGel material that matches your eye's natural moisture level at 78% water content. Maintains nearly 100% of its moisture for up to 16 hours. Fresh pair every morning, no cleaning needed.",
    review: "Switched from monthlies to these and never going back. The convenience is unmatched. Crystal clear vision all day. \u2014 Sneha P.",
    image: BL + 'products/biotrue_sup____sup__oneday45b68610c47527e7b51cea66962093c9.png',
    images: [
      BL + 'products/biotrue_sup____sup__oneday45b68610c47527e7b51cea66962093c9.png',
      BL + 'lenses/biotrue__oneday5749ad7fa965b346ffc9c6f9c369fce9.png',
      BL + 'lenses/biotrue__oneday8d8399ed3ba40bb35e1a98e9f6daf113.png'
    ]
  },
  {
    id: 'bl-sph-004', name: 'iConnect (6-Pack)', type: 'Contact Lenses', price: '\u20B9608',
    category: 'Spherical', tag: 'Value', isContactLens: true,
    desc: "Designed for comfort that lasts all day. Aspheric design gives clear, sharp vision while keeping things affordable. Perfect starting point for students or new lens wearers.",
    review: "Best budget lens out there. Clear vision, no redness, fits comfortably for the full month. \u2014 Karan T.",
    image: LK + '/b/i/bausch---lomb-iconnect-oxyrich-contact-lenses--3-lens--box--powered_207621-1.jpg',
    images: [
      LK + '/b/i/bausch---lomb-iconnect-oxyrich-contact-lenses--3-lens--box--powered_207621-1.jpg',
      LK + '/b/i/bausch---lomb-iconnect-oxyrich-contact-lenses--3-lens--box--powered_207621-4.jpg',
      LK + '/b/i/bausch---lomb-iconnect-oxyrich-contact-lenses--3-lens--box--powered_207621-3.jpg'
    ]
  },

  // ═══════════════ COLOUR LENSES (LACELLE) ═══════════════
  {
    id: 'bl-col-001', name: 'Lacelle Premium', type: 'Contact Lenses', price: '\u20B9562',
    category: 'Colour Lenses', tag: 'Elegant', isContactLens: true,
    colors: ['Violet', 'Green', 'Blue', 'Brown', 'Grey'],
    desc: "Elegant and subtle. 3-tone monthly disposable lenses blend seamlessly with your natural eye colour using a unique lace-like pattern. Perfect for festive occasions.",
    review: "I wore the Violet shade to my cousin's wedding and got SO many compliments. They look incredibly natural. \u2014 Priya S.",
    image: LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_1_21_02_2023.jpg',
    images: [
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_1_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_2_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_3_21_02_2023.jpg'
    ]
  },
  {
    id: 'bl-col-002', name: 'Lacelle Circle', type: 'Contact Lenses', price: '\u20B9515',
    category: 'Colour Lenses', tag: 'Glamorous', isContactLens: true,
    colors: ['Black', 'Brown', 'Blue'],
    desc: "Glamorous and chic. These monthly lenses have a dark defining outline that makes your eyes look bigger and more defined. Adds a stylish edge without going full colour.",
    review: "The black shade makes my eyes look so much bigger. Everyone asks me what I did differently. \u2014 Nisha R.",
    image: LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_1_21_02_2023.jpg',
    images: [
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_1_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_2_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_3_21_02_2023.jpg'
    ]
  },
  {
    id: 'bl-col-003', name: 'Lacelle Classic', type: 'Contact Lenses', price: '\u20B9468',
    category: 'Colour Lenses', tag: 'Vibrant', isContactLens: true,
    colors: ['Green', 'Blue', 'Grey', 'Brown'],
    desc: "Vibrant and bright. Bold shades that make a statement. Great for parties, photo shoots, and nights out when you want a real pop of colour.",
    review: "The Green shade is absolutely stunning \u2014 vibrant but not fake-looking. Comfortable for 8+ hours. \u2014 Meera D.",
    image: LK + '/b/i/bausch---lomb-lacelle-natural-look-blue-color-contact-lens--2-lens--box--plano_209133_1_21_02_2023.jpg',
    images: [
      LK + '/b/i/bausch---lomb-lacelle-natural-look-blue-color-contact-lens--2-lens--box--plano_209133_1_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_2_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_3_21_02_2023.jpg'
    ]
  },
  {
    id: 'bl-col-004', name: 'Lacelle Natural Look', type: 'Contact Lenses', price: '\u20B9796',
    category: 'Colour Lenses', tag: 'Subtle', isContactLens: true,
    colors: ['Blue', 'Green', 'Brown', 'Grey'],
    desc: "Graceful and subtle. These lenses blend so perfectly with your natural eye colour that people cannot tell you are wearing them. Ideal for everyday wear.",
    review: "Nobody can tell I'm wearing these \u2014 they just think my eyes look extra beautiful. Exactly what I wanted. \u2014 Anjali M.",
    image: LK + '/b/i/bausch---lomb-lacelle-natural-look-blue-color-contact-lens--2-lens--box--plano_209133_1_21_02_2023.jpg',
    images: [
      LK + '/b/i/bausch---lomb-lacelle-natural-look-blue-color-contact-lens--2-lens--box--plano_209133_1_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_1_21_02_2023.jpg',
      LK + '/b/i/bausch---lomb-lacelle-pemium-brown-color-contact-lens--1-lens--box_209143_2_21_02_2023.jpg'
    ]
  },
  {
    id: 'bl-col-005', name: 'Lacelle Diamond Daily', type: 'Contact Lenses', price: '\u20B9928',
    category: 'Colour Lenses', tag: 'Trending', isContactLens: true,
    colors: ['Freedom Honey', 'Luminous Gray', 'Merry Mocha', 'Spotlight Brown'],
    desc: "Daily disposable colour lenses with a diamond-cut pattern that sparkles. Fresh pair every day, zero maintenance. Available in 4 gorgeous jewel-inspired shades.",
    review: "The Freedom Honey shade is GORGEOUS. Love that they are dailies \u2014 so hygienic and convenient! \u2014 Divya L.",
    image: LK + '/b/i/bausch---lomb-lacelle-diamond-d-pink-daily-color-contact-lens_csvfile-1714111830125-img_2828.jpg',
    images: [
      LK + '/b/i/bausch---lomb-lacelle-diamond-d-pink-daily-color-contact-lens_csvfile-1714111830125-img_2828.jpg',
      LK + '/b/i/bausch---lomb-lacelle-diamond-d-pink-daily-color-contact-lens_csvfile-1714111842661-img_2830.jpg',
      LK + '/b/i/bausch---lomb-lacelle-diamond-d-pink-daily-color-contact-lens_csvfile-1714111855956-img_2832.jpg'
    ]
  },

  // ═══════════════ TORIC ═══════════════
  {
    id: 'bl-tor-001', name: 'Purevision Toric (6-Pack)', type: 'Contact Lenses', price: '\u20B92,995',
    category: 'Toric', tag: 'Stable', isContactLens: true,
    desc: "Auto-Align Design keeps the lens locked in place. Made from balafilcon A silicone hydrogel with high oxygen permeability. If you have astigmatism and need stability, this is your lens.",
    review: "First lenses that don't rotate on me. Clear vision from morning to night. A game-changer for astigmatism. \u2014 Vishal G.",
    image: LK + '/b/i/bausch---lomb-purevision-2-astigmatism--6-lens-per-box_purevisiontoric-new_purevisiontoric-new_purevisiontoric-new_purevisiontoric-new_purevisiontoric-new_j_8376_1_1_1_1_4_2_1_2_.jpg.png',
    images: [
      LK + '/b/i/bausch---lomb-purevision-2-astigmatism--6-lens-per-box_purevisiontoric-new_purevisiontoric-new_purevisiontoric-new_purevisiontoric-new_purevisiontoric-new_j_8376_1_1_1_1_4_2_1_2_.jpg.png',
      LK + '/b/i/bausch---lomb-purevision-2-astigmatism--6-lens-per-box_purevisiontoric-new_purevisiontoric-new_j_8375_1_2_1_1.jpg.png',
      LK + '/j/_/j_8377.jpg'
    ]
  },
  {
    id: 'bl-tor-002', name: 'Biotrue ONEday Toric (30-pk)', type: 'Contact Lenses', price: '\u20B92,765',
    category: 'Toric', tag: 'Daily', isContactLens: true,
    desc: "Daily disposable toric with HyperGel tech. Peri-Ballast design keeps it stable for crisp vision. No cleaning, no solutions \u2014 just toss them at the end of the day.",
    review: "Finally a daily toric that stays in place. I swim and run and these handle everything. \u2014 Tanvi A.",
    image: BL + 'products/biotrue_sup____sup__oneday45b68610c47527e7b51cea66962093c9.png',
    images: [
      BL + 'products/biotrue_sup____sup__oneday45b68610c47527e7b51cea66962093c9.png',
      BL + 'lenses/biotrue__oneday5749ad7fa965b346ffc9c6f9c369fce9.png',
      BL + 'lenses/biotrue__oneday8d8399ed3ba40bb35e1a98e9f6daf113.png'
    ]
  },

  // ═══════════════ MULTIFOCAL ═══════════════
  {
    id: 'bl-mut-001', name: 'Ultra Multifocal (6-Pack)', type: 'Contact Lenses', price: '\u20B95,812',
    category: 'Multifocal', tag: 'Advanced', isContactLens: true,
    desc: "3-Zone Progressive Design transitions between near, intermediate, and distance vision. MoistureSeal keeps these hydrated for 16 hours. For anyone 40+ tired of reading glasses.",
    review: "I can read my phone, work on my laptop, AND drive \u2014 all with the same lens. Worth every rupee. \u2014 Rajesh N.",
    image: BL + 'products/ultra_sup_tm__sup_823d7c8b9f4476c26ba5386f0b912551.png',
    images: [
      BL + 'products/ultra_sup_tm__sup_823d7c8b9f4476c26ba5386f0b912551.png',
      BL + 'lenses/ultra_sup_tm__sup__sphericald3b59e6c5f220a7acd7f6c7eb01a630c.png',
      BL + 'lenses/ultra_sup_tm__sup__sphericalc8c46717a8beaee317c6a10090e43738.png'
    ]
  },

  // ═══════════════ LENSCARE ═══════════════
  {
    id: 'bl-lc-001', name: 'ReNu Fresh (500ml)', type: 'Lenscare', price: '\u20B9700',
    category: 'Lenscare', tag: 'Essentials', isContactLens: false,
    desc: "Multi-purpose solution that cleans, rinses, disinfects, and stores your soft contact lenses. Dual disinfection system fights bacteria while keeping comfort. Big 500ml bottle lasts 2-3 months.",
    review: "I've tried cheaper solutions and my eyes always get red. ReNu Fresh is the only one that keeps my lenses comfortable all day. \u2014 Sai K.",
    image: LK + '/b/i/renu-fresh-multipurpose-contact-lens-solution-500ml_csvfile-1695204944023-renu-fresh-multipurpose-solution-500ml_renu-fresh-multipurpose-solution-500ml_500ml__j_8850_1_1.jpg_(3).png',
    images: [
      LK + '/b/i/renu-fresh-multipurpose-contact-lens-solution-500ml_csvfile-1695204944023-renu-fresh-multipurpose-solution-500ml_renu-fresh-multipurpose-solution-500ml_500ml__j_8850_1_1.jpg_(3).png',
      LK + '/b/i/renu-fresh-multipurpose-contact-lens-solution-500ml_csvfile-1695204675194-renu-fresh-multipurpose-solution-500ml_renu-fresh-multipurpose-solution-500ml_l__j_8849_1_1_1_1.jpg).png',
      LK + '/r/e/renu-fresh-multipurpose-solution-500ml__j_8849_1_1_gf.jpg'
    ]
  },
  {
    id: 'bl-lc-002', name: 'Biotrue Solution (300ml)', type: 'Lenscare', price: '\u20B9660',
    category: 'Lenscare', tag: 'Premium', isContactLens: false,
    desc: "Bio-inspired formula that matches the pH of healthy tears. Keeps proteins in their natural state to prevent buildup. Even sensitive eyes feel pampered with this one.",
    review: "My eyes are super sensitive and this is the only solution that doesn't sting. Highly recommend for sensitive eyes. \u2014 Ananya R.",
    image: LK + '/b/i/biotrue300-solution_d_9954_1_1_gf.jpg',
    images: [
      LK + '/b/i/biotrue300-solution_d_9954_1_1_gf.jpg',
      LK + '/b/i/biotrue300-solution_d_9953_2_1_gf.jpg',
      LK + '/b/i/biotrue300-solution_d_9954_1_1_image_pla.jpg'
    ]
  }
];
