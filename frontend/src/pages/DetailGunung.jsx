import { Link, useParams } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import StatusData from '../components/StatusData.jsx'

const img = (f) => import.meta.env.BASE_URL + 'img/' + f
const kapital = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Foto hanya tersedia untuk gunung tertentu (kunci = id gunung)
const FOTO = {
  2: { src: img('tangkuban.jpg'), alt: 'Kawah Gunung Tangkuban Parahu dikelilingi hutan hijau di Lembang', cap: 'Kawah Ratu, salah satu kawah utama di Tangkuban Parahu.' },
  4: { src: img('kawah putih.jpg'), alt: 'Danau kawah berwarna putih kehijauan di Kawah Putih Ciwidey', cap: 'Kawah Putih di kawasan Gunung Patuha, Ciwidey.' },
}

export default function DetailGunung() {
  const { id } = useParams()
  const { data: g, loading, error } = useApi(`/gunung/${id}`)

  if (loading || error) {
    return (
      <main className="halaman">
        <StatusData loading={loading} error={error} />
      </main>
    )
  }

  if (!g) {
    return (
      <main className="halaman">
        <h2>Gunung tidak ditemukan</h2>
        <p><Link to="/gunung">Kembali ke daftar gunung</Link></p>
      </main>
    )
  }

  const foto = FOTO[g.id]

  return (
    <main className="halaman">
      <nav aria-label="Breadcrumb">
        <p>
          <Link to="/rencanakan">Rencanakan Perjalanan Anda</Link> / <Link to="/gunung">Gunung</Link> / {g.nama}
        </p>
      </nav>

      <article>
        <header>
          <h2>{g.nama}</h2>
          <p>{g.lokasi}</p>
        </header>

        {foto && (
          <figure>
            <img src={foto.src} alt={foto.alt} width="480" height="320" />
            <figcaption>{foto.cap}</figcaption>
          </figure>
        )}

        <section>
          <h3 className="judul-polos">Deskripsi</h3>
          <p>{g.deskripsi}</p>
        </section>

        <section>
          <h3 className="judul-polos">Informasi Kunjungan</h3>
          <table className="tabel-info">
            <caption>Informasi praktis {g.nama} (perkiraan)</caption>
            <tbody>
              <tr><th scope="row">Jenis</th><td>Gunung</td></tr>
              <tr><th scope="row">Lokasi</th><td>{g.lokasi}</td></tr>
              <tr><th scope="row">Ketinggian</th><td>{g.ketinggian.toLocaleString('id-ID')} mdpl</td></tr>
              <tr><th scope="row">Perkiraan jarak dari Bandung</th><td>± {g.jarak} km</td></tr>
              <tr><th scope="row">Tingkat kesulitan akses</th><td>{kapital(g.tingkat)}</td></tr>
              <tr><th scope="row">Harga tiket dan jam buka</th><td>Berubah sewaktu-waktu, cek langsung ke pengelola</td></tr>
            </tbody>
          </table>
        </section>

        <section>
          <h3 className="judul-polos">Fasilitas</h3>
          <ul>
            <li>Area parkir</li>
            <li>Toilet</li>
            <li>Warung makan dan penjual oleh-oleh</li>
          </ul>
        </section>

        <section>
          <h3 className="judul-polos">Tips Berkunjung</h3>
          <ol>
            <li>Datang pagi hari agar kawah atau puncak belum tertutup kabut.</li>
            <li>Bawa jaket karena udara dingin di dataran tinggi.</li>
            <li>Ikuti pengumuman petugas karena aktivitas gunung bisa berubah.</li>
          </ol>
        </section>

        <footer className="kembali">
          <Link to="/gunung">Kembali ke daftar gunung</Link>
        </footer>
      </article>
    </main>
  )
}
