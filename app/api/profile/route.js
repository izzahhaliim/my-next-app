export async function GET() {
  return Response.json({
    name: "Izza",
    role: "peserta bootcamp",
    favoriteTech: ["React", "Next.js"]
  });
}