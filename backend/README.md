# Visban – Backend (Express)

REST API untuk data destinasi gunung dan pantai.

## Menjalankan
```
npm install
cp .env.example .env   # opsional
npm run dev            # http://localhost:3000
```

## Endpoint
| Method | Path | Keterangan |
|---|---|---|
| GET | `/api/health` | Cek server |
| GET | `/api/gunung` | Daftar gunung |
| GET | `/api/gunung/:id` | Detail gunung (404 jika tidak ada) |
| GET | `/api/pantai` | Daftar pantai |
| GET | `/api/pantai/:id` | Detail pantai (404 jika tidak ada) |

Data ada di `src/data/gunung.json` dan `src/data/pantai.json`.
