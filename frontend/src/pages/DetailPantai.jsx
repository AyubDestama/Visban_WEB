import { Link, useParams } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import PesanGalat from '../components/PesanGalat.jsx'
import SkeletonDetail from '../components/detail/SkeletonDetail.jsx'
import InfoCuaca from '../components/detail/InfoCuaca.jsx'
import '../assets/detail-destinasi.css'

const img = (f) => import.meta.env.BASE_URL + 'img/' + f

// Foto hanya tersedia untuk pantai tertentu. Kuncinya nama pantai (bukan id)
// supaya foto tidak tertukar kalau urutan/id data berubah.
const FOTO = {
  'Pantai Santolo': { src: img('pantai-santolo.jpg'), alt: 'Hamparan pasir dan ombak laut selatan di Pantai Santolo, Garut', cap: 'Suasana Pantai Santolo di pesisir selatan Garut.' },
}

export default function DetailPantai() {
  const { id } = useParams()
  const { data: p, loading, error, muatUlang } = useApi(`/pantai/${id}`)

  // 1) Sedang memuat: tampilkan kerangka (skeleton)
  if (loading) {
    return (
      <main className="halaman">
        <SkeletonDetail label="Memuat detail pantai..." />
      </main>
    )
  }

  // 2) Gagal memuat: pesan jelas + tombol coba lagi
  if (error) {
    return (
      <main className="halaman">
        <PesanGalat judul="Detail pantai gagal dimuat" pesan={error} onCobaLagi={muatUlang} />
        <p className="kembali"><Link to="/pantai">Kembali ke daftar pantai</Link></p>
      </main>
    )
  }

  // 3) Data tidak ada (404)
  if (!p) {
    return (
      <main className="halaman">
        <h2>Pantai tidak ditemukan</h2>
        <p>Pantai dengan nomor {id} tidak ada di daftar. Mungkin datanya sudah dihapus atau alamatnya salah ketik.</p>
        <p className="kembali"><Link to="/pantai">Kembali ke daftar pantai</Link></p>
      </main>
    )
  }

  // 4) Data siap
  const foto = FOTO[p.nama]

  return (
    <main className="halaman">
      <nav aria-label="Breadcrumb">
        <p>
          <Link to="/rencanakan">Rencanakan Perjalanan Anda</Link> / <Link to="/pantai">Pantai</Link> / {p.nama}
        </p>
      </nav>

      <article>
        <header>
          <h2>{p.nama}</h2>
          <p>{p.lokasi}</p>
        </header>

        {foto && (
          <figure>
            <img src={foto.src} alt={foto.alt} width="480" height="320" />
            <figcaption>{foto.cap}</figcaption>
          </figure>
        )}

        <section>
          <h3 className="judul-polos">Deskripsi</h3>
          <p>{p.deskripsi}</p>
        </section>

        <section>
          <h3 className="judul-polos">Informasi Kunjungan</h3>
          <table className="tabel-info">
            <caption>Informasi praktis {p.nama} (perkiraan)</caption>
            <tbody>
              <tr><th scope="row">Jenis</th><td>Pantai</td></tr>
              <tr><th scope="row">Lokasi</th><td>{p.lokasi}</td></tr>
              <tr><th scope="row">Perkiraan jarak dari Bandung</th><td>± {p.jarak} km</td></tr>
              <tr><th scope="row">Keunggulan</th><td>{p.keunggulan}</td></tr>
              <tr><th scope="row">Tingkat kesulitan akses</th><td>Sedang (jarak jauh, jalur berkelok)</td></tr>
              <tr><th scope="row">Harga tiket dan jam buka</th><td>Berubah sewaktu-waktu, cek langsung ke pengelola</td></tr>
            </tbody>
          </table>
        </section>

        {p.lat != null && p.lon != null && <InfoCuaca nama={p.nama} lat={p.lat} lon={p.lon} />}

        <section>
          <h3 className="judul-polos">Fasilitas</h3>
          <ul>
            <li>Area parkir</li>
            <li>Warung makan hidangan laut</li>
            <li>Penginapan di sekitar pantai</li>
          </ul>
        </section>

        <section>
          <h3 className="judul-polos">Tips Berkunjung</h3>
          <ol>
            <li>Berangkat pagi dari Bandung karena perjalanan memakan waktu beberapa jam.</li>
            <li>Hati-hati saat berenang karena ombak laut selatan besar dan berarus kuat.</li>
            <li>Pertimbangkan menginap agar tidak terburu-buru.</li>
          </ol>
        </section>

        <footer className="kembali">
          <Link to="/pantai">Kembali ke daftar pantai</Link>
        </footer>
      </article>
    </main>
  )
}
