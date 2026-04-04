// src/data/index.js
export const FEATURES = [
  { num:'01', tag:'Blue Light Filter', title:'Shield your eyes\nfrom digital strain',
    desc:'Our proprietary HEV-block technology filters 95% of harmful blue light emitted by screens. Work longer, sleep better, see sharper.',
    stat:'95%', statLabel:'Blue Light Blocked' },
  { num:'02', tag:'UV400 Protection', title:'Full spectrum\nUV400 defense',
    desc:'Complete protection against UVA and UVB radiation. Every lens tested and certified to block 100% of UV rays up to 400nm.',
    stat:'100%', statLabel:'UV Blocked' },
  { num:'03', tag:'HydraCore™', title:'16-hour comfort\nby design',
    desc:'HydraCore™ silicone hydrogel maintains 98% moisture retention throughout the day. Your eyes stay refreshed — never dry.',
    stat:'98%', statLabel:'Moisture Retention' },
  { num:'04', tag:'Optical Clarity', title:'Engineered for\ncrystal precision',
    desc:'Aspheric lens design eliminates peripheral distortion. From −12.00 to +8.00 diopters, precision ground for your exact prescription.',
    stat:'0.001mm', statLabel:'Precision Tolerance' },
];

export const STATS = [
  { num:'98',  sup:'%',   label:'Moisture Retention' },
  { num:'95',  sup:'%',   label:'Blue Light Filtered' },
  { num:'UV',  sup:'400', label:'Full Spectrum Block' },
  { num:'16',  sup:'h',   label:'Comfort Wear Rating' },
];

export const MARQUEE_ITEMS = [
  'Blue Light Protection','UV Shield Technology','Premium Contact Lenses',
  'All-Day Comfort','Anti-Reflective Coating','Crystal Clarity',
  'Optician Approved','Free Shipping','HydraCore™ Technology','30-Day Returns',
];

export const LENS_STORY_STEPS = [
  { heading:'See the\nworld\nclearly.', sub:'Contact lenses engineered for the modern eye.', accent:'clearly.', accentIdx:2 },
  { heading:'Worn by\nthousands\ndaily.',  sub:'Trusted by professionals, athletes, and creators.', accent:'thousands', accentIdx:1 },
  { heading:'Science\nmeets\nclarity.',   sub:'HydraCore™ silicone hydrogel. 98% moisture retention.', accent:'clarity.', accentIdx:2 },
  { heading:'Vision\nbeyond\nordinary.',  sub:'From −12.00 to +8.00. Precision for every eye.', accent:'ordinary.', accentIdx:2 },
];
