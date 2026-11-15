import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppHeader from './components/AppHeader.jsx'
import AppFooter from './components/AppFooter.jsx'
import Beranda from './pages/Beranda.jsx'
import Rencanakan from './pages/Rencanakan.jsx'
import Informasi from './pages/Informasi.jsx'
import Gunung from './pages/Gunung.jsx'
import Pantai from './pages/Pantai.jsx'
import DetailGunung from './pages/DetailGunung.jsx'
import DetailPantai from './pages/DetailPantai.jsx'

const JUDUL = {
  '/': 'Beranda',
  '/rencanakan': 'Rencanakan Perjalanan Anda',
  '/informasi': 'Informasi Perjalanan',
  '/gunung': 'Destinasi Gunung',
  '/pantai': 'Destinasi Pantai',
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const judul = JUDUL[pathname] ?? (pathname.startsWith('/gunung/') ? 'Detail Gunung' : 'Detail Pantai')
    document.title = `${judul} - Visit Indonesia`
    window.scrollTo(0, 0)
  }, [pathname])

  // 7 halaman
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/rencanakan" element={<Rencanakan />} />
        <Route path="/informasi" element={<Informasi />} />
        <Route path="/gunung" element={<Gunung />} />
        <Route path="/gunung/:id" element={<DetailGunung />} />
        <Route path="/pantai" element={<Pantai />} />
        <Route path="/pantai/:id" element={<DetailPantai />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AppFooter />
    </>
  )
}