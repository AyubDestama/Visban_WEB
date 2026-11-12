// Public API: Open-Meteo (https://open-meteo.com), gratis dan tanpa API key.
const URL_CUACA = 'https://api.open-meteo.com/v1/forecast'

// Arti kode cuaca WMO yang dipakai Open-Meteo
export function artiKodeCuaca(kode) {
  if (kode === 0) return 'Cerah'
  if (kode === 1) return 'Cerah berawan'
  if (kode === 2) return 'Berawan'
  if (kode === 3) return 'Mendung'
  if (kode === 45 || kode === 48) return 'Berkabut'
  if (kode >= 51 && kode <= 57) return 'Gerimis'
  if (kode === 61 || kode === 80) return 'Hujan ringan'
  if (kode === 63 || kode === 81) return 'Hujan sedang'
  if (kode === 65 || kode === 66 || kode === 67 || kode === 82) return 'Hujan lebat'
  if (kode >= 95) return 'Badai petir'
  return 'Tidak diketahui'
}

// Mengambil cuaca saat ini + prakiraan 3 hari untuk satu titik koordinat
export async function ambilCuaca(lat, lon, signal) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'Asia/Jakarta',
    forecast_days: 3,
  })

  let res
  try {
    res = await fetch(`${URL_CUACA}?${params}`, { signal })
  } catch (e) {
    if (e.name === 'AbortError') throw e
    throw new Error('Tidak bisa terhubung ke layanan cuaca. Periksa koneksi internet kamu.')
  }
  if (!res.ok) throw new Error(`Layanan cuaca sedang bermasalah (kode ${res.status}). Coba lagi beberapa saat lagi.`)

  const d = await res.json()
  return {
    sekarang: {
      waktu: d.current.time,
      suhu: Math.round(d.current.temperature_2m),
      kelembapan: d.current.relative_humidity_2m,
      angin: Math.round(d.current.wind_speed_10m),
      kondisi: artiKodeCuaca(d.current.weather_code),
    },
    harian: d.daily.time.map((tanggal, i) => ({
      tanggal,
      kondisi: artiKodeCuaca(d.daily.weather_code[i]),
      maks: Math.round(d.daily.temperature_2m_max[i]),
      min: Math.round(d.daily.temperature_2m_min[i]),
      peluangHujan: d.daily.precipitation_probability_max[i],
    })),
  }
}
