// Kerangka abu-abu berkedip selama halaman detail dimuat.
export default function SkeletonDetail({ label = 'Memuat detail...' }) {
  return (
    <div className="skeleton-detail" role="status" aria-busy="true">
      <span className="sr-only">{label}</span>
      <div className="skeleton" style={{ width: '40%', height: 14 }} />
      <div className="skeleton" style={{ width: '55%', height: 32, marginTop: 18 }} />
      <div className="skeleton" style={{ width: '30%', height: 16, marginTop: 10 }} />
      <div className="skeleton skeleton-gambar" />
      <div className="skeleton" style={{ width: '90%', height: 14, marginTop: 22 }} />
      <div className="skeleton" style={{ width: '80%', height: 14, marginTop: 10 }} />
      <div className="skeleton" style={{ width: '85%', height: 14, marginTop: 10 }} />
    </div>
  )
}
