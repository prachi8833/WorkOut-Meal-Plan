import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const configured = Boolean(url && key);
export const supabase = configured ? createClient(url, key) : null;

// Loads the whole hub document for the signed-in user.
export async function loadDoc(userId) {
  const { data, error } = await supabase.from("hub").select("data").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? data.data : null;
}

// Saves the whole hub document (upsert = insert or update).
export async function saveDoc(userId, doc) {
  const { error } = await supabase.from("hub").upsert({ user_id: userId, data: doc, updated_at: new Date().toISOString() });
  if (error) throw error;
}
