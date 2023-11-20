import { supabase } from "./supabase.js";

export async function listGroups(memberId: string | undefined) {
  const { data, error } = await supabase.rpc('getusergroups', memberId)
  if (error) return [];
  return data
}
