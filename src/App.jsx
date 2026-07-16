import { useState, useEffect, useRef } from "react";
import { C, font } from "./theme.js";
import { supabase, configured, loadDoc, saveDoc } from "./supabase.js";
import { defaultDoc } from "./seed.js";
import TrainTab from "./TrainTab.jsx";
import { SuppsTab, FoodTab, Auth } from "./Tabs.jsx";

const GlobalStyle = () => (
  <style>{`
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body { margin: 0; background: ${C.bg}; }
    ::-webkit-scrollbar { display: none; }
    button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid ${C.biceps}; outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  `}</style>
);

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [doc, setDoc] = useState(null);
  const [tab, setTab] = useState("train");
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved"); // saved | saving | error
  const saveTimer = useRef(null);
  const pendingDoc = useRef(null);

  // Auth session
  useEffect(() => {
    if (!configured) { setSession(null); return; }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Load (or seed) the document once signed in
  useEffect(() => {
    if (!session?.user) return;
    (async () => {
      try {
        let d = await loadDoc(session.user.id);
        if (!d || !d.sessions) { d = defaultDoc(); await saveDoc(session.user.id, d); }
        setDoc(d);
      } catch (e) {
        console.error(e);
        setSaveStatus("error");
        setDoc(defaultDoc());
      }
    })();
  }, [session?.user?.id]);

  // Debounced save
  const update = (next) => {
    setDoc(next);
    pendingDoc.current = next;
    setSaveStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try { await saveDoc(session.user.id, next); pendingDoc.current = null; setSaveStatus("saved"); }
      catch (e) { console.error(e); setSaveStatus("error"); }
    }, 800);
  };

  // Flush a pending debounced save immediately if the app is backgrounded/closed,
  // so an edit made just before switching apps doesn't get lost.
  useEffect(() => {
    if (!session?.user) return;
    const flush = () => {
      if (!pendingDoc.current) return;
      clearTimeout(saveTimer.current);
      const toSave = pendingDoc.current;
      pendingDoc.current = null;
      saveDoc(session.user.id, toSave).catch(e => console.error(e));
    };
    const onVisibility = () => { if (document.visibilityState === "hidden") flush(); };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [session?.user?.id]);

  if (!configured) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: font.body, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <GlobalStyle />
        <div style={{ maxWidth: 420, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 18, padding: 22, fontSize: 13.5, lineHeight: 1.7, color: C.dim }}>
          <b style={{ color: C.text }}>Almost there — connect Supabase.</b><br />
          Add these two environment variables (in Vercel → Project → Settings → Environment Variables, or a local <code>.env</code> file), then redeploy:<br /><br />
          <code style={{ color: C.biceps }}>VITE_SUPABASE_URL</code><br />
          <code style={{ color: C.biceps }}>VITE_SUPABASE_ANON_KEY</code><br /><br />
          Both values are in your Supabase project under <b style={{ color: C.text }}>Settings → API</b>. Full steps are in the README.
        </div>
      </div>
    );
  }

  if (session === undefined) return <div style={{ minHeight: "100vh", background: C.bg }}><GlobalStyle /></div>;
  if (!session) return <div style={{ minHeight: "100vh", background: C.bg, fontFamily: font.body }}><GlobalStyle /><Auth /></div>;

  const tabs = [
    { id: "train", label: "Train", emoji: "🏋️" },
    { id: "supps", label: "Supps", emoji: "⏰" },
    { id: "food", label: "Food", emoji: "🍛" },
  ];
  const statusColor = { saved: C.lowerback, saving: C.back, error: C.chest }[saveStatus];
  const statusText = { saved: "Saved", saving: "Saving…", error: "Save failed — check connection" }[saveStatus];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: font.body }}>
      <GlobalStyle />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "18px 16px 100px" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, gap: 8 }}>
          <div style={{ fontFamily: font.display, fontSize: 17, letterSpacing: 2.5, textTransform: "uppercase" }}>
            Prachi<span style={{ color: C.legs }}>.</span>Hub
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: statusColor, fontWeight: 700 }}>● {statusText}</span>
            <button onClick={() => setEditMode(e => !e)}
              style={{ fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                background: editMode ? C.back : C.panel, color: editMode ? "#17141A" : C.dim, border: `1px solid ${editMode ? C.back : C.line}` }}>
              {editMode ? "✓ Done editing" : "✎ Edit"}
            </button>
            <button onClick={() => supabase.auth.signOut()} title="Sign out"
              style={{ fontSize: 11, fontWeight: 700, padding: "6px 10px", borderRadius: 20, cursor: "pointer", background: C.panel, color: C.faint, border: `1px solid ${C.line}` }}>⎋</button>
          </div>
        </header>

        {!doc ? (
          <div style={{ color: C.dim, fontSize: 13, padding: "40px 0", textAlign: "center" }}>Loading your hub…</div>
        ) : (
          <>
            {tab === "train" && <TrainTab doc={doc} update={update} editMode={editMode} />}
            {tab === "supps" && <SuppsTab doc={doc} update={update} editMode={editMode} />}
            {tab === "food" && <FoodTab doc={doc} update={update} editMode={editMode} />}
            {tab === "train" && editMode && (
              <div style={{ marginTop: 18, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 16, alignItems: "center", fontSize: 12.5, color: C.dim }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                  Rep tempo (sec/rep)
                  <input type="number" min="1" max="10" value={doc.settings?.tempoSec ?? 3}
                    onChange={e => update({ ...doc, settings: { ...doc.settings, tempoSec: Math.max(1, parseInt(e.target.value) || 3) } })}
                    style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, color: C.text, padding: "8px 10px", outline: "none" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                  Rest between sets (sec)
                  <input type="number" min="15" max="300" step="15" value={doc.settings?.restSec ?? 75}
                    onChange={e => update({ ...doc, settings: { ...doc.settings, restSec: Math.max(15, parseInt(e.target.value) || 75) } })}
                    style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, color: C.text, padding: "8px 10px", outline: "none" }} />
                </label>
              </div>
            )}
          </>
        )}
      </div>

      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.panel + "F2", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 560, margin: "0 auto", display: "flex" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, padding: "12px 0 16px", background: "none", border: "none", cursor: "pointer",
                color: tab === t.id ? C.text : C.faint, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 20, filter: tab === t.id ? "none" : "grayscale(1) opacity(0.6)" }}>{t.emoji}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{t.label}</span>
              <span style={{ width: 20, height: 3, borderRadius: 3, background: tab === t.id ? C.legs : "transparent" }} />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
