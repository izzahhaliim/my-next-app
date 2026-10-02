import { favorites } from "@/lib/db";

// PATCH
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const favorite = favorites.find((f) => f.id === Number(id));

  if (!favorite) {
    return Response.json(
      { error: "Favorite tidak ditemukan" },
      { status: 404 }
    );
  }

  if (!body.note) {
    return Response.json(
      { error: "note wajib diisi" },
      { status: 400 }
    );
  }

  favorite.note = body.note;

  return Response.json(favorite);
}

// DELETE
export async function DELETE(request, { params }) {
  const { id } = await params;

  const index = favorites.findIndex((f) => f.id === Number(id));

  if (index === -1) {
    return Response.json(
      { error: "Data tidak ditemukan" },
      { status: 404 }
    );
  }

  favorites.splice(index, 1);

  return Response.json({
    message: "Berhasil dihapus",
  });
}