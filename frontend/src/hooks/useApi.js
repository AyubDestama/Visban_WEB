import { useEffect, useState } from 'react'
import { getJSON } from '../api.js'

// Mengembalikan { data, loading, error }. data = null jika 404.
export default function useApi(path) {
  const [state, setState] = useState({ data: undefined, loading: true, error: null })

  useEffect(() => {
    const ctrl = new AbortController()
    setState({ data: undefined, loading: true, error: null })
    getJSON(path, ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) => {
        if (e.name !== 'AbortError') setState({ data: undefined, loading: false, error: e.message })
      })
    return () => ctrl.abort()
  }, [path])

  return state
}
