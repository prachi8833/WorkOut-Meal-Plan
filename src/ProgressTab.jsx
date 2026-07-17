import { useState } from "react";
import { C, font } from "./theme.js";
import { dateKey } from "./date.js";

function startOfWeek(d) {
  const day = (d.getDay() + 6) % 7; // Monday = 0
  const s = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
  return s;
}

const navBtn = { background: C.panel2, border: `1px solid ${C.line}`, color: C.text, borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 14, fontWeight: 700 };
const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function TargetBar({ label, value, target, color, editable, onEdit, suffix = "" }) {
  const pct = target ? Math.min(100, Math.round((value / target) * 100)) : 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, color: C.dim, marginBottom: 5 }}>
        <span>{label}</span>
        {editable ? (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {value}{suffix} / <input type="number" value={target} min="0"
              onChange={e => onEdit(Math.max(0, parseInt(e.target.value) || 0))}
              style={{ width: 56, background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 6, color: C.text, padding: "3px 6px", fontSize: 12, outline: "none" }} />{suffix}
          </span>
        ) : (
          <span>{value}{suffix} / {target}{suffix}</span>
        )}
      </div>
      <div style={{ height: 8, borderRadius: 6, background: C.panel2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 6, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

export default function ProgressTab({ doc, update, editMode }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState(null);
  const log = doc.log || {};
  const targets = doc.targets || { weeklyVisits: 4, weeklyCalories: 1200 };

  const now = new Date();
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadBlank = (new Date(year, month, 1).getDay() + 6) % 7;

  const cells = [...Array(leadBlank).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))];

  const weekStart = startOfWeek(now);
  let weekVisits = 0, weekCalories = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
    const entry = log[dateKey(d)];
    if (entry) { weekVisits++; weekCalories += entry.calories || 0; }
  }

  const patchTargets = (fn) => { const next = structuredClone(doc); next.targets = next.targets || { ...targets }; fn(next.targets); update(next); };
  const monthLabel = viewDate.toLocaleString("en-US", { month: "long", year: "numeric" });
  const todayKey = dateKey(now);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 400, margin: 0, color: C.text, textTransform: "uppercase", lineHeight: 1.05 }}>Progress</h2>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.dim }}>This week's targets</div>
        <TargetBar label="Workouts" value={weekVisits} target={targets.weeklyVisits} color={C.legs}
          editable={editMode} onEdit={v => patchTargets(t => { t.weeklyVisits = v; })} />
        <TargetBar label="Calories burned" value={weekCalories} target={targets.weeklyCalories} color={C.back} suffix=" kcal"
          editable={editMode} onEdit={v => patchTargets(t => { t.weeklyCalories = v; })} />
      </div>

      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => { setMonthOffset(m => m - 1); setSelected(null); }} style={navBtn}>‹</button>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{monthLabel}</div>
          <button onClick={() => { setMonthOffset(m => m + 1); setSelected(null); }} style={navBtn}>›</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
          {WEEKDAY_LABELS.map((w, i) => <div key={i} style={{ textAlign: "center", fontSize: 10, color: C.faint, fontWeight: 700 }}>{w}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const key = dateKey(d);
            const entry = log[key];
            const isToday = key === todayKey;
            return (
              <button key={i} onClick={() => entry && setSelected(s => s === key ? null : key)}
                style={{ aspectRatio: "1", borderRadius: 10, border: `1px solid ${isToday ? C.text : entry ? entry.accent + "55" : C.line}`,
                  background: entry ? entry.accent + "2A" : "transparent", color: entry ? entry.accent : C.dim,
                  fontSize: 11.5, fontWeight: entry ? 700 : 400, cursor: entry ? "pointer" : "default" }}>
                {d.getDate()}
              </button>
            );
          })}
        </div>
        {selected && log[selected] && (
          <div style={{ marginTop: 12, padding: "10px 12px", background: C.panel2, borderRadius: 10, fontSize: 12.5, color: C.dim, borderLeft: `3px solid ${log[selected].accent}` }}>
            <b style={{ color: C.text }}>{log[selected].sessionName}</b> · {log[selected].gym}<br />
            ~{log[selected].calories} kcal (rough estimate)
          </div>
        )}
        <div style={{ fontSize: 10.5, color: C.faint, marginTop: 10, textAlign: "center" }}>
          Days auto-mark when you finish a guided workout · tap a marked day for details
        </div>
      </div>
    </div>
  );
}
