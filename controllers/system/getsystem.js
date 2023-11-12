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
            const formattedJson = JSON.stringify(jsonData, null, 2);
            res.setHeader("Content-Type", "application/json");
            res.send(formattedJson);
            return
        } else {
            if(bagian.toLowerCase() == 'switch' || bagian.toLowerCase() == 'auto' || bagian.toUpperCase() == 'PLN' || bagian.toUpperCase() == 'PLTS'){
                if(bagian.toLowerCase() == 'switch'){
            
                  const datasort = jsonData.Switch;
                  const proccessingdata = {
                    code: 200,
                      Switch : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
                } else if(bagian.toLowerCase() == 'auto'){
            
                  const datasort = jsonData.Auto;
                  const proccessingdata = {
                    code: 200,
                      Auto : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
                } else if(bagian.toUpperCase() == 'PLN'){
            
                  const datasort = jsonData.PLN;
                  const proccessingdata = {
                    code: 200,
                      PLN : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
                } else if(bagian.toUpperCase() == 'PLTS'){
            
                  const datasort = jsonData.PLTS;
                  const proccessingdata = {
                    code: 200,
                      PLTS : datasort
                  }
                  const formattedJson = JSON.stringify(proccessingdata, null, 2);
                  res.setHeader("Content-Type", "application/json");
                  res.send(formattedJson);
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