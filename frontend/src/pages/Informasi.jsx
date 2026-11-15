import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useAsync from '../hooks/useAsync.js'
import { getInformasi } from '../services/informasi.js'
import PesanGalat from '../components/PesanGalat.jsx'
import '../assets/detail-destinasi.css'

export default function Informasi() {
  const { data, loading, error, muatUlang } = useAsync(getInformasi, 'informasi')
  const [kata, setKata] = useState('')
  const [galatCari, setGalatCari] = useState('')

  const faq = useMemo(() => {
    const k = kata.trim().toLowerCase()
    const semua = data?.faq ?? []
    if (!k || galatCari) return semua
    return semua.filter((f) => f.tanya.toLowerCase().includes(k) || f.jawab.toLowerCase().includes(k))
  }, [data, kata, galatCari])

  // Validasi client-side: kata kunci minimal 2 huruf (boleh kosong untuk menampilkan semua)
  function ubahKata(e) {
    const v = e.target.value
    setKata(v)
    setGalatCari(v.trim().length === 1 ? 'Masukkan minimal 2 karakter untuk mencari.' : '')
  }

  return (
    <main className="halaman informasi">
      <h2>Informasi Perjalanan</h2>
      <p>Panduan singkat sebelum berkunjung ke gunung dan pantai di sekitar Bandung: persiapan, transportasi, waktu terbaik, dan kontak darurat. Semua angka bersifat perkiraan.</p>

      {loading && (
        <div role="status" aria-live="polite" aria-busy="true">
          <p className="teks-bantuan">Memuat informasi…</p>
          <ul className="info-tips" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <li key={n} className="info-kartu rencana-skeleton">
                <span className="sk sk-judul" />
                <span className="sk" />
                <span className="sk sk-sedang" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && error && (
        <PesanGalat
          judul="Informasi belum bisa dimuat"
          pesan={`${error}. Periksa koneksi internet lalu coba lagi.`}
          onCobaLagi={muatUlang}
        />
      )}

      {!loading && !error && data && (
        <>
          <nav aria-label="Isi halaman" className="info-nav">
            <ul>
              <li><a href="#tips">Tips</a></li>
              <li><a href="#transportasi">Transportasi</a></li>
              <li><a href="#musim">Waktu terbaik</a></li>
              <li><a href="#kontak">Kontak darurat</a></li>
              <li><a href="#faq">Tanya jawab</a></li>
            </ul>
          </nav>

          <section id="tips" aria-labelledby="h-tips">
            <h3 id="h-tips" className="judul-bagian">Tips Persiapan</h3>
            <ul className="info-tips">
              {data.tips.map((t) => (
                <li key={t.id} className="info-kartu">
                  <h4>{t.judul}</h4>
                  <p>{t.isi}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="transportasi" aria-labelledby="h-transportasi">
            <h3 id="h-transportasi" className="judul-bagian">Transportasi dari Bandung</h3>
            <table>
              <caption>Pilihan transportasi dan perkiraan waktu tempuh</caption>
              <thead>
                <tr>
                  <th scope="col">Tujuan</th>
                  <th scope="col">Moda</th>
                  <th scope="col">Perkiraan Waktu</th>
                  <th scope="col">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {data.transportasi.map((r) => (
                  <tr key={r.id}>
                    <th scope="row">{r.jenis}</th>
                    <td>{r.moda}</td>
                    <td>{r.waktu}</td>
                    <td className="sel-catatan">{r.catatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="musim" aria-labelledby="h-musim">
            <h3 id="h-musim" className="judul-bagian">Waktu Terbaik Berkunjung</h3>
            <table>
              <caption>Gambaran musim dan saran perjalanan (perkiraan)</caption>
              <thead>
                <tr>
                  <th scope="col">Periode</th>
                  <th scope="col">Kondisi</th>
                  <th scope="col">Saran</th>
                </tr>
              </thead>
              <tbody>
                {data.musim.map((m) => (
                  <tr key={m.id}>
                    <th scope="row">{m.periode}</th>
                    <td>{m.kondisi}</td>
                    <td className="sel-catatan">{m.saran}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="kontak" aria-labelledby="h-kontak">
            <h3 id="h-kontak" className="judul-bagian">Kontak Darurat</h3>
            <ul className="info-kontak">
              {data.kontak.map((k) => (
                <li key={k.id} className="info-kartu">
                  <p className="info-nomor">
                    <a href={`tel:${k.nomor}`} aria-label={`Telepon ${k.nama}, nomor ${k.nomor}`}>{k.nomor}</a>
                  </p>
                  <h4>{k.nama}</h4>
                  <p>{k.keterangan}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="faq" aria-labelledby="h-faq">
            <h3 id="h-faq" className="judul-bagian">Tanya Jawab</h3>

            <div className="kolom info-cari">
              <label htmlFor="cari-faq">Cari pertanyaan</label>
              <input
                id="cari-faq"
                type="search"
                value={kata}
                onChange={ubahKata}
                placeholder="Contoh: tiket, menginap"
                aria-invalid={galatCari ? 'true' : 'false'}
                aria-describedby={galatCari ? 'cari-faq-galat' : undefined}
              />
              {galatCari && <p id="cari-faq-galat" className="teks-galat">{galatCari}</p>}
            </div>

            <p className="rencana-hasil" role="status" aria-live="polite">{faq.length} pertanyaan ditampilkan.</p>

            {faq.length > 0 ? (
              <div className="info-faq">
                {faq.map((f) => (
                  <details key={f.id}>
                    <summary>{f.tanya}</summary>
                    <p>{f.jawab}</p>
                  </details>
                ))}
              </div>
            ) : (
              <div className="rencana-kosong">
                <p>Tidak ada pertanyaan yang cocok dengan “{kata.trim()}”.</p>
                <button type="button" className="tombol tombol-garis" onClick={() => { setKata(''); setGalatCari('') }}>Hapus pencarian</button>
              </div>
            )}
          </section>

          <p className="kembali">
            Siap menyusun rencana? <Link to="/rencanakan">Rencanakan Perjalanan Anda &rarr;</Link>
          </p>
        </>
      )}
    </main>
  )
}