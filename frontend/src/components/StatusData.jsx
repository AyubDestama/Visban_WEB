// Menampilkan status muat / galat; mengembalikan null jika data siap.
export default function StatusData({ loading, error }) {
  if (loading) return <p role="status">Memuat data…</p>
  if (error) return <p role="alert">{error}. Pastikan backend sedang berjalan.</p>
  return null
}
