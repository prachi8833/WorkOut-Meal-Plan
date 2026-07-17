import { useState, useMemo } from "react";
import { C, font } from "./theme.js";
import { supabase } from "./supabase.js";

const inp = { width: "100%", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 10, color: C.text, padding: "10px 12px", fontSize: 13, outline: "none", fontFamily: font.body, boxSizing: "border-box" };
const editBtn = { background: C.panel2, border: `1px solid ${C.line}`, color: C.dim, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" };

/* ================= SUPPLEMENTS ================= */
export function SuppsTab({ doc, update, editMode }) {
  const patch = (fn) => { const next = structuredClone(doc); fn(next); update(next); };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 400, margin: "0 0 4px", color: C.text, textTransform: "uppercase" }}>Supplement Clock</h2>
      <div style={{ fontSize: 12.5, color: C.dim, marginBottom: 18 }}>Your daily order — iron rules built in.</div>
      {doc.supps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: s.flag ? C.chest : C.biceps, marginTop: 4, flexShrink: 0 }} />
            {i < doc.supps.length - 1 && <div style={{ width: 2, flex: 1, background: C.line, margin: "4px 0" }} />}
          </div>
          <div style={{ paddingBottom: 22, flex: 1 }}>
            {editMode ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <input value={s.time} onChange={e => patch(d => { d.supps[i].time = e.target.value; })} style={{ ...inp, width: 150 }} />
                  <button onClick={() => patch(d => { if (i > 0) [d.supps[i - 1], d.supps[i]] = [d.supps[i], d.supps[i - 1]]; })} style={editBtn}>↑</button>
                  <button onClick={() => patch(d => { if (i < d.supps.length - 1) [d.supps[i + 1], d.supps[i]] = [d.supps[i], d.supps[i + 1]]; })} style={editBtn}>↓</button>
                  <button onClick={() => patch(d => d.supps.splice(i, 1))} style={{ ...editBtn, color: C.chest }}>✕</button>
                </div>
                <input value={s.items} onChange={e => patch(d => { d.supps[i].items = e.target.value; })} style={inp} />
                <input value={s.note} onChange={e => patch(d => { d.supps[i].note = e.target.value; })} style={{ ...inp, fontSize: 12, color: C.dim }} />
              </div>
            ) : (
              <>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: s.flag ? C.chest : C.biceps }}>{s.time}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "3px 0" }}>{s.items}</div>
                <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.5 }}>{s.note}</div>
              </>
            )}
          </div>
        </div>
      ))}
      {editMode && (
        <button onClick={() => patch(d => d.supps.push({ time: "Time", items: "Supplement", note: "" }))}
          style={{ ...editBtn, padding: "12px 0", marginBottom: 14 }}>+ Add supplement</button>
      )}
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, fontSize: 12.5, color: C.dim, lineHeight: 1.6 }}>
        <b style={{ color: C.text }}>Reflux notes:</b> nothing acidic on an empty stomach (amla stays in the fed window). Psyllium husk is out. If the sore throat keeps showing up, it's worth mentioning to a doctor.
      </div>
    </div>
  );
}

/* ================= FOOD ================= */
function weekNumber() { return Math.floor(Date.now() / 604800000); }
function seededPick(arr, count, seed) {
  const out = []; const idxs = arr.map((_, i) => i); let s = seed;
  for (let i = 0; i < Math.min(count, arr.length); i++) {
    s = (s * 9301 + 49297) % 233280;
    out.push(arr[idxs.splice(Math.floor((s / 233280) * idxs.length), 1)[0]]);
  }
  return out;
}

export function FoodTab({ doc, update, editMode }) {
  const cats = Object.keys(doc.food);
  const [cat, setCat] = useState(cats[0]);
  const [adding, setAdding] = useState(false);
  const [nm, setNm] = useState(""); const [ds, setDs] = useState(""); const [tp, setTp] = useState(false); const [tr, setTr] = useState(false);
  const seed = doc.foodSeed ?? weekNumber();
  const picks = useMemo(() => {
    const all = Object.entries(doc.food).flatMap(([k, arr]) => arr.map(f => ({ ...f, cat: k })));
    return seededPick(all, 4, seed);
  }, [seed, doc.food]);
  const patch = (fn) => { const next = structuredClone(doc); fn(next); update(next); };
  const Tag = ({ children, color }) => <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color, background: color + "16", padding: "2px 7px", borderRadius: 20 }}>{children}</span>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <h2 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 400, margin: 0, color: C.text, textTransform: "uppercase" }}>Kitchen</h2>
        <div style={{ fontSize: 12.5, color: C.dim, marginTop: 2 }}>All veg · homemade · nothing greasy · reflux-aware</div>
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: C.legs }}>This week's picks</span>
          <button onClick={() => patch(d => { d.foodSeed = (seed + 1) % 233280; })} style={editBtn}>Shuffle ↻</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {picks.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.faint, textTransform: "uppercase", width: 62, flexShrink: 0, paddingTop: 2 }}>{f.cat}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{f.n}</div>
                <div style={{ fontSize: 12, color: C.dim }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "0 -16px", padding: "0 16px" }}>
        {cats.map(k => (
          <button key={k} onClick={() => setCat(k)}
            style={{ flexShrink: 0, padding: "8px 16px", borderRadius: 24, cursor: "pointer", fontSize: 12.5, fontWeight: 700, fontFamily: font.body,
              background: k === cat ? C.legs : C.panel, color: k === cat ? "#17141A" : C.dim, border: `1px solid ${k === cat ? C.legs : C.line}` }}>
            {k}
          </button>
        ))}
      </div>

      {editMode && (adding ? (
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <input placeholder={`New ${cat.toLowerCase()} idea`} value={nm} onChange={e => setNm(e.target.value)} style={inp} />
          <input placeholder="Short description" value={ds} onChange={e => setDs(e.target.value)} style={inp} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setTp(!tp)} style={{ ...editBtn, background: tp ? C.triceps + "22" : C.panel2, color: tp ? C.triceps : C.dim }}>Protein {tp ? "✓" : ""}</button>
            <button onClick={() => setTr(!tr)} style={{ ...editBtn, background: tr ? C.lowerback + "22" : C.panel2, color: tr ? C.lowerback : C.dim }}>Gentle {tr ? "✓" : ""}</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setAdding(false)} style={{ ...editBtn, flex: 1, padding: "10px 0" }}>Cancel</button>
            <button onClick={() => { if (!nm.trim()) return; patch(d => d.food[cat].unshift({ n: nm.trim(), d: ds.trim(), p: tp ? 1 : 0, r: tr ? 1 : 0 })); setNm(""); setDs(""); setTp(false); setTr(false); setAdding(false); }}
              style={{ ...editBtn, flex: 1, padding: "10px 0", background: C.legs, color: "#17141A", border: "none" }}>Add</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} style={{ ...editBtn, padding: "12px 0" }}>+ Add a {cat.toLowerCase()} idea</button>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {doc.food[cat].map((f, i) => (
          <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text }}>{f.n}</div>
              <div style={{ display: "flex", gap: 5, flexShrink: 0, alignItems: "center" }}>
                {f.p ? <Tag color={C.triceps}>Protein</Tag> : null}
                {f.r ? <Tag color={C.lowerback}>Gentle</Tag> : null}
                {editMode && <button onClick={() => patch(d => d.food[cat].splice(i, 1))} style={{ ...editBtn, color: C.chest, padding: "2px 8px" }}>✕</button>}
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 3, lineHeight: 1.45 }}>{f.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= AUTH ================= */
export function Auth() {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const canSubmit = email.includes("@") && password.length >= 6 && !busy;

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true); setMsg("");
    const creds = { email: email.trim(), password };
    const { error } = mode === "signin"
      ? await supabase.auth.signInWithPassword(creds)
      : await supabase.auth.signUp(creds);
    setBusy(false);
    if (error) setMsg(error.message);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 380, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: font.display, fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: C.text, textAlign: "center" }}>
          Prachi<span style={{ color: C.legs }}>.</span>Hub
        </div>
        <div style={{ fontSize: 12.5, color: C.dim, textAlign: "center" }}>
          {mode === "signin" ? "Sign in to your hub." : "Create your account — first time only."}
        </div>
        <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
        <input type="password" placeholder="Password (6+ characters)" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} style={inp} />
        <button onClick={submit} disabled={!canSubmit}
          style={{ padding: "13px 0", borderRadius: 12, background: C.legs, color: "#17141A", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", opacity: canSubmit ? 1 : 0.6 }}>
          {busy ? (mode === "signin" ? "Signing in…" : "Creating…") : (mode === "signin" ? "Sign in" : "Create account")}
        </button>
        <button onClick={() => { setMode(m => m === "signin" ? "signup" : "signin"); setMsg(""); }}
          style={{ background: "none", border: "none", color: C.dim, fontSize: 12, cursor: "pointer" }}>
          {mode === "signin" ? "First time? Create your account" : "Already have an account? Sign in"}
        </button>
        {msg && <div style={{ fontSize: 12, color: C.dim, textAlign: "center" }}>{msg}</div>}
      </div>
    </div>
  );
}
