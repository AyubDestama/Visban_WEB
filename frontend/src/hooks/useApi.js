import useAsync from './useAsync.js'
import { getJSON } from '../api.js'

// Mengambil data dari backend Visban. Mengembalikan { data, loading, error, muatUlang }.
// data = null jika 404.
export default function useApi(path) {
  return useAsync((signal) => getJSON(path, signal), path)
}
