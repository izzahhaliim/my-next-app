import { favorites } from "@/lib/db";
import {
  addFavorite,
  removeFavorite,
} from "@/lib/services/favoriteService";

beforeEach(() => {
  favorites.length = 0;
});

describe("favoriteService", () => {
  // Test 1: Data valid berhasil disimpan
  test("addFavorite berhasil menyimpan data valid", () => {
    const result = addFavorite({ id: 1, name: "Ayu" });

    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(favorites).toHaveLength(1);
  });

  // Test 2: Menolak data tanpa name
  test("addFavorite menolak data tanpa name", () => {
    const result = addFavorite({ id: 2 });

    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
    expect(favorites).toHaveLength(0);
  });

  // Test 3: Menolak ID yang sudah ada
  test("addFavorite menolak id yang sudah ada", () => {
    addFavorite({ id: 3, name: "Ayu" });

    const result = addFavorite({ id: 3, name: "Budi" });

    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
    expect(favorites).toHaveLength(1);
  });

  // Test 4: Berhasil menghapus data
  test("removeFavorite berhasil menghapus data yang ada", () => {
    addFavorite({ id: 4, name: "Ayu" });

    const result = removeFavorite(4);

    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
    expect(favorites).toHaveLength(0);
  });

  // Test 5: Gagal jika ID tidak ditemukan
  test("removeFavorite gagal kalau id tidak ditemukan", () => {
    const result = removeFavorite(999);

    expect(result.success).toBe(false);
    expect(result.status).toBe(404);
  });
});