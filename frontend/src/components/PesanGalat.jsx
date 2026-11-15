// Panel galat yang ramah pengguna, dengan tombol "Coba lagi".
export default function PesanGalat({ judul, pesan, onCobaLagi }) {
  return (
    <div className="pesan-galat" role="alert">
      <p className="pesan-galat-judul">{judul}</p>
      <p>{pesan}</p>
      {onCobaLagi && (
        <button type="button" className="tombol tombol-garis" onClick={onCobaLagi}>
          Coba lagi
        </button>
      )}
    </div>
  )
}
