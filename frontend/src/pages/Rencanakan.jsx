import { Link } from 'react-router-dom'

export default function Rencanakan() {
  return (
    <main className="rencana">
      <h2>Rencanakan Perjalanan Anda</h2>
      <p>Bandung dikelilingi pegunungan, dan pesisir selatan Jawa Barat bisa dijangkau lewat perjalanan darat. Kenali dulu jenis destinasi yang bisa kamu kunjungi sebelum menyusun rencana.</p>

      <nav aria-label="Jenis destinasi" className="filter-jenis" style={{ marginTop: 12 }}>
        <p>
          <strong>Lihat daftar:</strong>
          <Link to="/gunung">Gunung</Link>
          {' | '}
          <Link to="/pantai">Pantai</Link>
        </p>
      </nav>

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

        <table>
          <caption>Perbandingan singkat jenis destinasi (perkiraan)</caption>
          <thead>
            <tr>
              <th scope="col">Jenis</th>
              <th scope="col">Aktivitas Utama</th>
              <th scope="col">Perkiraan Jarak dari Bandung</th>
              <th scope="col">Tingkat Fisik</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gunung</td>
              <td>Wisata kawah, mendaki, berkemah</td>
              <td>25 - 75 km (sekitar 1 - 2,5 jam)</td>
              <td>Ringan hingga sedang</td>
            </tr>
            <tr>
              <td>Pantai</td>
              <td>Menikmati pantai, sunset, kuliner laut</td>
              <td>145 - 280 km (sekitar 4 - 7 jam)</td>
              <td>Ringan</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}
