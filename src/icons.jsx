import { C } from "./theme.js";

/* ================= ICONS (line figures) ================= */
const P = { fill: "none", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" };
export const Ico = {
  hinge: (c) => (<g stroke={c} {...P}><circle cx="62" cy="22" r="8"/><path d="M60 30 L40 48 L38 78 M40 48 L58 62 M58 62 L58 84 M58 62 L44 84"/><rect x="52" y="80" width="14" height="8" rx="2"/></g>),
  squat: (c) => (<g stroke={c} {...P}><circle cx="50" cy="18" r="8"/><path d="M50 26 L50 46 M50 46 L34 60 L36 84 M50 46 L66 60 L64 84 M36 26 L64 26"/></g>),
  lunge: (c) => (<g stroke={c} {...P}><circle cx="48" cy="18" r="8"/><path d="M48 26 L48 50 M48 50 L30 62 L30 84 M48 50 L66 66 L78 66 M34 40 L62 40"/></g>),
  legpress: (c) => (<g stroke={c} {...P}><circle cx="30" cy="48" r="8"/><path d="M34 54 L52 62 M52 62 L70 46 M70 46 L84 34 M84 30 L84 52"/></g>),
  legcurl: (c) => (<g stroke={c} {...P}><circle cx="24" cy="34" r="8"/><path d="M30 40 L56 44 L78 44 M78 44 L72 66 M20 56 L84 56"/></g>),
  legext: (c) => (<g stroke={c} {...P}><circle cx="30" cy="26" r="8"/><path d="M32 34 L36 58 M36 58 L62 58 M62 58 L84 44 M28 70 L70 70"/></g>),
  abduction: (c) => (<g stroke={c} {...P}><circle cx="50" cy="18" r="8"/><path d="M50 26 L50 48 M50 48 L28 78 M50 48 L72 78 M30 64 L44 58 M70 64 L56 58"/></g>),
  row: (c) => (<g stroke={c} {...P}><circle cx="34" cy="24" r="8"/><path d="M36 32 L48 52 L48 74 M48 52 L70 48 M70 48 L82 48 M48 74 L34 86 M48 74 L60 86"/></g>),
  pulldown: (c) => (<g stroke={c} {...P}><circle cx="50" cy="34" r="8"/><path d="M50 42 L50 66 M50 66 L38 86 M50 66 L62 86 M50 46 L30 22 M50 46 L70 22 M22 16 L78 16"/></g>),
  hang: (c) => (<g stroke={c} {...P}><path d="M18 12 L86 12"/><circle cx="52" cy="34" r="8"/><path d="M52 42 L52 68 M52 46 L36 16 M52 46 L68 16 M52 68 L44 86 M52 68 L60 86"/></g>),
  press: (c) => (<g stroke={c} {...P}><circle cx="36" cy="58" r="8"/><path d="M44 58 L74 58 M56 58 L56 34 M50 30 L62 30 M20 72 L84 72"/></g>),
  fly: (c) => (<g stroke={c} {...P}><circle cx="52" cy="56" r="8"/><path d="M52 48 L52 40 M52 44 L26 26 M52 44 L78 26 M22 22 L30 30 M82 22 L74 30 M20 70 L84 70"/></g>),
  pullover: (c) => (<g stroke={c} {...P}><circle cx="34" cy="48" r="8"/><path d="M42 52 L72 52 M52 52 L52 26 L68 18 M20 66 L84 66"/></g>),
  shpress: (c) => (<g stroke={c} {...P}><circle cx="50" cy="40" r="8"/><path d="M50 48 L50 74 M50 52 L32 44 L32 22 M50 52 L68 44 L68 22 M26 20 L38 20 M62 20 L74 20"/></g>),
  latraise: (c) => (<g stroke={c} {...P}><circle cx="50" cy="20" r="8"/><path d="M50 28 L50 62 M50 38 L24 44 M50 38 L76 44 M50 62 L40 86 M50 62 L60 86 M20 40 L28 50 M80 40 L72 50"/></g>),
  facepull: (c) => (<g stroke={c} {...P}><circle cx="40" cy="30" r="8"/><path d="M40 38 L40 70 M40 44 L62 36 M40 44 L62 52 M66 30 L66 58 M74 20 L74 44"/></g>),
  curl: (c) => (<g stroke={c} {...P}><circle cx="46" cy="20" r="8"/><path d="M46 28 L46 66 M46 40 L62 48 M62 48 L60 30 M54 26 L68 30 M46 66 L38 88 M46 66 L54 88"/></g>),
  pushdown: (c) => (<g stroke={c} {...P}><circle cx="46" cy="22" r="8"/><path d="M46 30 L46 66 M46 42 L64 48 M64 48 L64 66 M56 68 L72 68 M64 14 L64 44 M46 66 L38 88 M46 66 L54 88"/></g>),
  overhead: (c) => (<g stroke={c} {...P}><circle cx="50" cy="34" r="8"/><path d="M50 42 L50 74 M50 46 L64 32 M64 32 L58 16 M52 12 L66 18 M50 74 L42 90 M50 74 L58 90"/></g>),
  pushup: (c) => (<g stroke={c} {...P}><circle cx="26" cy="40" r="8"/><path d="M32 46 L60 52 L84 58 M40 50 L40 64 M20 68 L86 68"/></g>),
  plank: (c) => (<g stroke={c} {...P}><circle cx="24" cy="42" r="8"/><path d="M30 48 L58 50 L84 54 M34 50 L34 64 M62 52 L66 66 M20 70 L88 70"/></g>),
  crunch: (c) => (<g stroke={c} {...P}><circle cx="34" cy="36" r="8"/><path d="M38 42 L52 56 M52 56 L70 48 M70 48 L82 60 M22 68 L86 68"/></g>),
  deadbug: (c) => (<g stroke={c} {...P}><circle cx="42" cy="46" r="8"/><path d="M48 50 L70 54 M52 50 L58 28 M64 52 L82 38 M70 54 L78 70 M20 74 L88 74"/></g>),
  twist: (c) => (<g stroke={c} {...P}><circle cx="50" cy="22" r="8"/><path d="M50 30 L46 56 M46 56 L30 70 M46 56 L62 70 M50 36 L72 44 M66 38 L78 50"/></g>),
  legraise: (c) => (<g stroke={c} {...P}><circle cx="50" cy="16" r="8"/><path d="M50 24 L50 58 M50 34 L36 44 M50 34 L64 44 M50 58 L50 84 M50 58 L70 66"/></g>),
  kickback: (c) => (<g stroke={c} {...P}><circle cx="34" cy="24" r="8"/><path d="M36 32 L44 54 M44 54 L44 84 M44 54 L72 44 M72 44 L84 50"/></g>),
  pullthrough: (c) => (<g stroke={c} {...P}><circle cx="60" cy="20" r="8"/><path d="M58 28 L42 46 L40 78 M42 46 L64 56 M64 56 L84 62 M40 78 L52 84"/></g>),
  calf: (c) => (<g stroke={c} {...P}><circle cx="50" cy="16" r="8"/><path d="M50 24 L50 60 M50 60 L44 78 M50 60 L56 78 M40 84 L44 78 M60 84 L56 78 M36 88 L64 88"/></g>),
  backext: (c) => (<g stroke={c} {...P}><circle cx="76" cy="30" r="8"/><path d="M70 34 L48 44 M48 44 L26 48 M48 44 L48 66 M22 60 L52 60"/></g>),
  cardio: (c) => (<g stroke={c} {...P}><circle cx="46" cy="18" r="8"/><path d="M46 26 L50 48 M50 48 L34 60 M50 48 L68 64 M46 32 L64 26 M46 32 L30 40"/></g>),
};
export const Figure = ({ icon, color }) => (
  <svg viewBox="0 0 104 100" style={{ width: 56, height: 54, flexShrink: 0 }} aria-hidden="true">
    <rect x="2" y="2" width="100" height="96" rx="14" fill={color + "14"} stroke={color + "33"} strokeWidth="1.5" />
    {(Ico[icon] || Ico.press)(color)}
  </svg>
);

