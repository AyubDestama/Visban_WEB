import { Link, NavLink } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import StatusData from '../components/StatusData.jsx'

export default function Pantai() {
  const { data: pantai = [], loading, error } = useApi('/pantai')

  return (
    <main className="halaman">
      <nav aria-label="Breadcrumb">
        <p><Link to="/rencanakan">Rencanakan Perjalanan Anda</Link> &gt; Pantai</p>
      </nav>

      <h2>Destinasi Pantai</h2>
      <p>Bandung tidak punya pantai sendiri. Daftar berikut adalah pantai di pesisir selatan Jawa Barat yang paling sering dituju dari Bandung.</p>

      <nav aria-label="Jenis destinasi" className="filter-jenis">
        <p>
          <strong>Jenis:</strong>
          <NavLink to="/pantai" className={({ isActive }) => (isActive ? 'active' : undefined)}>Pantai</NavLink>
          {' | '}
          <NavLink to="/gunung" className={({ isActive }) => (isActive ? 'active' : undefined)}>Gunung</NavLink>
        </p>
      </nav>

      <section>
        <h3 className="judul-bagian">Daftar Pantai</h3>

        <StatusData loading={loading} error={error} />

        {!loading && !error && (
        <table>
          <caption>Daftar destinasi pantai dari Bandung (data contoh, jarak perkiraan)</caption>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Lokasi</th>
              <th scope="col">Perkiraan Jarak dari Bandung</th>
              <th scope="col">Keunggulan</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pantai.map((p, i) => (
              <tr key={p.id}>
                <th scope="row">{i + 1}</th>
                <td>{p.nama}</td>
                <td>{p.lokasi}</td>
                <td>± {p.jarak} km</td>
                <td>{p.keunggulan}</td>
                <td><Link to={`/pantai/${p.id}`}>Detail</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </section>
    </main>
  )
}
