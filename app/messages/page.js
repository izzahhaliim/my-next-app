import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteMessageAction } from "./actions";

export default async function MessagesPage() {
  await connection();

  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">Messages</h1>

        <p className="mt-4 text-red-500">
          Error: {error.message}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold">Messages</h1>

      {messages.length === 0 ? (
        <p className="mt-4 text-muted-foreground">
          Belum ada pesan masuk.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{msg.name}</h2>

                  <p className="text-sm text-muted-foreground">
                    {msg.email}
                  </p>

                  <p className="mt-3">{msg.message}</p>
                </div>

                <form action={deleteMessageAction}>
                  <input
                    type="hidden"
                    name="id"
                    value={msg.id}
                  />

                  <button
                    type="submit"
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}