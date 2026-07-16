import { useState } from "react";
import { C, MUSCLE_LABEL, font } from "./theme.js";
import { Figure } from "./icons.jsx";
import Guided from "./Guided.jsx";

const MUSCLES = Object.keys(MUSCLE_LABEL).filter(m => !["fullbody", "cardio"].includes(m));

function DropBar({ sets, color }) {
  const nums = sets.map(s => (typeof s[0] === "number" ? s[0] : 0));
  const max = Math.max(...nums, 1);
  if (!nums.some(n => n > 0)) return null;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 26 }} title="Heavy → light">
      {nums.map((n, i) => <div key={i} style={{ width: 9, borderRadius: 3, height: Math.max(4, (n / max) * 26), background: n ? color : C.line }} />)}
    </div>
  );
}

function WeightChip({ val, reps, color, onWeight, onReps, editMode }) {
  const [editing, setEditing] = useState(false);
  const [tmp, setTmp] = useState("");
  const isNum = typeof val === "number";
  const label = isNum ? `${val} lb` : val === "bw" ? "BW" : val === "asst" ? "Assist" : "—";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      {editing ? (
        <input autoFocus type="number" inputMode="decimal" value={tmp} onChange={e => setTmp(e.target.value)}
          onBlur={() => { setEditing(false); const n = parseFloat(tmp); if (!isNaN(n)) onWeight(n); }}
          onKeyDown={e => e.key === "Enter" && e.target.blur()}
          style={{ width: 58, padding: "6px 4px", borderRadius: 8, border: `1.5px solid ${color}`, background: C.panel2, color: C.text, fontFamily: font.body, fontSize: 14, textAlign: "center", outline: "none" }} />
      ) : (
        <button onClick={() => { if (val !== "bw") { setTmp(isNum ? String(val) : ""); setEditing(true); } }}
          style={{ padding: "6px 10px", borderRadius: 8, fontFamily: font.body, fontSize: 13, fontWeight: 600, minWidth: 52, cursor: val === "bw" ? "default" : "pointer",
            background: isNum ? color + "1E" : C.panel2, color: isNum ? color : C.dim,
            border: `1px ${val === null ? "dashed" : "solid"} ${isNum ? color + "44" : C.line}` }}>
          {label}
        </button>
      )}
      {editMode ? (
        <input value={reps} onChange={e => onReps(e.target.value)}
          style={{ width: 56, fontSize: 10, textAlign: "center", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 6, color: C.dim, padding: "2px 0", outline: "none" }} />
      ) : (
        <span style={{ fontSize: 10, color: C.faint }}>{reps}</span>
      )}
    </div>
  );
}

function ExerciseCard({ exId, num, doc, update, editMode, onRemove, onMove, swap, onPlay }) {
  const ex = doc.exercises[exId];
  if (!ex) return null;
  const color = C[ex.m] || C.legs;
  const patch = (fn) => {
    const next = structuredClone(doc);
    fn(next.exercises[exId]);
    update(next);
  };
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Figure icon={ex.icon} color={color} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 11, color: C.faint }}>{String(num).padStart(2, "0")}</span>
            {editMode ? (
              <input value={ex.name} onChange={e => patch(x => { x.name = e.target.value; })}
                style={{ flex: 1, fontFamily: font.body, fontWeight: 700, fontSize: 15, color: C.text, background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "4px 8px", outline: "none" }} />
            ) : (
              <span style={{ fontFamily: font.body, fontWeight: 700, fontSize: 15, color: C.text, lineHeight: 1.25 }}>{ex.name}</span>
            )}
          </div>
          {editMode ? (
            <input value={ex.cue} onChange={e => patch(x => { x.cue = e.target.value; })}
              style={{ width: "100%", fontSize: 12, color: C.dim, background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "4px 8px", marginTop: 4, outline: "none" }} />
          ) : (
            <div style={{ fontSize: 12, color: C.dim, marginTop: 3, lineHeight: 1.4 }}>{ex.cue}</div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color, background: color + "16", padding: "2px 8px", borderRadius: 20 }}>{MUSCLE_LABEL[ex.m]}</span>
            {swap && <button onClick={swap} style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: C.dim, background: "none", border: `1px dashed ${C.line}`, padding: "2px 8px", borderRadius: 20, cursor: "pointer" }}>Swap ↻</button>}
            {!editMode && onPlay && <button onClick={onPlay} style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#17141A", background: color, border: "none", padding: "3px 10px", borderRadius: 20, cursor: "pointer" }}>▶ Guide</button>}
          </div>
        </div>
        {!editMode && <DropBar sets={ex.sets} color={color} />}
        {editMode && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {onMove && <button onClick={() => onMove(-1)} style={editBtn}>↑</button>}
            {onMove && <button onClick={() => onMove(1)} style={editBtn}>↓</button>}
            {onRemove && <button onClick={onRemove} style={{ ...editBtn, color: C.chest }}>✕</button>}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
        {ex.sets.map((s, i) => (
          <WeightChip key={i} val={s[0]} reps={s[1]} color={color} editMode={editMode}
            onWeight={n => patch(x => { x.sets[i][0] = n; })}
            onReps={r => patch(x => { x.sets[i][1] = r; })} />
        ))}
        {editMode && (
          <>
            <button onClick={() => patch(x => x.sets.push([null, "12"]))} style={{ ...editBtn, height: 32 }}>+ set</button>
            {ex.sets.length > 1 && <button onClick={() => patch(x => x.sets.pop())} style={{ ...editBtn, height: 32 }}>− set</button>}
          </>
        )}
      </div>
    </div>
  );
}
const editBtn = { background: "#26222C", border: "1px solid #332E3B", color: "#A79FB3", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" };

function AddExercise({ doc, update, session }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [m, setM] = useState("core");
  const [cue, setCue] = useState("");
  const [libPick, setLibPick] = useState("");
  const inSession = new Set([...session.main, ...session.pool]);
  const library = Object.entries(doc.exercises).filter(([id]) => !inSession.has(id));

  const addNew = () => {
    if (!name.trim()) return;
    const id = "ex_" + Date.now();
    const next = structuredClone(doc);
    next.exercises[id] = { name: name.trim(), m, icon: "press", cue: cue.trim() || "Controlled reps, full range", sets: [[null, "12"], [null, "12"], [null, "12"]] };
    next.sessions.find(s => s.id === session.id).main.push(id);
    update(next); setName(""); setCue(""); setOpen(false);
  };
  const addFromLib = () => {
    if (!libPick) return;
    const next = structuredClone(doc);
    next.sessions.find(s => s.id === session.id).main.push(libPick);
    update(next); setLibPick(""); setOpen(false);
  };

  if (!open) return <button onClick={() => setOpen(true)} style={{ ...editBtn, padding: "12px 0", width: "100%", fontSize: 13 }}>+ Add exercise to this session</button>;
  const inp = { width: "100%", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 13, outline: "none", fontFamily: font.body };
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.dim }}>From your library</div>
      <div style={{ display: "flex", gap: 8 }}>
        <select value={libPick} onChange={e => setLibPick(e.target.value)} style={{ ...inp, flex: 1 }}>
          <option value="">Choose an exercise…</option>
          {library.map(([id, ex]) => <option key={id} value={id}>{ex.name}</option>)}
        </select>
        <button onClick={addFromLib} style={{ ...editBtn, flexShrink: 0 }}>Add</button>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.dim, marginTop: 4 }}>Or create new</div>
      <input placeholder="Exercise name" value={name} onChange={e => setName(e.target.value)} style={inp} />
      <input placeholder="Form cue (optional)" value={cue} onChange={e => setCue(e.target.value)} style={inp} />
      <select value={m} onChange={e => setM(e.target.value)} style={inp}>
        {MUSCLES.map(k => <option key={k} value={k}>{MUSCLE_LABEL[k]}</option>)}
      </select>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setOpen(false)} style={{ ...editBtn, flex: 1, padding: "10px 0" }}>Cancel</button>
        <button onClick={addNew} style={{ ...editBtn, flex: 1, padding: "10px 0", background: C.legs, color: "#17141A", border: "none" }}>Create + add</button>
      </div>
    </div>
  );
}

export default function TrainTab({ doc, update, editMode }) {
  const [sessionId, setSessionId] = useState(doc.sessions[0]?.id);
  const [guided, setGuided] = useState(null); // array of exIds
  const session = doc.sessions.find(s => s.id === sessionId) || doc.sessions[0];
  if (!session) return null;
  const rotationEx = session.pool.length ? session.pool[(session.rot || 0) % session.pool.length] : null;

  const patchSession = (fn) => { const next = structuredClone(doc); fn(next.sessions.find(s => s.id === session.id)); update(next); };
  const removeFromMain = (i) => patchSession(s => s.main.splice(i, 1));
  const move = (i, dir) => patchSession(s => {
    const j = i + dir; if (j < 0 || j >= s.main.length) return;
    [s.main[i], s.main[j]] = [s.main[j], s.main[i]];
  });

  const fullQueue = rotationEx ? [...session.main, rotationEx] : [...session.main];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "0 -16px", padding: "0 16px 4px" }}>
        {doc.sessions.map(s => (
          <button key={s.id} onClick={() => setSessionId(s.id)}
            style={{ flexShrink: 0, padding: "9px 14px", borderRadius: 24, cursor: "pointer", fontFamily: font.body, fontSize: 12.5, fontWeight: 700,
              background: s.id === session.id ? s.accent : C.panel, color: s.id === session.id ? "#17141A" : C.dim, border: `1px solid ${s.id === session.id ? s.accent : C.line}` }}>
            {s.name}
          </button>
        ))}
      </div>

      <div>
        <h2 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 400, margin: 0, color: C.text, textTransform: "uppercase", lineHeight: 1.05 }}>{session.name}</h2>
        <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: session.accent, background: session.accent + "16", padding: "3px 10px", borderRadius: 20 }}>{session.tag}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, background: C.panel, border: `1px solid ${C.line}`, padding: "3px 10px", borderRadius: 20 }}>📍 {session.gym}</span>
        </div>
      </div>

      {!editMode && (
        <button onClick={() => setGuided(fullQueue)}
          style={{ padding: "15px 0", borderRadius: 14, background: session.accent, color: "#17141A", border: "none", fontFamily: font.body, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          ▶ Start guided workout — voice counting + rest timers
        </button>
      )}

      <div style={{ background: C.panel2, borderRadius: 12, padding: "10px 14px", fontSize: 12.5, color: C.dim, borderLeft: `3px solid ${session.accent}` }}>
        <b style={{ color: C.text }}>Warm-up:</b> {session.warmup}
      </div>
      <div style={{ fontSize: 11, color: C.faint, textAlign: "right" }}>
        {editMode ? "Edit mode — change anything, saved automatically" : "Tap any weight to edit · loading runs heavy → light"}
      </div>

      {session.main.map((exId, i) => (
        <ExerciseCard key={exId + i} exId={exId} num={i + 1} doc={doc} update={update} editMode={editMode}
          onRemove={() => removeFromMain(i)} onMove={d => move(i, d)}
          onPlay={() => setGuided([exId])} />
      ))}

      {editMode && <AddExercise doc={doc} update={update} session={session} />}

      {rotationEx && (
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: session.accent, marginBottom: 8 }}>↻ This week's rotation slot</div>
          <ExerciseCard exId={rotationEx} num={session.main.length + 1} doc={doc} update={update} editMode={editMode}
            swap={() => patchSession(s => { s.rot = ((s.rot || 0) + 1) % s.pool.length; })}
            onPlay={() => setGuided([rotationEx])} />
          <div style={{ fontSize: 11.5, color: C.faint, marginTop: 6, lineHeight: 1.5 }}>
            Rotates through: {session.pool.map(id => doc.exercises[id]?.name).filter(Boolean).join(" · ")}
          </div>
        </div>
      )}

      {guided && <Guided queue={guided} doc={doc} onClose={() => setGuided(null)} />}
    </div>
  );
}
