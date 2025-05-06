// index.js - Ini adalah file utama untuk Request Header Parser Microservice

// Import package yang diperlukan
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Konfigurasi port
const port = process.env.PORT || 3000;

// Aktifkan CORS untuk semua permintaan
app.use(cors({ optionsSuccessStatus: 200 }));

// Middleware untuk file statis
app.use(express.static('public'));

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint API utama untuk header parser
app.get('/api/whoami', (req, res) => {
  // Untuk FreeCodeCamp test, kita perlu memastikan sesuai dengan nama properti yang tepat
  // Ambil IP address - coba beberapa metode untuk memastikan mendapatkan nilai
  let ipaddress = req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress ||
                  req.socket.remoteAddress ||
                  req.connection.socket?.remoteAddress || 
                  '127.0.0.1';
  
  // Jika IP berisi koma (karena proxy), ambil alamat asli
  if (ipaddress && ipaddress.includes(',')) {
    ipaddress = ipaddress.split(',')[0].trim();
  }
  
  // Ambil bahasa dari header accept-language
  const language = req.headers['accept-language'];
  
  // Ambil informasi software (user-agent)
  const software = req.headers['user-agent'];
  
  // Log untuk debugging
  console.log({
    ipaddress,
    language,
    software
  });

  // Kirim respons dalam format JSON dengan nama properti yang sesuai
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
  console.log(`Akses aplikasi di: http://localhost:${port}`);
});