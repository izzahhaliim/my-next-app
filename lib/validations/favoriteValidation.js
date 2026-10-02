export function validateFavoriteInput(data) {
if (!data.id || !data.name) {
return {
valid: false,
error: "id dan name wajib diisi",
};
}

return { valid: true };
}