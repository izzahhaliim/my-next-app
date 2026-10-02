"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const id = Number(formData.get("id"));

  const index = messages.findIndex((message) => message.id === id);

  if (index !== -1) {
    messages.splice(index, 1);
  }

  revalidatePath("/messages");
}