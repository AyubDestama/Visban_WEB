import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // supaya hasil build bisa dibuka dari folder mana pun
  server: {
    port: 5173,
    strictPort: true, // gagal jika 5173 terpakai, bukan pindah ke port lain
    proxy: {
      '/api': 'http://localhost:3000', // backend
    },
  },
})
