# Tugas 1 RESTful API - Alumni

# Identitas
- Nama: Kirana Cinta Mentari
- NIM: 2428240078
- Kelas: SI5B
- Topik: 18 - Kampus: Alumni
- Link Vercel: https://tugas1-restful-2428240078.vercel.app
- Link GitHub: https://github.com/USERNAME/tugas1-restful-2428240078

# Deskripsi
RESTful API untuk melakukan pengelolaan data alumni kampus menggunakan Express.js. Seluruh response berformat JSON dan data disimpan dalam array di memori.

# Teknologi
- Node.js
- Express.js
- nodemon (dev)
- Postman
- Vercel

# Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | / | Menampilkan info API |
| GET | /alumni | Menampilkan semua alumni |
| GET | /alumni/:id | Menampilkan alumni berdasarkan ID |
| GET | /alumni?tahunLulus=2024 | Memfilter alumni berdasarkan tahun lulus |
| POST | /alumni | Menambahkan alumni |
| PUT | /alumni/:id | Mengubah seluruh data alumni |
| DELETE | /alumni/:id | Menghapus alumni |

# Field Data

| Field | Tipe | Wajib |
|---|---|---|
| nim | string | ya |
| nama | string | ya |
| prodi | string | ya |
| tahunLulus | number | ya |
| pekerjaan | string | tidak |

`id` dibuat otomatis oleh server.

# Cara Menjalankan Lokal
