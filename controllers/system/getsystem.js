const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');

//path function 
const addRT = require('../../function/addRT');
const addLogRequest = require('../../function/addLogRequest')
const addLogError = require('../../function/addLogError')

//path database
const filePath = "./database/main/system.json";
const systemRT = "./database/RT/system/systemRT.json"
const systemSingleRT = "./database/RT/system/systemSingleRT.json"

router.get("/system", (req, res) => {
    const start = performance();
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Terjadi kesalahan saat membaca file JSON:", err);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getsystem.js', 'api/get/system', 500, 'Internal Server Error')
        return;
      } 
      try {
        const jsonData = JSON.parse(data);
            const formattedJson = JSON.stringify(jsonData, null, 2);
            res.setHeader("Content-Type", "application/json");
            res.send(formattedJson);
            const end = performance(); // Waktu setelah pemrosesan permintaan
            const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

            //console.log(`Waktu Ping ke Server(getsystem): ${pingTime} ms`);
            addRT(pingTime, systemRT); //add record array
            addLogRequest('getsystem.js', 'All', pingTime)
      } catch (error) {
        console.error("Terjadi kesalahan saat memformat JSON:", error);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getsystem.js', 'api/get/system', 500, 'Internal Server Error')
      }
    });
  });

router.get('/system/:div', (req, res) => {
    const bagian = req.params.div
    //console.log(bagian)
  
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Terjadi kesalahan saat membaca file JSON:", err);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getsystem.js', 'api/get/system/:div', 500, 'Internal Server Error')
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        if(!bagian){
            const start = performance();
            const formattedJson = JSON.stringify(jsonData, null, 2);
            res.setHeader("Content-Type", "application/json");
            res.send(formattedJson);
            const end = performance(); // Waktu setelah pemrosesan permintaan
            const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

            addRT(pingTime, systemRT); //add record array
            addLogRequest('getsystem.js', 'All', pingTime)
            return
        } else {
            if(bagian.toLowerCase() == 'switch' || bagian.toLowerCase() == 'auto' || bagian.toUpperCase() == 'PLN' || bagian.toUpperCase() == 'PLTS'){
                if(bagian.toLowerCase() == 'switch'){
                  const start = performance();
                  const datasort = jsonData.Switch;
                  const proccessingdata = {
                    code: 200,
                      Switch : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
                  const end = performance(); // Waktu setelah pemrosesan permintaan
                  const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                  addRT(pingTime, systemSingleRT); //add record array
                  addLogRequest('getsystem.js', 'Switch', pingTime)
                } else if(bagian.toLowerCase() == 'auto'){
                  const start = performance();
                  const datasort = jsonData.Auto;
                  const proccessingdata = {
                    code: 200,
                      Auto : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
                  const end = performance(); // Waktu setelah pemrosesan permintaan
                  const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                  addRT(pingTime, systemSingleRT); //add record array
                  addLogRequest('getsystem.js', 'Auto', pingTime)
                } else if(bagian.toUpperCase() == 'PLN'){
                  const start = performance();
                  const datasort = jsonData.PLN;
                  const proccessingdata = {
                    code: 200,
                      PLN : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
                  const end = performance(); // Waktu setelah pemrosesan permintaan
                  const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                  addRT(pingTime, systemSingleRT); //add record array
                  addLogRequest('getsystem.js', 'PLN', pingTime)
                } else if(bagian.toUpperCase() == 'PLTS'){
                  const start = performance();
                  const datasort = jsonData.PLTS;
                  const proccessingdata = {
                    code: 200,
                      PLTS : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
                  const end = performance(); // Waktu setelah pemrosesan permintaan
                  const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                  addRT(pingTime, systemSingleRT); //add record array
                  addLogRequest('getsystem.js', 'PLTS', pingTime)
                }
            } else {
                res.status(404).json({ code: 404, error: "query yang tersedia hanya : Switch, Auto, PLN, PLTS" });
                addLogError('getsystem.js', 'api/get/system/:div', 404, "query yang tersedia hanya : Switch, Auto, PLN, PLTS")
            }
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat memformat JSON:", error);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getsystem.js', 'api/get/system/:div', 500, 'Internal Server Error')
      }
    });
  });

module.exports = router;