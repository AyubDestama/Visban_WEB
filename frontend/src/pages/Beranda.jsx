import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import PesanGalat from '../components/PesanGalat.jsx'
import '../assets/detail-destinasi.css'
import '../assets/beranda.css'

const img = (f) => import.meta.env.BASE_URL + 'img/' + f

// Destinasi unggulan: id mengacu ke data API, gambar & alt disiapkan di sini.
const UNGGULAN = [
  { jenis: 'gunung', id: 2, gambar: 'tangkuban.jpg', alt: 'Kawah Ratu di Gunung Tangkuban Parahu' },
  { jenis: 'gunung', id: 8, gambar: 'kawah putih.jpg', alt: 'Danau kawah berwarna putih kehijauan di Kawah Putih, Ciwidey' },
  { jenis: 'pantai', id: 1, gambar: 'pantai-santolo.jpg', alt: 'Pantai berpasir dengan ombak laut selatan Garut' },
]

const MENU = [
  { to: '/gunung', judul: 'Gunung', teks: 'Jalur pendakian dan kawah di sekitar Bandung.' },
  { to: '/pantai', judul: 'Pantai', teks: 'Pantai pesisir selatan Jawa Barat.' },
  { to: '/rencanakan', judul: 'Rencanakan', teks: 'Filter destinasi sesuai kebutuhan Anda.' },
  { to: '/informasi', judul: 'Informasi', teks: 'Tips perjalanan, kontak darurat, dan FAQ.' },
]

function KartuSkeleton() {
  return (
    <li className="kartu-destinasi" aria-hidden="true">
      <div className="skeleton kartu-skeleton-gambar" />
      <div className="kartu-isi">
        <div className="skeleton kartu-skeleton-baris" />
        <div className="skeleton kartu-skeleton-baris kartu-skeleton-pendek" />
      </div>
    </li>
  )
}

export default function Beranda() {
  const gunung = useApi('/gunung')
  const pantai = useApi('/pantai')

  const loading = gunung.loading || pantai.loading
  const error = gunung.error || pantai.error
  const muatUlang = () => {
    gunung.muatUlang()
    pantai.muatUlang()
  }

  const koleksi = { gunung: gunung.data ?? [], pantai: pantai.data ?? [] }
  const kartu = UNGGULAN.map((u) => ({ ...u, data: koleksi[u.jenis].find((d) => d.id === u.id) })).filter((k) => k.data)

  return (
    <main id="konten-utama" className="beranda">
      {/* HERO */}
      <section className="hero" aria-labelledby="judul-hero">
        <img className="hero-gambar" src={img('tangkuban.jpg')} alt="" />
        <div className="hero-isi">
          <p className="kicker">Wonderful Indonesia</p>
          <h2 id="judul-hero">Jelajahi Gunung dan Pantai di Sekitar Bandung</h2>
          <p className="hero-deskripsi">
            Temukan destinasi, cek cuaca, dan susun rencana kunjungan Anda dalam satu tempat.
          </p>
          <div className="hero-aksi">
            <Link to="/rencanakan" className="tombol">Rencanakan Perjalanan</Link>
            <Link to="/gunung" className="tombol tombol-terang">Lihat Destinasi</Link>
          </div>
        </div>
        <dl className="statistik" aria-label="Ringkasan data destinasi">
          <div>
            <dt>Gunung</dt>
            <dd>{gunung.loading ? '…' : gunung.data ? gunung.data.length : '–'}</dd>
          </div>
          <div>
            <dt>Pantai</dt>
            <dd>{pantai.loading ? '…' : pantai.data ? pantai.data.length : '–'}</dd>
          </div>
          <div>
            <dt>Cuaca langsung</dt>
            <dd>Open-Meteo</dd>
          </div>
        </dl>
      </section>

      {/* MENU CEPAT */}
      <nav className="menu-cepat" aria-label="Jelajahi situs">
        <ul>
          {MENU.map((m) => (
            <li key={m.to}>
              <Link to={m.to}>
                <strong>{m.judul}</strong>
                <span>{m.teks}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* DESTINASI POPULER (dari API) */}
      <section className="populer" aria-labelledby="judul-populer" aria-busy={loading}>
        <div className="bagian-kepala">
          <h2 id="judul-populer">Destinasi Populer</h2>
          <p>Pilihan yang paling sering dikunjungi dari Bandung.</p>
        </div>

        {error ? (
          <PesanGalat judul="Data destinasi belum bisa dimuat" pesan={error} onCobaLagi={muatUlang} />
        ) : (
          <ul className="daftar-kartu" role="list">
            {loading
              ? UNGGULAN.map((u) => <KartuSkeleton key={u.jenis + u.id} />)
              : kartu.map(({ jenis, id, gambar, alt, data }) => (
                  <li key={jenis + id} className="kartu-destinasi">
                    <img src={img(gambar)} alt={alt} loading="lazy" width="600" height="400" />
                    <div className="kartu-isi">
                      <span className="lencana">{jenis === 'gunung' ? 'Gunung' : 'Pantai'}</span>
                      <h3>{data.nama}</h3>
                      <p className="kartu-lokasi">{data.lokasi} · ± {data.jarak} km dari Bandung</p>
                      <p className="kartu-teks">{data.deskripsi}</p>
                      <Link to={`/${jenis}/${id}`} className="tautan-detail">
                        Lihat detail<span className="sr-only">: {data.nama}</span> &rarr;
                      </Link>
                    </div>
                  </li>
                ))}
          </ul>
        )}
      </section>

      {/* PETA */}
      <section className="peta" aria-labelledby="judul-peta">
        <div className="bagian-kepala">
          <h2 id="judul-peta">Peta Interaktif Indonesia</h2>
          <p>Klik provinsi pada peta untuk mulai menjelajahi destinasi.</p>
        </div>
        <div className="peta-wrapper">
          <object data={img('peta-indonesia.svg')} type="image/svg+xml" aria-label="Peta interaktif provinsi Indonesia" />
        </div>
      </section>

      <aside className="catatan" aria-labelledby="judul-info">
        <h2 id="judul-info">Perlu Diketahui</h2>
        <p>
          Bandung berada di dataran tinggi sehingga tidak punya pantai sendiri. Pantai terdekat ada di
          pesisir selatan Jawa Barat dan membutuhkan perjalanan darat beberapa jam.
        </p>
      </aside>
    </main>
  )
}