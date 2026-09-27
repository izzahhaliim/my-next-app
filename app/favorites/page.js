"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import UserCard from "@/components/UserCard";

export default function FavoritesPage() {
  const { favorites } = useUser();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          Favorite
        </p>

        <h1 className="text-4xl font-bold">
          My Favorite Users
        </h1>

        <p className="mt-2 text-muted-foreground">
          Data ini diambil langsung dari FavoriteContext.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">
            Belum ada favorite
          </h2>

          <p className="mt-2 text-muted-foreground">
            Tambahkan user ke favorite dari halaman Users.
          </p>

          <Link
            href="/users"
            className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
          >
            Browse Users
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </main>
  );
}