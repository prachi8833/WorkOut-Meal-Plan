import { useState, useEffect, useRef } from "react";
import { C, font } from "./theme.js";
import { Figure } from "./icons.jsx";

function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    window.speechSynthesis.speak(u);
  } catch { /* no speech support — timers still run */ }
}

/* "8–10" → {n:10} · "12/side" → {n:12, side:true} · "20–30s" → {sec:30} · "bw"/other → null */
function parseReps(str) {
  const s = String(str);
  const secs = s.match(/(\d+)\s*(?:[–-]\s*(\d+))?\s*s/i);
  if (secs) return { sec: parseInt(secs[2] || secs[1], 10) };
  const m = s.match(/(\d+)\s*(?:[–-]\s*(\d+))?/);
  if (!m) return null;
  return { n: parseInt(m[2] || m[1], 10), side: /side/i.test(s) };
}

export default function Guided({ queue, doc, onClose }) {
  const tempoMs = (doc.settings?.tempoSec ?? 3) * 1000;
  const restSec = doc.settings?.restSec ?? 75;
  const [exIdx, setExIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [phase, setPhase] = useState("ready"); // ready | work | rest | done
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const wake = useRef(null);

  const exId = queue[exIdx];
  const ex = doc.exercises[exId];
  const sets = ex ? ex.sets : [];
  const set = sets[setIdx];
  const reps = set ? parseReps(set[1]) : null;
  const weight = set && typeof set[0] === "number" ? `${set[0]} lb` : set && set[0] === "bw" ? "Bodyweight" : "";

  // Keep the screen awake during a guided session. Browsers auto-release the
  // wake lock when the tab is backgrounded, so re-acquire it on return —
  // otherwise the screen can dim mid-workout after a brief app switch.
  useEffect(() => {
    const acquire = async () => { try { wake.current = await navigator.wakeLock?.request("screen"); } catch {} };
    acquire();
    const onVisibility = () => { if (document.visibilityState === "visible") acquire(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      wake.current?.release?.();
      window.speechSynthesis?.cancel?.();
    };
  }, []);

  const clear = () => { if (timer.current) { clearInterval(timer.current); timer.current = null; } };

  // Phase engine
  useEffect(() => {
    clear();
    if (paused || phase === "done" || !ex) return;

    if (phase === "ready") {
      let c = 5;
      setCount(c);
      speak(`Get ready. ${ex.name}, set ${setIdx + 1}${weight ? `, ${weight}` : ""}.`);
      timer.current = setInterval(() => {
        c -= 1; setCount(c);
        if (c > 0 && c <= 3) speak(String(c));
        if (c <= 0) { clear(); speak("Go!"); setPhase("work"); }
      }, 1000);
    }

    if (phase === "work") {
      if (reps?.sec) {
        let c = reps.sec; setCount(c);
        timer.current = setInterval(() => {
          c -= 1; setCount(c);
          if (c === Math.floor(reps.sec / 2)) speak("Halfway. Hold strong.");
          if (c > 0 && c <= 3) speak(String(c));
          if (c <= 0) { clear(); finishSet(); }
        }, 1000);
      } else if (reps?.n) {
        let c = 0; setCount(0);
        timer.current = setInterval(() => {
          c += 1; setCount(c);
          speak(String(c));
          if (c >= reps.n) { clear(); finishSet(); }
        }, tempoMs);
      } else {
        // Unparseable reps — give a manual "Done" state (count stays 0, user taps Skip).
        setCount(0);
      }
    }

    if (phase === "rest") {
      let c = restSec; setCount(c);
      speak("Rest.");
      timer.current = setInterval(() => {
        c -= 1; setCount(c);
        if (c > 0 && c <= 3) speak(String(c));
        if (c <= 0) { clear(); advance(); }
      }, 1000);
    }

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, setIdx, exIdx, paused]);

  function finishSet() {
    const lastSet = setIdx >= sets.length - 1;
    const lastEx = exIdx >= queue.length - 1;
    if (lastSet && lastEx) { speak("Session complete. Great work, Prachi!"); setPhase("done"); return; }
    if (lastSet) speak(`${ex.name} done. Next: ${doc.exercises[queue[exIdx + 1]]?.name}.`);
    else speak("Set done.");
    setPhase("rest");
  }

  function advance() {
    if (setIdx < sets.length - 1) { setSetIdx(setIdx + 1); setPhase("ready"); }
    else if (exIdx < queue.length - 1) { setExIdx(exIdx + 1); setSetIdx(0); setPhase("ready"); }
    else setPhase("done");
  }

  function skip() { clear(); window.speechSynthesis?.cancel?.(); if (phase === "rest") advance(); else finishSet(); }

  const color = ex ? C[ex.m] : C.legs;
  const big = phase === "ready" ? count : phase === "rest" ? count : reps?.sec ? count : count;
  const phaseLabel = { ready: "GET READY", work: reps?.sec ? "HOLD" : "REPS", rest: "REST", done: "DONE" }[phase];

  const Btn = ({ onClick, children, primary }) => (
    <button onClick={onClick} style={{ flex: 1, padding: "14px 0", borderRadius: 14, cursor: "pointer", fontFamily: font.body, fontSize: 14, fontWeight: 700,
      background: primary ? color : C.panel2, color: primary ? "#17141A" : C.text, border: `1px solid ${primary ? color : C.line}` }}>{children}</button>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 50, display: "flex", flexDirection: "column", padding: "20px 20px 28px", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: font.body, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: C.dim }}>
          GUIDED · {exIdx + 1}/{queue.length}
        </span>
        <button onClick={onClose} style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.dim, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>End ✕</button>
      </div>

      {phase === "done" ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center" }}>
          <div style={{ fontSize: 52 }}>🎉</div>
          <div style={{ fontFamily: font.display, fontSize: 34, textTransform: "uppercase", color: C.text }}>Session Complete</div>
          <div style={{ fontSize: 13, color: C.dim }}>Log any weight changes back in the Train tab.</div>
          <button onClick={onClose} style={{ marginTop: 10, padding: "14px 40px", borderRadius: 14, background: C.legs, color: "#17141A", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Finish</button>
        </div>
      ) : ex ? (
        <>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 26 }}>
            <Figure icon={ex.icon} color={color} />
            <div>
              <div style={{ fontFamily: font.display, fontSize: 24, textTransform: "uppercase", color: C.text, lineHeight: 1.1 }}>{ex.name}</div>
              <div style={{ fontSize: 12.5, color: C.dim, marginTop: 4 }}>{ex.cue}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {sets.map((s, i) => (
              <span key={i} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                background: i === setIdx ? color : i < setIdx ? color + "33" : C.panel,
                color: i === setIdx ? "#17141A" : i < setIdx ? color : C.faint, border: `1px solid ${i <= setIdx ? color : C.line}` }}>
                Set {i + 1}{typeof s[0] === "number" ? ` · ${s[0]}lb` : ""}
              </span>
            ))}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
            <div style={{ fontFamily: font.body, fontSize: 13, fontWeight: 700, letterSpacing: 3, color: phase === "rest" ? C.biceps : color }}>{phaseLabel}</div>
            <div style={{ fontFamily: font.display, fontSize: 130, lineHeight: 1, color: C.text, fontVariantNumeric: "tabular-nums" }}>
              {reps === null && phase === "work" ? "—" : big}
            </div>
            <div style={{ fontSize: 13, color: C.dim }}>
              {phase === "work" && reps?.n ? `of ${reps.n}${reps.side ? " per side" : ""} · ${weight}` : ""}
              {phase === "work" && reps?.sec ? `seconds left · ${weight || "hold"}` : ""}
              {phase === "work" && reps === null ? "Do the set, then tap Skip when done" : ""}
              {phase === "rest" ? "seconds — breathe, shake it out" : ""}
              {phase === "ready" ? `starting set ${setIdx + 1} of ${sets.length}` : ""}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => setPaused(p => !p)}>{paused ? "▶ Resume" : "⏸ Pause"}</Btn>
            <Btn onClick={skip} primary>{phase === "rest" ? "Skip rest →" : "Set done →"}</Btn>
          </div>
        </>
      ) : null}
    </div>
  );
}
