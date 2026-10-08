import { createClient } from "@/lib/supabase/server";

export async function findAllFavorites() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("favorites")
    .select(`
      *,
      app_users (
        id,
        name,
        email,
        company_name
      )
    `);

  if (error) throw new Error(error.message);

  return data;
}

export async function findFavoriteById(userId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function insertFavorite(payload) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("favorites")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteFavoriteById(userId) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return true;
}