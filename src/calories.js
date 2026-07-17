/* ================= CALORIE ESTIMATE =================
   Deliberately rough — built from whatever weight you've actually logged per
   set, not a lookup table or a real metabolic model. Good enough to compare
   day to day, not a substitute for a real energy-expenditure measurement. */

function parseSetReps(str) {
  const s = String(str);
  const secs = s.match(/(\d+)\s*(?:[–-]\s*(\d+))?\s*s/i);
  if (secs) return { sec: parseInt(secs[2] || secs[1], 10) };
  const m = s.match(/(\d+)\s*(?:[–-]\s*(\d+))?/);
  const n = m ? parseInt(m[2] || m[1], 10) : 10;
  return { n: /side/i.test(s) ? n * 2 : n };
}

function setCalories(weight, repsStr) {
  const parsed = parseSetReps(repsStr);
  if (parsed.sec) return parsed.sec * 0.15; // holds — flat rate per second
  const reps = parsed.n;
  if (typeof weight === "number") return reps * (weight * 0.4536) * 0.1; // kcal per rep per kg lifted
  if (weight === "bw") return reps * 0.5; // bodyweight reps
  if (weight === "asst") return reps * 0.35; // assisted — lighter effective load
  return reps * 0.3; // weight not logged yet
}

const WARMUP_KCAL = 80;

export function estimateSessionCalories(session, exercises) {
  let total = WARMUP_KCAL;
  for (const exId of session.main) {
    const ex = exercises[exId];
    if (!ex) continue;
    for (const set of ex.sets) total += setCalories(set[0], set[1]);
  }
  return Math.round(total);
}
