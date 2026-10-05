const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Wajib didaftarkan sebelum route yang membaca req.body
app.use(express.json());
// data awal (minimal 3)
let alumni = [
  { id: 1, nim: "2020110045", nama: "Farhan Akbar", prodi: "Sistem Informasi", tahunLulus: 2024, pekerjaan: "Business Analyst" },
  { id: 2, nim: "2019110012", nama: "Siti Rahma", prodi: "Teknik Informatika", tahunLulus: 2023, pekerjaan: "Web Developer" },
  { id: 3, nim: "2020110078", nama: "Dimas Prakoso", prodi: "Sistem Informasi", tahunLulus: 2024, pekerjaan: "Data Analyst" },
];
let nextId = 4;

// GET /
app.get("/", (req, res) => {
  res.json({
    nama: "Kirana Cinta Mentari",
    nim: "2428240078",
    nomorTopik: 18,
    endpoints: "/alumni",
  });
});
 
// GET /alumni menampilkan seluruh data alumni
// GET /alumni
app.get('/alumni', (req, res) => {
  const { tahunLulus } = req.query;

  // jika ada filter, kembalikan data yang cocok saja
  if (tahunLulus) {
    const hasil = alumni.filter((a) => a.tahunLulus === parseInt(tahunLulus));
    return res.status(200).json(hasil); 
  }

  // jika tidak ada filter, kembalikan semua data
  res.status(200).json(alumni);
});

// GET /alumni/:id menampilkan data alumni berdasarkan id
app.get('/alumni/:id', (req, res,next) => {
  const id = parseInt(req.params.id);
  const data = alumni.find((a) => a.id === id);

  if (!data) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }
  res.status(200).json(data);
}); 

// POST /alumni
// Body: { "nim": "2020110045", "nama": "Farhan Akbar", "prodi": "Sistem Informasi", "tahunLulus": 2024, "pekerjaan": "Business Analyst" }
app.post('/alumni', (req, res) => {
  const { nim, nama, prodi, tahunLulus, pekerjaan } = req.body;

  // validasi: field wajib kosong -> 400
  if (!nim || !nama || !prodi || tahunLulus === undefined || tahunLulus === null || tahunLulus === '') {
    return res.status(400).json({
      status: 'error',
      message: 'fields wajib diisi',
      data: null
    });
  }

  // tahunLulus harus berupa angka
  if (typeof tahunLulus !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'tahunLulus harus berupa angka!',
      data: null,
    });
  }

  const baru = { id: nextId++, nim, nama, prodi, tahunLulus, pekerjaan: pekerjaan || '' };

  alumni.push(baru); 

  // berhasil -> 201 + data yang baru dibuat
  res.status(201).json({
    status: 'success',
    message: 'Data berhasil ditambahkan',
    data: baru,
  });
});

// PUT /alumni/2
// Body: { "nim": "2019110012", "nama": "Siti Rahma", "prodi": "Teknik Informatika", "tahunLulus": 2023, "pekerjaan": "Web Developer" }
app.put('/alumni/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alumni.findIndex((a) => a.id === id); // mencari index array

  // jika id tidak ada -> 404
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const { nim, nama, prodi, tahunLulus, pekerjaan } = req.body;

  // validasi: field wajib kosong -> 400
  if (!nim || !nama || !prodi || tahunLulus === undefined || tahunLulus === null || tahunLulus === '') {
    return res.status(400).json({
      status: 'error',
      message: 'fields wajib diisi',
      data: null,
    });
  }

  // tahunLulus harus berupa angka
  if (typeof tahunLulus !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'tahunLulus harus berupa angka!',
      data: null,
    });
  }

  // ganti penuh semua field (id tetap)
  alumni[index] = { id, nim, nama, prodi, tahunLulus, pekerjaan: pekerjaan || '' };

  res.status(200).json({
    status: 'success',
    message: 'Data berhasil diubah',
    data: alumni[index],
  });
});

// DELETE /alumni/2
app.delete('/alumni/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alumni.findIndex((a) => a.id === id);

  // jika id tidak ada -> 404
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Data tidak ditemukan`,
      data: null,
    });
  }

  // middleware catch-all 404 (paling bawah, setelah semua route)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null,
  });
});

  alumni.splice(index, 1); // hapus dari array

  // berhasil -> 200 + JSON berisi pesan, data null
  res.status(200).json({
    status: 'success',
    message: `Data alumni dengan id ${id} berhasil dihapus`,
    data: null,
  });
});

// error handler: body JSON yang rusak tetap dibalas JSON (bukan HTML bawaan Express)
app.use((err, req, res, next) => {
  res.status(400).json({
    status: 'error',
    message: 'Body  json rusak atau tidak valid',
    data: null,
  });
});

app.listen(PORT, () => 
    console.log(`Server berjalan di http://localhost:${PORT}`)
);