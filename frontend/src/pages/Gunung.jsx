import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import StatusData from '../components/StatusData.jsx'

const kapital = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export default function Gunung() {
  const { data: gunung = [], loading, error } = useApi('/gunung')

  //validasi client-side
  const [keyword, setKeyword] = useState('')
  const [formError, setFormError] = useState('')
  const [filteredData, setFilteredData] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()

    if (keyword.trim() === '') {
      setFormError('Kata kunci pencarian tidak boleh kosong!')
      setFilteredData(null)
      return
    }

    if (keyword.trim().length < 2) {
      setFormError('Masukkan minimal 2 karakter untuk melakukan pencarian.')
      setFilteredData(null)
      return
    }

    // Jika lolos validasi, filter data
    setFormError('')
    const results = gunung.filter((g) => 
      g.nama.toLowerCase().includes(keyword.toLowerCase()) ||
      g.lokasi.toLowerCase().includes(keyword.toLowerCase())
    )
    setFilteredData(results)
  }

  const dataToDisplay = filteredData !== null ? filteredData : gunung

  return (
    <main className="halaman">
      <nav aria-label="Breadcrumb">
        <p><Link to="/rencanakan">Rencanakan Perjalanan Anda</Link> &gt; Gunung</p>
      </nav>

      <h2>Destinasi Gunung</h2>
      <p>Gunung dan kawah di Bandung Raya dan sekitarnya yang dapat dikunjungi dalam sehari.</p>

      <div className="header-filter-search" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>

        <nav aria-label="Jenis destinasi" className="filter-jenis" style={{ margin: 0 }}>
          <p style={{ margin: 0 }}>
            <strong>Jenis:</strong>
            <NavLink to="/pantai" className={({ isActive }) => (isActive ? 'active' : undefined)}>Pantai</NavLink>
            {' | '}
            <NavLink to="/gunung" className={({ isActive }) => (isActive ? 'active' : undefined)}>Gunung</NavLink>
          </p>
        </nav>

        <div className="search-container-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '260px' }}>
          
          {formError && (
            <div style={{ 
              width: '100%', 
              backgroundColor: '#fff3cd', 
              color: '#856404', 
              border: '1px solid #ffeeba', 
              padding: '6px 10px', 
              borderRadius: '4px', 
              fontSize: '12px', 
              marginBottom: '8px',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}>
              {formError}
            </div>
          )}

          <form onSubmit={handleSearch} style={{ margin: 0, width: '100%' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Cari gunung / lokasi..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ 
                  padding: '7px 14px', 
                  borderRadius: '20px', 
                  border: '1px solid #ccc', 
                  outline: 'none',
                  flex: 1,
                  fontSize: '13px',
                  fontFamily: 'inherit'
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  padding: '7px 14px', 
                  borderRadius: '20px', 
                  border: 'none', 
                  backgroundColor: '#2c3e50', 
                  color: 'white', 
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  fontFamily: 'inherit'
                }}
              >
                Cari
              </button>
            </div>
          </form>

        </div>
      </div>

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
            {dataToDisplay.length > 0 ? (
              dataToDisplay.map((g, i) => (
                <tr key={g.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{g.nama}</td>
                  <td>{g.lokasi}</td>
                  <td>{g.ketinggian.toLocaleString('id-ID')} mdpl</td>
                  <td>± {g.jarak} km</td>
                  <td>{kapital(g.tingkat)}</td>
                  <td><Link to={`/gunung/${g.id}`}>Detail</Link></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  Tidak ada destinasi gunung yang cocok dengan pencarian Anda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        )}
      </section>
    </main>
  )
}