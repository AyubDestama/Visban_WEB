import { Link, NavLink } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import StatusData from '../components/StatusData.jsx'

const kapital = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export default function Gunung() {
  const { data: gunung = [], loading, error } = useApi('/gunung')

  return (
    <main className="halaman">
      <nav aria-label="Breadcrumb">
        <p><Link to="/rencanakan">Rencanakan Perjalanan Anda</Link> &gt; Gunung</p>
      </nav>

      <h2>Destinasi Gunung</h2>
      <p>Gunung dan kawah di Bandung Raya dan sekitarnya yang dapat dikunjungi dalam sehari.</p>

      <nav aria-label="Jenis destinasi" className="filter-jenis">
        <p>
          <strong>Jenis:</strong>
          <NavLink to="/pantai" className={({ isActive }) => (isActive ? 'active' : undefined)}>Pantai</NavLink>
          {' | '}
          <NavLink to="/gunung" className={({ isActive }) => (isActive ? 'active' : undefined)}>Gunung</NavLink>
        </p>
      </nav>

      <section>
        <h3 className="judul-bagian">Daftar Gunung</h3>

        <StatusData loading={loading} error={error} />

        {!loading && !error && (
        <table>
          <caption>Daftar destinasi gunung di sekitar Bandung (data contoh, jarak dan tingkat kesulitan perkiraan)</caption>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Lokasi</th>
              <th scope="col">Ketinggian</th>
              <th scope="col">Perkiraan Jarak dari Bandung</th>
              <th scope="col">Tingkat Kesulitan</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {gunung.map((g, i) => (
              <tr key={g.id}>
                <th scope="row">{i + 1}</th>
                <td>{g.nama}</td>
                <td>{g.lokasi}</td>
                <td>{g.ketinggian.toLocaleString('id-ID')} mdpl</td>
                <td>± {g.jarak} km</td>
                <td>{kapital(g.tingkat)}</td>
                <td><Link to={`/gunung/${g.id}`}>Detail</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </section>
    </main>
  )
}
