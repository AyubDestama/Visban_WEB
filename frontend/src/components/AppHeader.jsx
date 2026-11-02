import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const logo = import.meta.env.BASE_URL + 'img/Ayam_Icikiwir.jpeg'

export default function AppHeader() {
  const menu = useRef(null)
  const { pathname } = useLocation()

  // tutup dropdown "Destinasi" setiap pindah halaman
  useEffect(() => {
    if (menu.current) menu.current.open = false
  }, [pathname])

  return (
    <header className="site-header">
      <div className="brand">
        <img src={logo} alt="Logo Visit Indonesia" width="60" height="60" />
        <Link to="/" className="brand-link"><h1>Visit Indonesia</h1></Link>
      </div>

      <nav aria-label="Navigasi utama">
        <ul>
          <li>
            <details ref={menu}>
              <summary>Destinasi</summary>
              <ul>
                <li><NavLink to="/pantai">Pantai</NavLink></li>
                <li><NavLink to="/gunung">Gunung</NavLink></li>
              </ul>
            </details>
          </li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Pengalaman</a></li>
          <li><NavLink to="/rencanakan">Rencanakan Perjalanan Anda</NavLink></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Informasi</a></li>
        </ul>
      </nav>
    </header>
  )
}
