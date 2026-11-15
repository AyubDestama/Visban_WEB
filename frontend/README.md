# Visban – Frontend (React + Vite)

## Menjalankan
Backend (`../backend`) bersifat opsional: bila tidak aktif, frontend memakai data cadangan di `src/data/`
(salinan dari `backend/src/data/`, perlu diperbarui bersamaan). Jalankan:
```
npm install
npm run dev      # http://localhost:5173, request /api diteruskan ke http://localhost:3000
npm run build    # hasil di dist/
```
Untuk produksi, salin `.env.example` ke `.env` dan isi `VITE_API_URL` dengan alamat backend
(dan set `CORS_ORIGIN` di backend ke alamat frontend).

## Halaman (HashRouter)
Beranda `#/`, Rencanakan `#/rencanakan`, Gunung `#/gunung`, Detail Gunung `#/gunung/:id`,
Pantai `#/pantai`, Detail Pantai `#/pantai/:id`.

Data gunung/pantai diambil dari backend lewat `src/api.js` dan `src/hooks/useApi.js`.
