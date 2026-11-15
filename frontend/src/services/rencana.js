// Mock API: JSONPlaceholder menerima POST dan membalas dengan data + id baru.
// Data tidak benar-benar disimpan (hanya simulasi).
const URL_RENCANA = 'https://jsonplaceholder.typicode.com/posts'

export async function kirimRencana(rencana) {
  let res
  try {
    res = await fetch(URL_RENCANA, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(rencana),
    })
  } catch {
    throw new Error('Rencana gagal dikirim karena tidak ada koneksi internet. Coba lagi.')
  }
  if (!res.ok) throw new Error(`Server menolak permintaan (kode ${res.status}). Coba lagi beberapa saat lagi.`)
  return res.json()
}
