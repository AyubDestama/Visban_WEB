import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import PesanGalat from '../components/PesanGalat.jsx'
import '../assets/detail-destinasi.css'

const kapital = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const FILTER_AWAL = { jenis: 'semua', jarak: 'semua', tingkat: 'semua' }

// Rentang jarak dari sebuah daftar destinasi, mis. "20 - 48 km"
function rentang(daftar) {
  if (daftar.length === 0) return '-'
  const j = daftar.map((d) => d.jarak)
  const min = Math.min(...j)
  const max = Math.max(...j)
  return min === max ? `${min} km` : `${min} - ${max} km`
}

export default function Rencanakan() {
  const gunungApi = useApi('/gunung')
  const pantaiApi = useApi('/pantai')
  const [filter, setFilter] = useState(FILTER_AWAL)

  const loading = gunungApi.loading || pantaiApi.loading
  const error = gunungApi.error || pantaiApi.error
  const gunung = useMemo(() => gunungApi.data ?? [], [gunungApi.data])
  const pantai = useMemo(() => pantaiApi.data ?? [], [pantaiApi.data])

  const ubah = (e) => setFilter((f) => ({ ...f, [e.target.name]: e.target.value }))
  const reset = () => setFilter(FILTER_AWAL)

  function muatUlang() {
    if (gunungApi.error) gunungApi.muatUlang()
    if (pantaiApi.error) pantaiApi.muatUlang()
  }

  // Gabungkan kedua jenis, lalu saring sesuai pilihan pengguna
  const rekomendasi = useMemo(() => {
    const semua = [
      ...gunung.map((g) => ({ ...g, jenis: 'gunung', info: `${g.ketinggian.toLocaleString('id-ID')} mdpl · ${kapital(g.tingkat)}` })),
      ...pantai.map((p) => ({ ...p, jenis: 'pantai', info: p.keunggulan })),
    ]
    return semua
      .filter((d) => filter.jenis === 'semua' || d.jenis === filter.jenis)
      .filter((d) => filter.jarak === 'semua' || d.jarak <= Number(filter.jarak))
      .filter((d) => filter.tingkat === 'semua' || (d.jenis === 'gunung' && d.tingkat === filter.tingkat))
      .sort((a, b) => a.jarak - b.jarak)
  }, [gunung, pantai, filter])

  const tingkatAktif = filter.jenis !== 'pantai'

  return (
    <main className="rencana">
      <h2>Rencanakan Perjalanan Anda</h2>
      <p>Bandung dikelilingi pegunungan, dan pesisir selatan Jawa Barat bisa dijangkau lewat perjalanan darat. Pilih preferensi perjalananmu, lalu lihat destinasi yang cocok sebelum menyusun rencana.</p>

      <nav aria-label="Jenis destinasi" className="filter-jenis" style={{ marginTop: 12 }}>
        <p>
          <strong>Lihat daftar:</strong>
          <Link to="/gunung">Gunung</Link>
          {' | '}
          <Link to="/pantai">Pantai</Link>
        </p>
      </nav>

      <section aria-labelledby="judul-perencana">
        <h3 id="judul-perencana" className="judul-bagian">Cari Destinasi yang Cocok</h3>

        {loading && <RencanaSkeleton />}

        {!loading && error && (
          <PesanGalat
            judul="Data destinasi belum bisa dimuat"
            pesan={`${error}. Periksa koneksi atau pastikan backend berjalan, lalu coba lagi.`}
            onCobaLagi={muatUlang}
          />
        )}

        {!loading && !error && (
          <>
            <form className="rencana-filter" onSubmit={(e) => e.preventDefault()} aria-label="Preferensi perjalanan">
              <div className="kolom">
                <label htmlFor="jenis">Jenis destinasi</label>
                <select id="jenis" name="jenis" value={filter.jenis} onChange={(e) => setFilter({ ...filter, jenis: e.target.value, tingkat: e.target.value === 'pantai' ? 'semua' : filter.tingkat })}>
                  <option value="semua">Gunung dan pantai</option>
                  <option value="gunung">Gunung</option>
                  <option value="pantai">Pantai</option>
                </select>
              </div>

              <div className="kolom">
                <label htmlFor="jarak">Jarak maksimal dari Bandung</label>
                <select id="jarak" name="jarak" value={filter.jarak} onChange={ubah}>
                  <option value="semua">Semua jarak</option>
                  <option value="30">Sampai 30 km</option>
                  <option value="50">Sampai 50 km</option>
                  <option value="150">Sampai 150 km</option>
                </select>
              </div>

              <div className="kolom">
                <label htmlFor="tingkat">Tingkat kesulitan gunung</label>
                <select id="tingkat" name="tingkat" value={filter.tingkat} onChange={ubah} disabled={!tingkatAktif} aria-describedby="tingkat-bantuan">
                  <option value="semua">Semua tingkat</option>
                  <option value="mudah">Mudah</option>
                  <option value="sedang">Sedang</option>
                  <option value="sulit">Sulit</option>
                </select>
                <p id="tingkat-bantuan" className="teks-bantuan">
                  {tingkatAktif ? 'Hanya berlaku untuk gunung.' : 'Tidak berlaku untuk pantai.'}
                </p>
              </div>

              <button type="button" className="tombol tombol-garis" onClick={reset}>Atur ulang</button>
            </form>

            <p className="rencana-hasil" role="status" aria-live="polite">
              Ditemukan {rekomendasi.length} destinasi
              {filter.jenis !== 'semua' ? ` ${filter.jenis}` : ''}, diurutkan dari yang terdekat.
            </p>

            {rekomendasi.length > 0 ? (
              <ul className="rencana-daftar">
                {rekomendasi.map((d) => (
                  <li key={`${d.jenis}-${d.id}`} className="rencana-kartu">
                    <p className="rencana-lencana">{kapital(d.jenis)}</p>
                    <h4>{d.nama}</h4>
                    <p className="rencana-lokasi">{d.lokasi} · ± {d.jarak} km dari Bandung</p>
                    <p>{d.info}</p>
                    <Link to={`/${d.jenis}/${d.id}`} aria-label={`Lihat detail ${d.nama}`}>Lihat detail dan buat rencana</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rencana-kosong">
                <p>Belum ada destinasi yang cocok dengan pilihan tersebut. Coba perlebar jarak atau ganti tingkat kesulitan.</p>
                <button type="button" className="tombol tombol-garis" onClick={reset}>Tampilkan semua</button>
              </div>
            )}
          </>
        )}
      </section>

      <section>
        <h3 className="judul-bagian">Jenis Destinasi yang Bisa Dikunjungi</h3>

        <article>
          <h4>Gunung</h4>
          <p>Kawasan Bandung Raya punya banyak gunung dan kawah yang dekat dari kota, seperti Tangkuban Parahu di Lembang, Kawah Putih di Ciwidey, Manglayang, hingga Papandayan di Garut. Cocok untuk wisata kawah, berkemah, dan pendakian dari ringan sampai menantang.</p>
          <p><strong>Cocok untuk:</strong> pendaki, pecinta fotografi alam, keluarga yang ingin udara sejuk, dan petualang.</p>
        </article>

        <article>
          <h4>Pantai</h4>
          <p>Pantai terdekat dari Bandung berada di pesisir selatan Jawa Barat, yaitu di Garut, Cianjur, Sukabumi, dan Pangandaran. Cocok untuk menikmati laut lepas, ombak besar, dan matahari terbenam. Perjalanan darat memakan waktu beberapa jam, jadi sebaiknya menginap.</p>
          <p><strong>Cocok untuk:</strong> liburan akhir pekan, keluarga, pasangan, dan pecinta pemandangan laut.</p>
        </article>

        {!loading && !error && (
          <table>
            <caption>Perbandingan singkat jenis destinasi (dihitung dari data destinasi)</caption>
            <thead>
              <tr>
                <th scope="col">Jenis</th>
                <th scope="col">Aktivitas Utama</th>
                <th scope="col">Jumlah Destinasi</th>
                <th scope="col">Jarak dari Bandung</th>
                <th scope="col">Tingkat Fisik</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gunung</td>
                <td>Wisata kawah, mendaki, berkemah</td>
                <td>{gunung.length}</td>
                <td>{rentang(gunung)}</td>
                <td>Ringan hingga sulit</td>
              </tr>
              <tr>
                <td>Pantai</td>
                <td>Menikmati pantai, sunset, kuliner laut</td>
                <td>{pantai.length}</td>
                <td>{rentang(pantai)}</td>
                <td>Ringan</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}

// Kerangka loading yang meniru bentuk kartu hasil
function RencanaSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <p className="teks-bantuan">Memuat destinasi…</p>
      <ul className="rencana-daftar" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <li key={n} className="rencana-kartu rencana-skeleton">
            <span className="sk sk-pendek" />
            <span className="sk sk-judul" />
            <span className="sk" />
            <span className="sk sk-sedang" />
          </li>
        ))}
      </ul>
    </div>
  )
}