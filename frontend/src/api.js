import gunungLokal from './data/gunung.json'
import pantaiLokal from './data/pantai.json'

// Alamat backend. Saat dev, '/api' diteruskan oleh proxy Vite ke http://localhost:3000.
// Saat produksi, isi VITE_API_URL (mis. https://api.contoh.com) di .env.
const BASE = (import.meta.env.VITE_API_URL || '') + '/api'

// Data cadangan: dipakai jika backend tidak aktif, supaya halaman tetap bisa dibuka.
const LOKAL = { gunung: gunungLokal, pantai: pantaiLokal }

function dariLokal(path) {
  const [, koleksi, id] = path.split('/')
  const data = LOKAL[koleksi]
  if (!data) throw new Error('Data tidak tersedia')
  if (id === undefined) return data
  return data.find((x) => x.id === Number(id)) ?? null
}

export async function getJSON(path, signal) {
  try {
    const res = await fetch(BASE + path, { signal })
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Gagal memuat data (${res.status})`)
    return await res.json()
  } catch (e) {
    if (e.name === 'AbortError') throw e
    return dariLokal(path) // backend mati / tidak terjangkau
  }
}
