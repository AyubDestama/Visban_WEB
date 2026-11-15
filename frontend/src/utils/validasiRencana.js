// Validasi form rencana kunjungan gunung/pantai (client-side).
// Mengembalikan objek { namaField: 'pesan galat' } untuk field yang belum benar.

export const BATAS_CATATAN = 300

function hariIni() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

// 'YYYY-MM-DD' menurut zona waktu lokal (dipakai untuk atribut min/max input date)
export function formatTanggal(d) {
  const z = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`
}

export function batasTanggal() {
  const min = hariIni()
  const max = hariIni()
  max.setFullYear(max.getFullYear() + 1)
  return { min: formatTanggal(min), max: formatTanggal(max) }
}

export function validasiRencana(v) {
  const galat = {}

  const nama = v.nama.trim()
  if (!nama) galat.nama = 'Nama wajib diisi.'
  else if (nama.length < 3) galat.nama = 'Nama minimal 3 huruf.'
  else if (!/^[A-Za-zÀ-ɏ' .]+$/.test(nama)) galat.nama = 'Nama hanya boleh berisi huruf, spasi, titik, atau apostrof.'

  const email = v.email.trim()
  if (!email) galat.email = 'Email wajib diisi.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) galat.email = 'Format email belum benar, contoh: nama@email.com.'

  const hp = v.noHp.replace(/[\s-]/g, '')
  if (!hp) galat.noHp = 'Nomor HP wajib diisi.'
  else if (!/^08\d{8,11}$/.test(hp)) galat.noHp = 'Nomor HP diawali 08 dan berisi 10-13 angka.'

  if (!v.tanggal) {
    galat.tanggal = 'Tanggal wajib dipilih.'
  } else {
    const { min, max } = batasTanggal()
    if (v.tanggal < min) galat.tanggal = 'Tanggal tidak boleh sebelum hari ini.'
    else if (v.tanggal > max) galat.tanggal = 'Tanggal maksimal 1 tahun dari sekarang.'
  }

  const jumlah = Number(v.jumlah)
  if (v.jumlah === '') galat.jumlah = 'Jumlah orang wajib diisi.'
  else if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 20) galat.jumlah = 'Jumlah orang harus 1 sampai 20.'

  if (v.catatan.length > BATAS_CATATAN) galat.catatan = `Catatan maksimal ${BATAS_CATATAN} karakter.`

  if (!v.setuju) galat.setuju = 'Centang pernyataan ini sebelum mengirim.'

  return galat
}
