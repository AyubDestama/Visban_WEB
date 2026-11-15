import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import StatusData from '../components/StatusData.jsx'

export default function Pantai() {
  const { data: pantai = [], loading, error } = useApi('/pantai')

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
    const kunci = keyword.trim().toLowerCase()
    const results = pantai.filter((p) =>
      p.nama.toLowerCase().includes(kunci) ||
      p.lokasi.toLowerCase().includes(kunci)
    )
    setFilteredData(results)
  }

  const dataToDisplay = filteredData !== null ? filteredData : pantai

  return (
    <main className="halaman">
      <nav aria-label="Breadcrumb">
        <p><Link to="/rencanakan">Rencanakan Perjalanan Anda</Link> &gt; Pantai</p>
      </nav>

      <h2>Destinasi Pantai</h2>
      <p>Bandung tidak punya pantai sendiri. Daftar berikut adalah pantai di pesisir selatan Jawa Barat yang paling sering dituju dari Bandung.</p>

      <div className="header-filter-search" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>

        <nav aria-label="Jenis destinasi" className="filter-jenis" style={{ margin: 0 }}>
          <p style={{ margin: 0 }}>
            <strong>Jenis:</strong>
            <NavLink to="/pantai" className={({ isActive }) => (isActive ? 'active' : undefined)}>Pantai</NavLink>
            {' | '}
            <NavLink to="/gunung" className={({ isActive }) => (isActive ? 'active' : undefined)}>Gunung</NavLink>
          </p>
        </nav>

        <div className="search-container-right" style={{ position: 'relative', width: '325px' }}>

          <form className="form-search-bar" onSubmit={handleSearch} style={{ margin: 0, width: '100%' }}>
            <div className="search-bar" style={{ display: 'flex', gap: '8px', alignItems: 'stretch', width: '100%', height: '42px' }}>
              <input
                className="search-input"
                type="text"
                placeholder="Cari pantai / lokasi..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                aria-invalid={formError ? 'true' : undefined}
                aria-describedby={formError ? 'galat-cari' : undefined}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  flex: 1,
                  fontSize: '16px',
                  fontFamily: 'inherit'
                }}
              />
              <button
                className="search-cari"
                type="submit"
                style={{
                  width: '65px',
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: '#2c3e50',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: 'inherit'
                }}
              >
                Cari
              </button>
            </div>
          </form>

          {formError && (
            <div
              className="search-error"
              id="galat-cari"
              role="alert"
              style={{
                position: 'absolute',
                bottom: '100%',
                right: 0,
                marginBottom: '6px',
                width: '100%',
                backgroundColor: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffeeba',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                zIndex: 5
              }}
            >
              {formError}
            </div>
          )}

        </div>
      </div>

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
            {dataToDisplay.length > 0 ? (
              dataToDisplay.map((p, i) => (
                <tr key={p.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{p.nama}</td>
                  <td>{p.lokasi}</td>
                  <td>± {p.jarak} km</td>
                  <td>{p.keunggulan}</td>
                  <td><Link to={`/pantai/${p.id}`}>Detail</Link></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Tidak ada destinasi pantai yang cocok dengan pencarian Anda.
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