import useAsync from '../../hooks/useAsync.js'
import { ambilCuaca } from '../../services/cuaca.js'
import PesanGalat from '../PesanGalat.jsx'

const formatHari = (tanggal, i) =>
  i === 0
    ? 'Hari ini'
    : new Date(`${tanggal}T00:00:00`).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })

// Cuaca terkini + prakiraan 3 hari dari Public API Open-Meteo
export default function InfoCuaca({ nama, lat, lon }) {
  const { data, loading, error, muatUlang } = useAsync((signal) => ambilCuaca(lat, lon, signal), `${lat},${lon}`)

  return (
    <section className="cuaca" aria-labelledby="judul-cuaca">
      <h3 id="judul-cuaca" className="judul-polos">Cuaca di Sekitar {nama}</h3>

      {loading && (
        <div className="cuaca-grid" role="status" aria-busy="true">
          <span className="sr-only">Memuat data cuaca...</span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="kartu-cuaca">
              <div className="skeleton" style={{ width: '50%', height: 14 }} />
              <div className="skeleton" style={{ width: '40%', height: 28, marginTop: 12 }} />
              <div className="skeleton" style={{ width: '70%', height: 14, marginTop: 12 }} />
            </div>
          ))}
        </div>
      )}

      {error && <PesanGalat judul="Cuaca belum bisa ditampilkan" pesan={error} onCobaLagi={muatUlang} />}

      {data && (
        <>
          <div className="cuaca-grid">
            <div className="kartu-cuaca kartu-cuaca-utama">
              <p className="kartu-cuaca-label">Sekarang</p>
              <p className="kartu-cuaca-suhu">{data.sekarang.suhu}°C</p>
              <p>{data.sekarang.kondisi}</p>
              <p className="kartu-cuaca-detail">
                Kelembapan {data.sekarang.kelembapan}%, angin {data.sekarang.angin} km/jam
              </p>
            </div>

            {data.harian.map((h, i) => (
              <div key={h.tanggal} className="kartu-cuaca">
                <p className="kartu-cuaca-label">{formatHari(h.tanggal, i)}</p>
                <p className="kartu-cuaca-suhu">
                  {h.maks}° <span>/ {h.min}°C</span>
                </p>
                <p>{h.kondisi}</p>
                <p className="kartu-cuaca-detail">Peluang hujan {h.peluangHujan}%</p>
              </div>
            ))}
          </div>
          <p className="cuaca-sumber">
            Sumber: <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo</a>, diperbarui
            pukul {data.sekarang.waktu.slice(11, 16)} WIB.{' '}
            <button type="button" className="tombol-teks" onClick={muatUlang}>Perbarui</button>
          </p>
        </>
      )}
    </section>
  )
}
