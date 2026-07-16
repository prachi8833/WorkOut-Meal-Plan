import { C } from "./theme.js";

/* ================= EXERCISE LIBRARY =================
   sets: descending weights (heavy → light). Max is the ceiling, never exceeded.
   w:null = weight not logged yet (tap to add). unit "bw" = bodyweight. */
export const EX = {
  deadhang:      { name: "Dead Hang", m: "back", icon: "hang", cue: "Full grip, shoulders active — building toward your pull-up", sets: [["bw","20–30s"],["bw","20–30s"],["bw","20–30s"]] },
  asstpullup:    { name: "Assisted Pull-Up", m: "back", icon: "hang", cue: "Chest to bar, slow negative on the way down", sets: [["asst","6–8"],["asst","6–8"],["asst","6–8"]] },
  latpulldown:   { name: "Lat Pulldown — Wide Grip", m: "back", icon: "pulldown", cue: "Pull elbows to ribs, chest tall — no swinging", sets: [[35,"7–8"],[35,"8"],[27.5,"10"],[20,"12"]] },
  cablerow:      { name: "Seated Cable Row", m: "back", icon: "row", cue: "Squeeze shoulder blades together at the back", sets: [[null,"10"],[null,"12"],[null,"12"]] },
  chestsuprow:   { name: "Chest-Supported DB Row", m: "back", icon: "row", cue: "Prone on incline bench — mid back does all the work", sets: [[null,"12"],[null,"12"],[null,"12"]] },
  straightarm:   { name: "Straight-Arm Cable Pulldown", m: "back", icon: "pulldown", cue: "Arms locked straight, sweep down with lats only", sets: [[null,"12"],[null,"12"],[null,"12"]] },
  singlearmpd:   { name: "Single-Arm Cable Pulldown", m: "back", icon: "pulldown", cue: "Kneel, pull to hip — feel the lat stretch at the top", sets: [[null,"12/side"],[null,"12/side"],[null,"12/side"]] },
  bentcablerow:  { name: "Bent-Over Cable Row", m: "back", icon: "row", cue: "Hinge, flat back — mid back + lower lats", sets: [[null,"12"],[null,"12"],[null,"12"]] },
  kneelpd:       { name: "Kneeling Cable Pulldown", m: "back", icon: "pulldown", cue: "Tall kneel, drive elbows down and back", sets: [[null,"12"],[null,"12"],[null,"12"]] },

  legpress:      { name: "Leg Press", m: "legs", icon: "legpress", cue: "Feet mid-platform, push through heels — don't lock knees", sets: [[90,"10"],[80,"12"],[70,"12"]] },
  rdl:           { name: "Romanian Deadlift — DBs", m: "legs", icon: "hinge", cue: "Hips back, soft knees — stretch the hamstrings, don't round", sets: [[30,"12"],[30,"12"],[25,"12"]] },
  rdlcable:      { name: "Romanian Deadlift — Cable", m: "legs", icon: "hinge", cue: "Constant tension version — same hinge, bar close to legs", sets: [[100,"12"],[90,"12"],[80,"12"]] },
  legcurl:       { name: "Seated Leg Curl", m: "legs", icon: "legcurl", cue: "Curl hard, pause 1s, control the return", sets: [[60,"8–10"],[50,"12"],[50,"12"]] },
  hipabd:        { name: "Hip Abduction", m: "legs", icon: "abduction", cue: "Lean slightly forward for upper glute — pause at the widest point", sets: [[110,"10"],[100,"12"],[90,"15"]] },
  sumosquat:     { name: "Cable Sumo Squat", m: "legs", icon: "squat", cue: "Wide stance, toes out — sit between your heels", sets: [[35,"10"],[30,"12"],[25,"12"]] },
  pullthrough:   { name: "Cable Rope Pull-Through", m: "legs", icon: "pullthrough", cue: "Hinge and snap hips forward — squeeze glutes hard at the top", sets: [[null,"12"],[null,"12"],[null,"15"]] },
  smithlunge:    { name: "Smith Machine Reverse Lunge", m: "legs", icon: "lunge", cue: "Step back long — front heel drives you up", sets: [[null,"10/side"],[null,"10/side"],[null,"12/side"]] },
  legextension:  { name: "Leg Extension", m: "legs", icon: "legext", cue: "Squeeze quads at the top, slow negative", sets: [[null,"12"],[null,"12"],[null,"15"]] },
  calfraise:     { name: "Standing Calf Raise", m: "legs", icon: "calf", cue: "Full stretch at the bottom, pause tall at the top", sets: [[null,"15"],[null,"15"],[null,"15"]] },
  glutekick:     { name: "Cable Glute Kickback", m: "legs", icon: "kickback", cue: "Kick back and slightly up — don't arch the lower back", sets: [[null,"12/side"],[null,"12/side"],[null,"12/side"]] },
  backext:       { name: "Back Extension", m: "lowerback", icon: "backext", cue: "Squeeze glutes + lower back to rise — no jerking", sets: [["bw","10"],["bw","10"],["bw","10"]] },

  dbchestpress:  { name: "DB Chest Press", m: "chest", icon: "press", cue: "Elbows ~45°, press up and slightly in", sets: [[15,"8–10"],[12,"12"],[12,"12"],[10,"12"]] },
  dbfly:         { name: "DB Chest Fly", m: "chest", icon: "fly", cue: "Wide hug motion — stretch, don't drop too deep", sets: [[7.5,"10"],[5,"12"],[5,"12"]] },
  cablefly:      { name: "Cable Chest Fly", m: "chest", icon: "fly", cue: "Constant tension — squeeze hands together at the front", sets: [[5,"12"],[5,"12"],[5,"12"]] },
  dbpullover:    { name: "DB Pullover", m: "chest", icon: "pullover", cue: "Big stretch overhead, pull back over the chest", sets: [[5,"12"],[5,"12"],[5,"12"]] },
  smithpushup:   { name: "Smith Machine Push-Ups", m: "chest", icon: "pushup", cue: "Bar at incline — body straight like a plank", sets: [["bw","15"],["bw","15"],["bw","15"]] },
  ropepushdown:  { name: "Tricep Rope Pushdown", m: "triceps", icon: "pushdown", cue: "Elbows pinned to sides, split the rope at the bottom", sets: [[10,"10"],[7.5,"12"],[5,"15"]] },
  overheadext:   { name: "Overhead Tricep Extension — DB", m: "triceps", icon: "overhead", cue: "Elbows close to head, stretch deep behind", sets: [[12.5,"10"],[10,"12"],[7.5,"12"]] },
  closegrip:     { name: "DB Close Grip Press", m: "triceps", icon: "press", cue: "DBs touching, press with triceps not chest", sets: [[2.5,"7"],[2.5,"7"],[2.5,"7"]] },

  dbshpress:     { name: "DB Shoulder Press", m: "shoulders", icon: "shpress", cue: "Press up, don't shrug — drop weight each set", sets: [[null,"10"],[null,"12"],[null,"12"]] },
  dblatraise:    { name: "DB Lateral Raise", m: "shoulders", icon: "latraise", cue: "Lead with elbows, stop at shoulder height", sets: [[null,"10"],[null,"12"],[null,"15"]] },
  cablelateral:  { name: "Cable Side Lateral Raise", m: "shoulders", icon: "latraise", cue: "Low cable across body — constant tension side delt", sets: [[null,"12/side"],[null,"12/side"],[null,"12/side"]] },
  cablereardelt: { name: "Cable Rear Delt Fly", m: "shoulders", icon: "fly", cue: "Sweep back and out — rear delt shapes the whole shoulder", sets: [[null,"12/side"],[null,"12/side"],[null,"12/side"]] },
  cablefront:    { name: "Cable Front Raise", m: "shoulders", icon: "latraise", cue: "Raise to eye level, control the way down", sets: [[null,"12"],[null,"12"],[null,"12"]] },
  facepulls:     { name: "Cable Face Pulls", m: "shoulders", icon: "facepull", cue: "Pull rope to forehead, elbows high — posture gold", sets: [[null,"15"],[null,"15"],[null,"15"]] },
  inclineprone:  { name: "Incline Prone Lateral Raise", m: "shoulders", icon: "latraise", cue: "Face down on incline bench — pure side + rear delt", sets: [[null,"12"],[null,"12"],[null,"12"]] },
  pronefront:    { name: "Incline Prone Front Raise", m: "shoulders", icon: "latraise", cue: "Face down, arms forward — front delt without momentum", sets: [[null,"12"],[null,"12"],[null,"12"]] },

  dbcurl:        { name: "DB Bicep Curl", m: "biceps", icon: "curl", cue: "Elbows still, squeeze at the top", sets: [[null,"10"],[null,"12"],[null,"12"]] },
  hammercurl:    { name: "Hammer Curl", m: "biceps", icon: "curl", cue: "Neutral grip — forearm + arm thickness", sets: [[null,"12"],[null,"12"],[null,"12"]] },
  conccurl:      { name: "Concentration Curl", m: "biceps", icon: "curl", cue: "Elbow braced on thigh — strict and slow", sets: [[null,"10/side"],[null,"10/side"],[null,"10/side"]] },

  dbtwist:       { name: "DB Russian Twist", m: "core", icon: "twist", cue: "Lean back 45°, rotate the DB side to side", sets: [[10,"20 total"],[10,"20 total"],[10,"20 total"]] },
  dbcrunch:      { name: "DB Weighted Crunch", m: "core", icon: "crunch", cue: "DB on chest, curl ribs to hips", sets: [[10,"15"],[10,"15"],[10,"15"]] },
  deadbug:       { name: "Dead Bug", m: "core", icon: "deadbug", cue: "Lower back glued to floor — opposite arm + leg", sets: [["bw","10/side"],["bw","10/side"],["bw","10/side"]] },
  legsinout:     { name: "Legs In & Out", m: "core", icon: "legraise", cue: "Seated, hands behind — tuck knees in, extend out", sets: [["bw","15"],["bw","15"],["bw","15"]] },
  dblegraise:    { name: "Standing DB Leg Raise", m: "core", icon: "legraise", cue: "DB between feet or knee drive holding DBs — slow", sets: [[5,"12/side"],[5,"12/side"],[5,"12/side"]] },
  plank:         { name: "Plank Hold", m: "core", icon: "plank", cue: "Squeeze everything — glutes, core, legs", sets: [["bw","30–45s"],["bw","30–45s"],["bw","30–45s"]] },
  sidebend:      { name: "DB Side Bend", m: "core", icon: "twist", cue: "One DB, slide down the side — obliques control it", sets: [[10,"12/side"],[10,"12/side"],[10,"12/side"]] },
  crunchmachine: { name: "Crunch Machine", m: "core", icon: "crunch", cue: "Round the spine down — it's a crunch, not a hip hinge", sets: [[null,"15"],[null,"15"],[null,"15"]] },
};

/* ================= SESSIONS ================= */
export const SESSIONS = [
  { id: "bbc", name: "Back · Biceps · Core", tag: "Pull-Up Foundation", gym: "Club 16", accent: C.back,
    warmup: "15 min elliptical + dynamic stretch",
    main: ["deadhang","asstpullup","latpulldown","cablerow","chestsuprow","dbcurl","hammercurl","dbtwist","plank"],
    pool: ["straightarm","singlearmpd","bentcablerow","kneelpd","conccurl","dbcrunch","deadbug"] },
  { id: "lgh", name: "Legs · Glutes", tag: "Heavy Day", gym: "Club 16", accent: C.legs,
    warmup: "15 min elliptical (cycle if legs sore) + dynamic stretch",
    main: ["legpress","rdl","legcurl","hipabd","sumosquat","pullthrough","calfraise"],
    pool: ["rdlcable","legextension","glutekick","smithlunge"] },
  { id: "ctc", name: "Chest · Triceps · Core", tag: "Push Day", gym: "Club 16", accent: C.chest,
    warmup: "15 min elliptical + dynamic stretch",
    main: ["dbchestpress","dbfly","cablefly","dbpullover","smithpushup","ropepushdown","overheadext","dbcrunch","legsinout"],
    pool: ["closegrip","crunchmachine","deadbug","dblegraise"] },
  { id: "lglb", name: "Legs · Glutes · Lower Back", tag: "Club 16 only", gym: "Club 16", accent: C.lowerback,
    warmup: "15 min elliptical (cycle if legs sore) + dynamic stretch",
    main: ["rdlcable","legpress","legcurl","hipabd","glutekick","backext","calfraise"],
    pool: ["sumosquat","pullthrough","legextension"] },
  { id: "sbc", name: "Shoulders · Biceps · Core", tag: "All 3 Delts", gym: "Club 16", accent: C.shoulders,
    warmup: "15 min elliptical + dynamic stretch",
    main: ["dbshpress","dblatraise","cablereardelt","cablelateral","facepulls","hammercurl","conccurl","dbtwist","plank"],
    pool: ["cablefront","inclineprone","pronefront","dbcurl","sidebend"] },
  { id: "fb", name: "Full Body", tag: "Building Gym", gym: "Building Gym", accent: C.fullbody,
    warmup: "15 min cardio of choice + dynamic stretch",
    main: ["smithlunge","rdl","latpulldown","dbshpress","dbfly","ropepushdown","hammercurl","deadbug","plank"],
    pool: ["smithpushup","legcurl","legextension","dbtwist","dblegraise"] },
];

/* ================= SUPPLEMENTS ================= */
export const SUPPS = [
  { time: "4:30 AM", items: "Creatine + Green Tea Extract", note: "Empty stomach. With your reflux, consider shifting green tea extract to a fed window — it can irritate an empty stomach.", flag: true },
  { time: "10:30 AM – 12:30 PM", items: "Amla Powder + Iron + Beetroot Powder + Collagen (1 scoop · 11g)", note: "With food. Keep iron away from dairy, calcium and tea — the vitamin C in amla helps it absorb." },
  { time: "1:30 PM", items: "C4 Pre-Workout + L-Carnitine Tartrate ×2", note: "About 30–45 min before training." },
  { time: "4:30 PM", items: "Protein Shake", note: "Post-workout. Collagen can double up here on heavy days if you prefer." },
  { time: "Bedtime", items: "Fish Oil Omega + Calcium", note: "Calcium at night keeps it far from your midday iron." },
  { time: "Bedtime · 2×/week", items: "B12", note: "Twice weekly only — your iron complex already includes B12 daily." },
];

/* ================= FOOD ================= */
/* r = reflux-friendly, p = protein-forward */
export const FOOD = {
  Snacks: [
    { n: "Roasted Makhana + Peanuts", d: "Ghee-roasted, jeera + black pepper", r: 1 },
    { n: "Sprouts Bhel", d: "Moong sprouts, onion, tomato, lemon, sev on top", p: 1 },
    { n: "Paneer Tikka Bites", d: "Air-fried or pan, mint chutney on the side", p: 1 },
    { n: "Chana Chaat", d: "Boiled kala chana, cucumber, chaat masala", p: 1 },
    { n: "Apple + Peanut Butter", d: "Quick pre-supplement window snack", r: 1 },
    { n: "Boiled Corn Chaat", d: "Butter, lime, red chilli — 5 minutes", r: 1 },
    { n: "Greek Yogurt + Fruit", d: "Not near your iron window — dairy blocks it", p: 1 },
    { n: "Edamame with Sea Salt", d: "Steamed, 10g+ protein per cup", p: 1, r: 1 },
  ],
  Breakfast: [
    { n: "Besan Chilla + Paneer Stuffing", d: "2 chillas ≈ 20g protein with the paneer", p: 1 },
    { n: "Moong Dal Chilla", d: "Soaked overnight, green chutney", p: 1, r: 1 },
    { n: "Vegetable Poha", d: "Peanuts + curry leaves, light on the stomach", r: 1 },
    { n: "Oats Upma", d: "Savory oats with veggies — gentle if throat is sore", r: 1 },
    { n: "Idli + Sambar", d: "Fermented = easy digestion", r: 1 },
    { n: "Ragi Dosa + Coconut Chutney", d: "Iron-rich millet", r: 1 },
    { n: "Tofu Bhurji on Toast", d: "Scrambled tofu, pav bhaji masala twist", p: 1 },
  ],
  Lunch: [
    { n: "Rajma + Brown Rice", d: "The classic — beans + rice = complete protein", p: 1 },
    { n: "Palak Paneer + Roti", d: "Iron + protein in one plate", p: 1 },
    { n: "Chole Quinoa Bowl", d: "Quinoa instead of rice for extra protein", p: 1 },
    { n: "Dal Tadka + Jeera Rice + Salad", d: "Comfort plate, add ghee", r: 1 },
    { n: "Mediterranean Bowl", d: "Baked falafel, hummus, cucumber, olives", p: 1 },
    { n: "Veg Burrito Bowl", d: "Black beans, corn, rice, guac — skip the salsa if throat is off", p: 1 },
    { n: "Thai Green Curry + Tofu", d: "Coconut base is gentle, load the veggies", r: 1 },
    { n: "Paneer Kathi Roll", d: "Whole wheat wrap, grilled paneer + peppers", p: 1 },
  ],
  Dinner: [
    { n: "Khichdi + Ghee", d: "The reflux-friendly gold standard", r: 1 },
    { n: "Paneer Bhurji + Phulka", d: "Fast, 25g+ protein", p: 1 },
    { n: "Lauki Chana Dal", d: "Light, protein from the dal", r: 1, p: 1 },
    { n: "Veg Clear Soup + Grilled Paneer", d: "Light night — good before early mornings", r: 1, p: 1 },
    { n: "Stuffed Capsicum", d: "Paneer-potato filling, baked", p: 1 },
    { n: "Miso Soba with Vegetables", d: "Warm broth, gentle on the throat", r: 1 },
    { n: "Dal Palak + Roti", d: "Iron + protein, easy digestion", r: 1, p: 1 },
    { n: "Veg Momos (Steamed)", d: "Steamed not fried, spicy chutney optional", r: 1 },
  ],
};


/* Default document — used to seed a fresh account. Everything is editable in the app. */
export function defaultDoc() {
  return {
    exercises: JSON.parse(JSON.stringify(EX)),
    sessions: SESSIONS.map(s => ({ ...s, main: [...s.main], pool: [...s.pool], rot: 0 })),
    supps: SUPPS.map(s => ({ ...s })),
    food: JSON.parse(JSON.stringify(FOOD)),
    settings: { tempoSec: 3, restSec: 75 },
    foodSeed: null,
  };
}
