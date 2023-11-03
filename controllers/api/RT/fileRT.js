const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/request', (req, res) => {
  const fileType = req.query.type;

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date
  let filePath = '';
  let contentType = '';
  let fileName = `${currentDate}_RequestLog_Aqualifier`;

  if (fileType === 'json') {
    filePath = './database/log/logrequest.json';
    contentType = 'application/json';
  } else if (fileType === 'txt') {
    filePath = './database/log/logrequest.txt';
    contentType = 'text/plain';
  } else if (fileType === 'xlsx') {
    filePath = './database/log/logrequest.xlsx';
    contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  } else {
    return res.status(400).send('Tipe file tidak valid');
  }

  if (fs.existsSync(filePath)) {
    // Set header agar file diunduh sebagai attachment
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}.${fileType}`);
    res.setHeader('Content-Type', contentType);

    const file = fs.createReadStream(filePath);
    file.pipe(res);
  } else {
    res.status(404).send('File tidak ditemukan');
  }
});

module.exports = router;
