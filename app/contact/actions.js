"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return {
      success: false,
      error: "Semua field wajib diisi.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("messages")
    .insert({ name, email, message });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}