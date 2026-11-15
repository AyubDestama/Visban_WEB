import express from 'express'
import cors from 'cors'
import gunungRouter from './routes/gunung.js'
import pantaiRouter from './routes/pantai.js'

const app = express()
const PORT = process.env.PORT || 3000
const origins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim())

app.use(cors({ origin: origins }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/gunung', gunungRouter)
app.use('/api/pantai', pantaiRouter)

app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint tidak ditemukan' }))

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Terjadi kesalahan pada server' })
})

app.listen(PORT, () => console.log(`Backend berjalan di http://localhost:${PORT}`))
