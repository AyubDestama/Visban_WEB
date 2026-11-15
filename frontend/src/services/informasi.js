// Mengambil data halaman Informasi dari file JSON statis (Mock API) lewat fetch.
const URL_INFORMASI = import.meta.env.BASE_URL + 'data/informasi.json'

export async function getInformasi(signal) {
  let res
  try {
    res = await fetch(URL_INFORMASI, { signal })
  } catch (e) {
    if (e.name === 'AbortError') throw e
    throw new Error('Tidak dapat terhubung untuk memuat informasi')
  }
  if (!res.ok) throw new Error(`Gagal memuat informasi (kode ${res.status})`)
  return res.json()
}
