import { Router } from 'express'

// Router CRUD-baca (GET list + GET by id) untuk sebuah koleksi data.
export default function makeRouter(data, nama) {
  const router = Router()

  router.get('/', (_req, res) => res.json(data))

  router.get('/:id', (req, res) => {
    const item = data.find((x) => x.id === Number(req.params.id))
    if (!item) return res.status(404).json({ error: `${nama} tidak ditemukan` })
    res.json(item)
  })

  return router
}
