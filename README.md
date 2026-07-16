# Prachi.Hub

Your personal fitness hub — workouts with voice-guided rep counting and rest timers, supplement schedule, and meal ideas. Everything is editable in the app and saved to your own free Supabase database. Only you can sign in.

Total setup time: ~25 minutes. Everything below is on free tiers.

---

## Step 1 — The code is already on GitHub ✓

This repo (`WorkOut-Meal-Plan`) has everything: `package.json`, `index.html`, and the `src`, `public`, `supabase` folders. Nothing to do here — move on to Step 2.

## Step 2 — Create the database on Supabase (~8 min)

1. Go to **supabase.com** → **Start your project** → sign up (you can sign in with GitHub).
2. Click **New project**. Name: `prachi-hub`. Set any database password (save it somewhere, you won't need it day-to-day). Pick the region closest to you. Click **Create**.
3. Wait ~2 minutes for the project to finish setting up.
4. In the left sidebar, open **SQL Editor** → **New query**. Open the file `supabase/schema.sql` from this project, copy ALL of it, paste it in, and click **Run**. You should see "Success".
5. In the left sidebar, go to **Authentication → Providers** (may be under Sign In / Up) and make sure **Email** is enabled (it is by default). No other provider needed.
6. Go to **Settings → API** (or "Project Settings → API Keys") and keep this page open — you need two values in the next step:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon / public key** (a long string)

## Step 3 — Deploy on Vercel (~7 min)

1. Go to **vercel.com** → **Sign up** → choose **Continue with GitHub**.
2. Click **Add New → Project**, find `WorkOut-Meal-Plan` in the list, click **Import**.
3. Vercel auto-detects Vite — leave the build settings alone.
4. Open the **Environment Variables** section and add both:
   - Name: `VITE_SUPABASE_URL` → Value: your Project URL from Supabase
   - Name: `VITE_SUPABASE_ANON_KEY` → Value: your anon public key
5. Click **Deploy**. In ~1 minute you get a live URL like `prachi-hub.vercel.app`.

## Step 4 — First sign-in

1. Open your Vercel URL on your phone.
2. Enter your email → Supabase emails you a **6-digit code** → enter it. That's it, no password. You stay signed in on that device.
3. Your hub loads pre-filled with all your sessions, weights, supplements, and meals. First sign-in seeds the database automatically.
4. **Add to home screen** (Safari: Share → Add to Home Screen / Chrome: menu → Add to Home Screen) — it opens full-screen like a real app.

---

## Using the hub

- **Train tab** — pick a session, tap any weight to change it (saves automatically). Hit **▶ Start guided workout** and your phone counts your reps out loud, runs your rest timer, and announces each next set. ▶ Guide on any single card runs just that exercise. The **rotation slot** swaps in a fresh exercise from your saved pool each week.
- **✎ Edit** (top right) — add/remove/reorder exercises (from your library or brand new), change sets, reps, names, and cues; edit supplement times and notes; add or delete meal ideas. Rep tempo and rest length for guided mode are at the bottom of the Train tab while editing.
- **Voice**: guided mode uses your phone's built-in speech — turn your ringer/media volume on. The screen stays awake during a session.

## Costs & limits

- **Supabase free tier**: 500 MB database — your hub uses a few kilobytes. Free projects pause after ~1 week of zero activity; just open the dashboard and click Restore if that happens (using the app regularly prevents it).
- **Vercel free tier**: far more than a personal app will ever use.
- **Total cost: $0.**

## Making changes later

Edit any file directly on GitHub (open the file → pencil icon → commit) — Vercel redeploys automatically within a minute. Default data lives in `src/seed.js`, colors in `src/theme.js`, exercise illustrations in `src/icons.jsx`.

## Troubleshooting

- **"Almost there — connect Supabase" screen** → env variables missing or misspelled in Vercel. Add them, then Deployments → ⋯ → Redeploy.
- **Code email doesn't arrive** → check spam; Supabase's built-in email sender is rate-limited to a few per hour.
- **"Save failed"** → usually offline, or the schema.sql step was skipped. Re-run Step 2.4.
- **No voice during guided mode** → phone on silent, or tap the screen once first (browsers require one interaction before audio).
