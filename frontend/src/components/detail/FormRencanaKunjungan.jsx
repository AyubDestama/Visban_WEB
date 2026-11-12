import { cloneElement, useRef, useState } from 'react'
import { kirimRencana } from '../../services/rencana.js'
import { validasiRencana, batasTanggal, BATAS_CATATAN } from '../../utils/validasiRencana.js'

// Teks yang berbeda antara halaman gunung dan pantai
const TEKS = {
  gunung: {
    judul: 'Rencana Pendakian',
    kegiatan: 'mendaki',
    labelTanggal: 'Tanggal pendakian *',
    labelJumlah: 'Jumlah pendaki *',
    setuju: 'Saya akan mematuhi aturan pendakian dan arahan petugas. *',
  },
  pantai: {
    judul: 'Rencana Kunjungan',
    kegiatan: 'berkunjung ke',
    labelTanggal: 'Tanggal kunjungan *',
    labelJumlah: 'Jumlah pengunjung *',
    setuju: 'Saya akan mematuhi aturan keselamatan pantai dan arahan petugas. *',
  },
}

const KOSONG = { nama: '', email: '', noHp: '', tanggal: '', jumlah: '', catatan: '', setuju: false }
const URUTAN = ['nama', 'email', 'noHp', 'tanggal', 'jumlah', 'catatan', 'setuju']

// Form rencana kunjungan dengan validasi client-side dan pengiriman ke Mock API.
// jenis = 'gunung' atau 'pantai', destinasi = data tempat yang sedang dibuka.
export default function FormRencanaKunjungan({ jenis, destinasi }) {
  const t = TEKS[jenis]
  const [nilai, setNilai] = useState(KOSONG)
  const [disentuh, setDisentuh] = useState({})
  const [status, setStatus] = useState('isi') // isi | mengirim | berhasil
  const [galatKirim, setGalatKirim] = useState('')
  const [hasil, setHasil] = useState(null)
  const refForm = useRef(null)
  const { min, max } = batasTanggal()

  const galat = validasiRencana(nilai)
  const tampilGalat = (f) => (disentuh[f] ? galat[f] : undefined)

  function ubah(e) {
    const { name, value, type, checked } = e.target
    setNilai((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
  }

  function sentuh(e) {
    setDisentuh((d) => ({ ...d, [e.target.name]: true }))
  }

  async function kirim(e) {
    e.preventDefault()
    setDisentuh(Object.fromEntries(URUTAN.map((f) => [f, true])))

    const salah = URUTAN.filter((f) => galat[f])
    if (salah.length > 0) {
      // Pindahkan fokus ke isian pertama yang masih salah
      refForm.current.elements[salah[0]].focus()
      return
    }

    setStatus('mengirim')
    setGalatKirim('')
    try {
      const balasan = await kirimRencana({
        jenis,
        destinasiId: destinasi.id,
        destinasi: destinasi.nama,
        ...nilai,
        jumlah: Number(nilai.jumlah),
      })
      setHasil(balasan)
      setStatus('berhasil')
    } catch (err) {
      setGalatKirim(err.message)
      setStatus('isi')
    }
  }

  function ulang() {
    setNilai(KOSONG)
    setDisentuh({})
    setHasil(null)
    setStatus('isi')
  }

  if (status === 'berhasil') {
    return (
      <section className="form-rencana" aria-labelledby="judul-rencana">
        <h3 id="judul-rencana" className="judul-polos">{t.judul}</h3>
        <div className="pesan-berhasil" role="status">
          <p className="pesan-berhasil-judul">{t.judul} terkirim (nomor #{hasil.id}).</p>
          <p>
            {hasil.nama}, {hasil.jumlah} orang ke {hasil.destinasi} pada{' '}
            {new Date(`${hasil.tanggal}T00:00:00`).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.
          </p>
          <p className="catatan-kecil">Data dikirim ke JSONPlaceholder (Mock API), jadi hanya simulasi dan tidak benar-benar disimpan.</p>
          <button type="button" className="tombol tombol-garis" onClick={ulang}>Buat rencana lain</button>
        </div>
      </section>
    )
  }

  const jumlahSalah = URUTAN.filter((f) => tampilGalat(f)).length
  const mengirim = status === 'mengirim'

  return (
    <section className="form-rencana" aria-labelledby="judul-rencana">
      <h3 id="judul-rencana" className="judul-polos">{t.judul}</h3>
      <p className="form-pengantar">
        Isi data berikut untuk mencatat rencana {t.kegiatan} {destinasi.nama}. Kolom bertanda * wajib diisi.
      </p>

      <form ref={refForm} onSubmit={kirim} noValidate>
        {jumlahSalah > 0 && (
          <p className="ringkasan-galat" role="alert">
            Ada {jumlahSalah} isian yang perlu diperbaiki.
          </p>
        )}

        <div className="form-grid">
          <Kolom id="nama" label="Nama lengkap *" galat={tampilGalat('nama')}>
            <input id="nama" name="nama" type="text" autoComplete="name" value={nilai.nama} onChange={ubah} onBlur={sentuh} />
          </Kolom>

          <Kolom id="email" label="Email *" galat={tampilGalat('email')}>
            <input id="email" name="email" type="email" autoComplete="email" value={nilai.email} onChange={ubah} onBlur={sentuh} />
          </Kolom>

          <Kolom id="noHp" label="Nomor HP *" bantuan="Contoh: 081234567890" galat={tampilGalat('noHp')}>
            <input id="noHp" name="noHp" type="tel" inputMode="numeric" autoComplete="tel" value={nilai.noHp} onChange={ubah} onBlur={sentuh} />
          </Kolom>

          <Kolom id="tanggal" label={t.labelTanggal} galat={tampilGalat('tanggal')}>
            <input id="tanggal" name="tanggal" type="date" min={min} max={max} value={nilai.tanggal} onChange={ubah} onBlur={sentuh} />
          </Kolom>

          <Kolom id="jumlah" label={t.labelJumlah} bantuan="1 sampai 20 orang" galat={tampilGalat('jumlah')}>
            <input id="jumlah" name="jumlah" type="number" min="1" max="20" step="1" value={nilai.jumlah} onChange={ubah} onBlur={sentuh} />
          </Kolom>
        </div>

        <Kolom
          id="catatan"
          label="Catatan (opsional)"
          bantuan={`${nilai.catatan.length}/${BATAS_CATATAN} karakter`}
          galat={tampilGalat('catatan')}
        >
          <textarea id="catatan" name="catatan" rows="3" value={nilai.catatan} onChange={ubah} onBlur={sentuh} />
        </Kolom>

        <div className={'kolom-centang' + (tampilGalat('setuju') ? ' ada-galat' : '')}>
          <input
            id="setuju"
            name="setuju"
            type="checkbox"
            checked={nilai.setuju}
            onChange={ubah}
            onBlur={sentuh}
            aria-invalid={tampilGalat('setuju') ? 'true' : 'false'}
            aria-describedby={tampilGalat('setuju') ? 'setuju-galat' : undefined}
          />
          <label htmlFor="setuju">{t.setuju}</label>
          {tampilGalat('setuju') && <p id="setuju-galat" className="teks-galat">{tampilGalat('setuju')}</p>}
        </div>

        {galatKirim && (
          <p className="pesan-galat" role="alert">{galatKirim}</p>
        )}

        <button type="submit" className="tombol" disabled={mengirim}>
          {mengirim ? 'Mengirim...' : 'Kirim rencana'}
        </button>
      </form>
    </section>
  )
}

// Satu kolom form: label, input, teks bantuan, dan pesan galat yang terhubung lewat aria
function Kolom({ id, label, bantuan, galat, children }) {
  const idBantuan = bantuan ? `${id}-bantuan` : null
  const idGalat = galat ? `${id}-galat` : null
  // Tambahkan atribut aksesibilitas ke input di dalamnya
  const input = cloneElement(children, {
    'aria-invalid': galat ? 'true' : 'false',
    'aria-describedby': [idBantuan, idGalat].filter(Boolean).join(' ') || undefined,
  })

  return (
    <div className={'kolom' + (galat ? ' ada-galat' : '')}>
      <label htmlFor={id}>{label}</label>
      {input}
      {bantuan && <p id={idBantuan} className="teks-bantuan">{bantuan}</p>}
      {galat && <p id={idGalat} className="teks-galat">{galat}</p>}
    </div>
  )
}
