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
const filePath = "./database/main/sensor.json";
const sensorRT = "./database/RT/sensor/sensorRT.json"
const sensorSingleRT = "./database/RT/sensor/sensorSingleRT.json"
const sensorBatchRT = "./database/RT/sensor/sensorBatchRT.json"

router.get("/sensor", (req, res) => {
    const start = performance(); // Waktu awal sebelum pemrosesan permintaan

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

        addRT(pingTime, sensorRT); //add record array
        addLogRequest('getsensor.js', 'All', pingTime)
        //console.log(`Waktu Ping ke Server(getsensor): ${pingTime} ms`);
      } catch (error) {
        console.error("Terjadi kesalahan saat memformat JSON:", error);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getsystem.js', 'api/get/system', 500, 'Internal Server Error')
      }
    });
  });

router.get('/sensor/:div', (req, res) => {
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
            const start = performance(); // Waktu awal sebelum pemrosesan permintaan
            const formattedJson = JSON.stringify(jsonData, null, 2);
            res.setHeader("Content-Type", "application/json");
            res.send(formattedJson);
            const end = performance(); // Waktu setelah pemrosesan permintaan
            const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

            addRT(pingTime, sensorRT); //add record array
            addLogRequest('getsensor.js', 'All', pingTime)
            return
        } else {
            if(bagian.toLowerCase() == 'water'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Water_Ph : jsonData.Water_Ph,
                    Water_Index : jsonData.Water_Index,
                    Water_Flow : jsonData.Water_Flow,
                    Water_Flow_Index : jsonData.Water_Flow_Index
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_water', pingTime)
            } else if(bagian.toLowerCase() == 'soil'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Soil_Ph : jsonData.Soil_Ph,
                    Soil_Index : jsonData.Soil_Index,
                    Soil_Moisture : jsonData.Soil_Moisture,
                    Soil_Moisture_Index : jsonData.Soil_Moisture_Index,
                    Soil_Temperature : jsonData.Soil_Temperature
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_soil', pingTime)
            } else if(bagian.toLowerCase() == 'air'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Air_Temperature : jsonData.Air_Temperature,
                    Air_Humidity : jsonData.Air_Humidity
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_air', pingTime)
            } else if(bagian.toLowerCase() == 'anemo'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Anemo : jsonData.Anemo,
                    Anemo_Index : jsonData.Anemo_Index
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_anemo', pingTime)
            } else if(bagian.toLowerCase() == 'ldr'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    LDR : jsonData.LDR,
                    LDR_Index : jsonData.LDR_Index
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_ldr', pingTime)
            } else if(bagian.toLowerCase() == 'ultrasonic' || bagian.toLowerCase() == 'tank'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Ultrasonic : jsonData.Ultrasonic,
                    Tank_Percentage : jsonData.Tank_Percentage,
                    Tank_Capacity : jsonData.Tank_Capacity
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_ultrasonic', pingTime)
            } else if(bagian.toLowerCase() == 'ph'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Water_Ph : jsonData.Water_Ph,
                    Soil_Ph : jsonData.Soil_Ph
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array'
                addLogRequest('getsensor.js', 'batch_ph', pingTime)
            } else if(bagian.toLowerCase() == 'index'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Water_Index : jsonData.Water_Index,
                    Soil_Index : jsonData.Soil_Index,
                    Anemo_Index : jsonData.Anemo_Index,
                    LDR_Index : jsonData.LDR_Index
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
            } else if(bagian.toLowerCase() == 'moisture' || bagian.toLowerCase() == 'humidity'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Soil_Moisture : jsonData.Soil_Moisture,
                    Air_Humidity : jsonData.Air_Humidity
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_moisture', pingTime)
            } else if(bagian.toLowerCase() == 'temp' || bagian.toLowerCase() == 'temperature'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const proccessingdata = {
                    code: 200, 
                    Soil_Temperature : jsonData.Soil_Temperature,
                    Air_Temperature : jsonData.Air_Temperature
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorBatchRT); //add record array
                addLogRequest('getsensor.js', 'batch_temperature', pingTime)
            } else if(bagian.toLowerCase() == 'water_ph'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Water_Ph;
                const proccessingdata = {
                    code: 200, 
                    Water_Ph : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'water_ph', pingTime)
            } else if(bagian.toLowerCase() == 'water_index'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Water_Index;
                const proccessingdata = {
                    code: 200, 
                    Water_Index : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'water_ph', pingTime)
            } else if(bagian.toLowerCase() == 'water_flow'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Water_Flow;
                const proccessingdata = {
                    code: 200, 
                    Water_Flow : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json"); 
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start);
                // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'water_flow', pingTime)
            } else if(bagian.toLowerCase() == 'water_flow_index'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Water_Flow_Index;
                const proccessingdata = {
                    code: 200, 
                    Water_Flow_Index : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json"); 
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start);
                // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'water_flow_index', pingTime)
            } else if(bagian.toLowerCase() == 'soil_ph'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Soil_Ph;
                const proccessingdata = {
                    code: 200, 
                    Soil_Ph : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'soil_ph', pingTime)
            } else if(bagian.toLowerCase() == 'soil_index'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Soil_Index;
                const proccessingdata = {
                    code: 200, 
                    Soil_Index : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'soil_index', pingTime)
            } else if(bagian.toLowerCase() == 'soil_moisture'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Soil_Moisture;
                const proccessingdata = {
                    code: 200, 
                    Soil_Moisture : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'soil_moisture', pingTime)
            } else if(bagian.toLowerCase() == 'soil_moisture_index'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Soil_Moisture_Index;
                const proccessingdata = {
                    code: 200, 
                    Soil_Moisture_Index : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json"); 
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start);
                // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'soil_moisture_index', pingTime)
            } else if(bagian.toLowerCase() == 'soil_temperature'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Soil_Temperature;
                const proccessingdata = {
                    code: 200, 
                    Soil_Temperature : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'soil_temperature', pingTime)
            } else if(bagian.toLowerCase() == 'air_temperature'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Air_Temperature;
                const proccessingdata = {
                    code: 200, 
                    Air_Temperature : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'air_temperature', pingTime)
            } else if(bagian.toLowerCase() == 'air_humidity'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Air_Humidity;
                const proccessingdata = {
                    code: 200, 
                    Air_Humidity : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'air_humidity', pingTime)
            } else if(bagian.toLowerCase() == 'anemo'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Anemo;
                const proccessingdata = {
                    code: 200, 
                    Anemo : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'anemo', pingTime)
            } else if(bagian.toLowerCase() == 'anemo_index'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Anemo_Index;
                const proccessingdata = {
                    code: 200, 
                    Anemo_Index : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'anemo_index', pingTime)
            } else if(bagian.toLowerCase() == 'ldr'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.LDR;
                const proccessingdata = {
                    code: 200, 
                    LDR : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'ldr', pingTime)
            } else if(bagian.toLowerCase() == 'ldr_index'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.LDR_Index;
                const proccessingdata = {
                    code: 200, 
                    LDR_Index : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'ldr_index', pingTime)
            } else if(bagian.toLowerCase() == 'ultrasonic'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Ultrasonic;
                const proccessingdata = {
                    code: 200, 
                    Ultrasonic : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'ultrasonic', pingTime)
            } else if(bagian.toLowerCase() == 'tank_percentage'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Tank_Percentage;
                const proccessingdata = {
                    code: 200, 
                    Tank_Percentage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'tank-percentage', pingTime)
            } else if(bagian.toLowerCase() == 'tank_capacity'){
                const start = performance(); // Waktu awal sebelum pemrosesan permintaan
                const datasort = jsonData.Tank_Capacity;
                const proccessingdata = {
                    code: 200, 
                    Tank_Capacity : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, sensorSingleRT); //add record array
                addLogRequest('getsensor.js', 'tank_capacity', pingTime)
            } else {
                const texterr = `
Query yang tersedia hanya : 
Batch : water, soil, air, anemo, ldr, ultrasonic, tank, ph, index, moisture, humidity, temp, temperature
Single : water_ph, water_index, soil_ph, soil_index, soil_moisture, soil_temperature, air_temperature, air_humidity, anemo, anemo_index, ldr, ldr_index, ultrasonic, tank_percentage, tank_capacity
`
                res.status(404).json({ code: 404, error: texterr });
                addLogError('getsystem.js', 'api/get/system/:div', 404, texterr)
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