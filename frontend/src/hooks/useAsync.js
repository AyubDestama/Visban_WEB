import { useCallback, useEffect, useState } from 'react'

// Hook umum untuk memuat data secara asinkron.
// muat(signal) harus mengembalikan Promise. kunci = nilai yang memicu muat ulang (mis. URL).
// Mengembalikan { data, loading, error, muatUlang }.
export default function useAsync(muat, kunci) {
  const [state, setState] = useState({ data: undefined, loading: true, error: null })
  const [percobaan, setPercobaan] = useState(0)

  useEffect(() => {
    const ctrl = new AbortController()
    setState({ data: undefined, loading: true, error: null })
    muat(ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) => {
        if (e.name !== 'AbortError') setState({ data: undefined, loading: false, error: e.message })
      })
    return () => ctrl.abort()
    // muat sengaja tidak dimasukkan: perubahan data cukup ditandai lewat kunci
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kunci, percobaan])

  // Dipanggil oleh tombol "Coba lagi"
  const muatUlang = useCallback(() => setPercobaan((n) => n + 1), [])

  return { ...state, muatUlang }
}
