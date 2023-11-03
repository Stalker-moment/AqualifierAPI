const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');
const axios = require('axios');
const performance = require('performance-now');

const filejson = './database/log/logerror.json';
const filexlsx = './database/log/logerror.xlsx';
const filetxt = './database/log/logerror.txt';

function addLogError(namafile, route, code, msg) {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date
    const timestamp = new Date()

    //---------------------------------------TXT---------------------------------------//
    const logMessage = `${currentDate} ${timestamp.toISOString()} ${namafile} ${route} ${code} ${msg}\n`;

    fs.appendFile(filetxt, logMessage, (err) => {
      if (err) {
        console.error('Terjadi kesalahan dalam menulis log: ', err);
      } else {
        //console.log('Log ditambahkan ke logrequest.txt');
      }
    });

    //---------------------------------------XLSX---------------------------------------//
    const logDataXlsx = [currentDate, timestamp.toISOString(), namafile, route, code, msg];

    let wb;
    let ws;
  
    try {
      if (fs.existsSync(filexlsx)) {
        // Jika file log sudah ada, baca file tersebut
        const existingFile = XLSX.readFile(filexlsx);
        wb = existingFile;
        ws = existingFile.Sheets[existingFile.SheetNames[0]];
      } else {
        // Jika file log belum ada, buat file baru
        wb = XLSX.utils.book_new();
        ws = XLSX.utils.aoa_to_sheet([['Date', 'Timestamp', 'NamaFile', 'Route', 'Code', 'Message']]);
        XLSX.utils.book_append_sheet(wb, ws, 'logDataXlsx');
      }
  
      // Menambahkan data log baru
      XLSX.utils.sheet_add_aoa(ws, [logDataXlsx], { origin: -1 });
  
      // Menulis ke file log
      XLSX.writeFile(wb, filexlsx);
    } catch(err){
        console.log('write xlsx err :', err)
    }

    //---------------------------------------JSON---------------------------------------//
    let logData = []; // Data untuk menyimpan log

    // Membaca file JSON log jika sudah ada
    if (fs.existsSync(filejson)) {
        const fileData = fs.readFileSync(filejson);
        logData = JSON.parse(fileData);
    }

    // Mengecek apakah log untuk tanggal hari ini sudah ada
    const existingDateLog = logData.find((log) => log.tanggal === currentDate);

    if (existingDateLog) {
        existingDateLog.data.push({ timestamp, namafile, route, code, msg });
    } else {
        logData.push({
            tanggal: currentDate,
            data: [{ timestamp, namafile, route, code, msg }]
        });
    }

    // Menulis kembali data log ke file JSON
    fs.writeFileSync(filejson, JSON.stringify(logData, null, 2), (err) => {
        if (err) {
            console.error('Error writing logs to file:', err);
        } else {
            //console.log('Logs have been written to the file:', filejson);
        }
    });
}

module.exports = addLogError;
