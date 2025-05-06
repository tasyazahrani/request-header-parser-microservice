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
app.get('/api/whoami', function(req, res) {
  // Ambil alamat IP dari header
  let ip = req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress ||
           req.socket.remoteAddress ||
           '127.0.0.1';
  
  // Jika ada beberapa IP (karena proxy), ambil yang pertama
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }
  
  // Kembalikan objek JSON dengan tiga properti yang diperlukan
  res.json({
    ipaddress: ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Jalankan server
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`Server berjalan di: http://localhost:${port}`);
});