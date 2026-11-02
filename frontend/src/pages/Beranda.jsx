import { Link } from 'react-router-dom'

const img = (f) => import.meta.env.BASE_URL + 'img/' + f

export default function Beranda() {
  return (
    <main>
      {/* PETA INTERAKTIF */}
      <section className="peta" aria-labelledby="judul-peta">
        <p className="peta-kicker">Temukan Destinasi Terbaik</p>
        <h2 id="judul-peta" className="peta-judul">Peta Interaktif Provinsi Indonesia</h2>
        <p className="peta-deskripsi">Klik peta interaktif di bawah ini untuk mulai eksplor destinasi wisata terbaik dari setiap provinsi di Indonesia.</p>
        <div className="peta-wrapper">
          <object data={img('peta-indonesia.svg')} type="image/svg+xml" aria-label="Peta interaktif provinsi Indonesia"></object>
        </div>
      </section>

      {/* HERO */}
      <section className="hero-section" aria-labelledby="judul-hero">
        <figure className="hero-figure">
          <img src={img('tangkuban.jpg')} alt="Kawah Gunung Tangkuban Parahu dikelilingi hutan hijau di Lembang, Bandung Barat" />
          <figcaption>Gunung Tangkuban Parahu, Lembang, Bandung Barat.</figcaption>
        </figure>
        <div className="hero-teks">
          <h2 id="judul-hero">Wonderful Indonesia: Bandung dan Sekitarnya</h2>
          <p>Jelajahi gunung dan pantai di sekitar Bandung, Jawa Barat.</p>
          <p><Link to="/rencanakan" className="card-link">Rencanakan Perjalanan Anda &rarr;</Link></p>
        </div>
      </section>

      {/* DESTINASI POPULER */}
      <section className="popular-section" aria-labelledby="judul-populer">
        <h2 id="judul-populer">Destinasi Populer</h2>
        <div className="card-grid">
          <article className="card">
            <img src={img('tangkuban.jpg')} alt="Kawah Ratu di Gunung Tangkuban Parahu" />
            <div className="card-body">
              <h3>Gunung Tangkuban Parahu</h3>
              <p>Gunung berapi di Lembang dengan kawah yang bisa dikunjungi dari tepi jalan.</p>
              <Link to="/gunung/2" className="card-link">Lihat detail</Link>
            </div>
          </article>

          <article className="card">
            <img src={img('kawah putih.jpg')} alt="Danau kawah berwarna putih kehijauan di Kawah Putih Ciwidey" />
            <div className="card-body">
              <h3>Kawah Putih (Gunung Patuha)</h3>
              <p>Danau kawah di Ciwidey dengan air berwarna putih kehijauan.</p>
              <Link to="/gunung/4" className="card-link">Lihat detail</Link>
            </div>
          </article>

          <article className="card">
            <img src={img('pantai-santolo.jpg')} alt="Pantai berpasir dengan ombak laut selatan di Pantai Santolo, Garut" />
            <div className="card-body">
              <h3>Pantai Santolo</h3>
              <p>Pantai di pesisir selatan Garut, salah satu pantai yang bisa dijangkau dari Bandung.</p>
              <Link to="/pantai/2" className="card-link">Lihat detail</Link>
            </div>
          </article>
        </div>
      </section>

      <aside className="info-box" aria-labelledby="judul-info">
        <h2 id="judul-info">Perlu Diketahui</h2>
        <p>Bandung berada di dataran tinggi sehingga tidak punya pantai sendiri. Pantai terdekat ada di pesisir selatan Jawa Barat dan perlu perjalanan darat beberapa jam.</p>
      </aside>
    </main>
  )
}
