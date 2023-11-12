const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');

const jsonFilePath = './database/main/sensor.json'
const jsonFilePathSingleRT = './database/RT/sensor/editsensorSingleRT.json'
const jsonFilePathBatchRT = './database/RT/sensor/editsensorBatchRT.json'

//path function 
const addRT = require('../../function/addRT');
const addLogRequest = require('../../function/addLogRequest')
const addLogError = require('../../function/addLogError')

router.get('/edit/sensor', (req, res) => {
    const waterphValue = parseFloat(req.query.water_ph); 
    const waterindexValue = req.query.water_index;
    const waterflowValue = parseFloat(req.query.water_flow);
    const waterflowindexValue = req.query.water_flow_index;
    const watertempValue = parseFloat(req.query.water_temp);
    const soilphValue = parseFloat(req.query.soil_ph);
    const soilindexValue = req.query.soil_index;
    const soilmoistureValue = parseFloat(req.query.soil_moisture);
    const soilmoistureindexValue = req.query.soil_moisture_index;
    const soiltempValue = parseFloat(req.query.soil_temp);
    const airtempValue = parseFloat(req.query.air_temp);
    const airhumidityValue = parseFloat(req.query.air_humidity);
    const anemoValue = parseFloat(req.query.anemo);
    const anemoindexValue = req.query.anemo_index;
    const ldrValue = parseFloat(req.query.ldr);
    const ldrindexValue = req.query.ldr_index;
    const ultrasonicValue = parseFloat(req.query.ultrasonic);
    const tankpercentValue = parseFloat(req.query.tank_percentage);
    const tankcapacityValue = parseFloat(req.query.tank_capacity);
    const unitphValue = req.query.unit_ph;
    const unitwaterValue = req.query.unit_water;
    const unitmoistureValue = req.query.unit_moisture;
    const unittempValue = req.query.unit_temp;
    const unithumidityValue = req.query.unit_humidity;
    const unitanemoValue = req.query.unit_anemo;
    const unitldrValue = req.query.unit_ldr;
    const unitultrasonicValue = req.query.unit_ultrasonic;
    const unittankpercentValue = req.query.unit_tank_percentage;
    const unittankcapValue = req.query.unit_tank_capacity;

    if (waterphValue !== null && waterphValue !== undefined && !isNaN(waterphValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?water_ph', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Water_Ph = waterphValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?water_ph', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Water_Ph berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?water_ph', 500, 'Internal Server Error')
        }
        });
    } else if (waterindexValue !== null && waterindexValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?water_index', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Water_Index = waterindexValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?water_index', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Water_Index berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?water_index', 500, 'Internal Server Error')
        }
        });
    } else if(waterflowValue !== null && waterflowValue !== undefined && !isNaN(waterflowValue)){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
                addLogError('editsensor.js', 'api/get/edit/sensor?water_flow', 500, 'Gagal membaca file JSON')
                return;
            }
        
            try {

                const jsonContent = JSON.parse(data);
                jsonContent.Water_Flow = waterflowValue; // Mengubah nilai Pump_Tank menjadi true
                fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                    addLogError('editsensor.js', 'api/get/edit/sensor?water_flow', 500, 'Gagal menulis JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: "value Water_Flow berhasil diubah" });
                });
            } catch (err) {
                res.status(500).json({ code: 500, error: "Internal Server Error" });
                addLogError('editsensor.js', 'api/get/edit/sensor?water_flow', 500, 'Internal Server Error')
            }
        });
    } else if(waterflowindexValue !== null && waterflowindexValue !== undefined){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
                addLogError('editsensor.js', 'api/get/edit/sensor?water_flow_index', 500, 'Gagal membaca file JSON')
                return;
            }
        
            try {

                const jsonContent = JSON.parse(data);
                jsonContent.Water_Flow_Index = waterflowindexValue; // Mengubah nilai Pump_Tank menjadi true
                fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                    addLogError('editsensor.js', 'api/get/edit/sensor?water_flow_index', 500, 'Gagal menulis JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: "value Water_Flow_Index berhasil diubah" });
                });
            } catch (err) {
                res.status(500).json({ code: 500, error: "Internal Server Error" });
                addLogError('editsensor.js', 'api/get/edit/sensor?water_flow_index', 500, 'Internal Server Error')
            }
        });
    } else if (watertempValue !== null && watertempValue !== undefined && !isNaN(watertempValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({code: 500,  error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_ph', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Water_Temperature = watertempValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?Water_Temp', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Water_Temperature berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?Water_Temp', 500, 'Internal Server Error')
        }
        });
    } else if (soilphValue !== null && soilphValue !== undefined && !isNaN(soilphValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({code: 500,  error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_ph', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Soil_Ph = soilphValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?soil_ph', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Soil_Ph berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_ph', 500, 'Internal Server Error')
        }
        });
    } else if (soilindexValue !== null && soilindexValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_index', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Soil_Index = soilindexValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?soil_index', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Soil_Index berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_index', 500, 'Internal Server Error')
        }
        });
    } else if (soilmoistureValue !== null && soilmoistureValue !== undefined && !isNaN(soilmoistureValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_moisture', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Soil_Moisture = soilmoistureValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?soil_moisture', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Soil_Moisture berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_moisture', 500, 'Internal Server Error')
        }
        });
    } else if(soilmoistureindexValue !== null && soilmoistureindexValue !== undefined){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
                addLogError('editsensor.js', 'api/get/edit/sensor?soil_moisture_index', 500, 'Gagal membaca file JSON')
                return;
            }
        
            try {

                const jsonContent = JSON.parse(data);
                jsonContent.Soil_Moisture_Index = soilmoistureindexValue; // Mengubah nilai Pump_Tank menjadi true
                fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                    addLogError('editsensor.js', 'api/get/edit/sensor?soil_moisture_index', 500, 'Gagal menulis JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: "value Soil_Moisture_Index berhasil diubah" });
                });
            } catch (err) {
                res.status(500).json({ code: 500, error: "Internal Server Error" });
                addLogError('editsensor.js', 'api/get/edit/sensor?soil_moisture_index', 500, 'Internal Server Error')
            }
        });
    } else if (soiltempValue !== null && soiltempValue !== undefined && !isNaN(soiltempValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_temp', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Soil_Temperature = soiltempValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?soil_temp', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Soil_Temperature berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?soil_temp', 500, 'Internal Server Error')
        }
        });
    } else if (airtempValue !== null && airtempValue !== undefined && !isNaN(airtempValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?air_temp', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Air_Temperature = airtempValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?air_temp', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Air_Temperature berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?air_temp', 500, 'Internal Server Error')
        }
        });
    } else if (airhumidityValue !== null && airhumidityValue !== undefined && !isNaN(airhumidityValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?air_humidity', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Air_Humidity = airhumidityValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?air_humidity', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Air_Humidity berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?air_humidity', 500, 'Internal Server Error')
        }
        });
    } else if (anemoValue !== null && anemoValue !== undefined && !isNaN(anemoValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?anemo', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Anemo = anemoValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?anemo', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Anemo berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?anemo', 500, 'Internal Server Error')
        }
        });
    } else if (anemoindexValue !== null && anemoindexValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?anemo_index', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Anemo_Index = anemoindexValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?anemo_index', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Anemo_Index berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?anemo_index', 500, 'Internal Server Error')
        }
        });
    } else if (ldrValue !== null && ldrValue !== undefined && !isNaN(ldrValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?ldr', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.LDR = ldrValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?ldr', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value LDR berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?ldr', 500, 'Internal Server Error')
        }
        });
    } else if (ldrindexValue !== null && ldrindexValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?ldr_index', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.LDR_Index = ldrindexValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?ldr_index', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value LDR_Index berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?ldr_index', 500, 'Internal Server Error')
        }
        });
    } else if (ultrasonicValue !== null && ultrasonicValue !== undefined && !isNaN(ultrasonicValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?ultrasonic', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Ultrasonic = ultrasonicValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?ultrasonic', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Ultrasonic berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?ultrasonic', 500, 'Internal Server Error')
        }
        });
    } else if (tankpercentValue !== null && tankpercentValue !== undefined && !isNaN(tankpercentValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?tank_percentage', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Tank_Percentage = tankpercentValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?tank_percentage', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Tank_Percentage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?tank_percentage', 500, 'Internal Server Error')
        }
        });
    } else if (tankcapacityValue !== null && tankcapacityValue !== undefined && !isNaN(tankcapacityValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?tank_capacity', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Tank_Capacity = tankcapacityValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?tank_capacity', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Tank_Capacity berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?tank_capacity', 500, 'Internal Server Error')
        }
        });
    } else if (unitphValue !== null && unitphValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_ph', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Ph = unitphValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_ph', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Ph berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_ph', 500, 'Internal Server Error')
        }
        });
    } else if(unitwaterValue !== null && unitwaterValue !== undefined){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_water', 500, 'Gagal membaca file JSON')
                return;
            }
        
            try {

                const jsonContent = JSON.parse(data);
                jsonContent.Unit_Water = unitwaterValue; // Mengubah nilai Pump_Tank menjadi true
                fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                    addLogError('editsensor.js', 'api/get/edit/sensor?unit_water', 500, 'Gagal menulis JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: "value Unit_Water berhasil diubah" });
                });
            } catch (err) {
                res.status(500).json({ code: 500, error: "Internal Server Error" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_water', 500, 'Internal Server Error')
            }
        });
    } else if (unitmoistureValue !== null && unitmoistureValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_moisture', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Moisture = unitmoistureValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_moisture', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Moisture berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_moisture', 500, 'Internal Server Error')
        }
        });
    } else if (unittempValue !== null && unittempValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_temp', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Temperature = unittempValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_temp', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Temperature berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_temp', 500, 'Internal Server Error')
        }
        });
    } else if (unithumidityValue !== null && unithumidityValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_humidity', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Humidity = unithumidityValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_humidity', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Humidity berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_humidity', 500, 'Internal Server Error')
        }
        });
    } else if (unitanemoValue !== null && unitanemoValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_anemo', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Anemo = unitanemoValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_anemo', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Anemo berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_anemo', 500, 'Internal Server Error')
        }
        });
    } else if (unitldrValue !== null && unitldrValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_ldr', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_LDR = unitldrValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_ldr', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_LDR berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_ldr', 500, 'Internal Server Error')
        }
        });
    } else if (unitultrasonicValue !== null && unitultrasonicValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_ultrasonic', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Ultrasonic = unitultrasonicValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_ultrasonic', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Ultrasonic berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_ultrasonic', 500, 'Internal Server Error')
        }
        });
    } else if (unittankpercentValue !== null && unittankpercentValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_tank_percentage', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Tank_Percentage = unittankpercentValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_tank_percentage', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Tank_Percentage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_tank_percentage', 500, 'Internal Server Error')
        }
        });
    } else if (unittankcapValue !== null && unittankcapValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_tank_capacity', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Tank_Capacity = unittankcapValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsensor.js', 'api/get/edit/sensor?unit_tank_capacity', 500, 'Gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Tank_Capacity berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsensor.js', 'api/get/edit/sensor?unit_tank_capacity', 500, 'Internal Server Error')
        }
        });
  } else {
    res.status(404).json({ error: 'Parameter tidak ada / parameter harus bernilai false/true'});
    addLogError('editsensor.js', 'api/get/edit/sensor', 404, 'Parameter tidak ada / parameter harus bernilai false/true')
  }
});

router.get('/edit/batch/sensor', (req, res) => {
    const waterphValue = parseFloat(req.query.water_ph); 
    const waterindexValue = req.query.water_index;
    const waterflowValue = parseFloat(req.query.water_flow);
    const waterflowindexValue = req.query.water_flow_index;
    const watertempValue = parseFloat(req.query.water_temp);
    const soilphValue = parseFloat(req.query.soil_ph);
    const soilindexValue = req.query.soil_index;
    const soilmoistureValue = parseFloat(req.query.soil_moisture);
    const soilmoistureindexValue = req.query.soil_moisture_index;
    const soiltempValue = parseFloat(req.query.soil_temp);
    const airtempValue = parseFloat(req.query.air_temp);
    const airhumidityValue = parseFloat(req.query.air_humidity);
    const anemoValue = parseFloat(req.query.anemo);
    const anemoindexValue = req.query.anemo_index;
    const ldrValue = parseFloat(req.query.ldr);
    const ldrindexValue = req.query.ldr_index;
    const ultrasonicValue = parseFloat(req.query.ultrasonic);
    const tankpercentValue = parseFloat(req.query.tank_percentage);
    const tankcapacityValue = parseFloat(req.query.tank_capacity);
    const unitphValue = req.query.unit_ph;
    const unitwaterValue = req.query.unit_water;
    const unitmoistureValue = req.query.unit_moisture;
    const unittempValue = req.query.unit_temp;
    const unithumidityValue = req.query.unit_humidity;
    const unitanemoValue = req.query.unit_anemo;
    const unitldrValue = req.query.unit_ldr;
    const unitultrasonicValue = req.query.unit_ultrasonic;
    const unittankpercentValue = req.query.unit_tank_percentage;
    const unittankcapValue = req.query.unit_tank_capacity;

    const isValidValueFloat = value => value !== null && value !== undefined && !isNaN(value);
    const isValidValueString = value => value !== null && value !== undefined;
    
    const arrayfloatvalue = [waterphValue, soilphValue, soilmoistureValue, soiltempValue, airtempValue, airhumidityValue, anemoValue, ldrValue, ultrasonicValue, tankpercentValue, tankcapacityValue];
    const arraystringvalue = [waterindexValue, soilindexValue, anemoindexValue, ldrindexValue, unitphValue, unitmoistureValue, unittempValue, unithumidityValue, unitanemoValue, unitldrValue, unitultrasonicValue, unittankpercentValue, unittankcapValue];
    
    if (!arrayfloatvalue.every(isValidValueFloat)) {
        res.status(400).json({ code: 400, error: 'Please insert full parameter & Query parameters should be either float other than "Unit & Index"' });
        addLogError('editsensor.js', 'api/get/edit/batch/sensor', 400, 'Please insert full parameter & Query parameters should be either float other than "Unit & Index"');
        return;
    }
    
    if (!arraystringvalue.every(isValidValueString)) {
        res.status(400).json({ code: 400, error: 'Please insert full parameter & Query parameters should be either String for "Unit & Index"' });
        addLogError('editsensor.js', 'api/get/edit/batch/sensor', 400, 'Please insert full parameter & Query parameters should be either String for "Unit & Index"');
        return;
    }    

    fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error: 'Failed to read JSON file' });
            addLogError('editsensor.js', 'api/get/edit/batch/sensor', 500, 'Failed to read JSON file')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Water_Ph = waterphValue;
            jsonContent.Water_Index = waterindexValue;
            jsonContent.Water_Flow = waterflowValue;
            jsonContent.Water_Flow_Index = waterflowindexValue;
            jsonContent.Water_Temperature = watertempValue;
            jsonContent.Soil_Ph = soilphValue;
            jsonContent.Soil_Index = soilindexValue;
            jsonContent.Soil_Moisture = soilmoistureValue
            jsonContent.Soil_Moisture_Index = soilmoistureindexValue
            jsonContent.Soil_Temperature = soiltempValue
            jsonContent.Air_Temperature = airtempValue
            jsonContent.Air_Humidity = airhumidityValue
            jsonContent.Anemo = anemoValue
            jsonContent.Anemo_Index = anemoindexValue
            jsonContent.LDR = ldrValue
            jsonContent.LDR_Index = ldrindexValue
            jsonContent.Ultrasonic = ultrasonicValue
            jsonContent.Tank_Percentage = tankpercentValue
            jsonContent.Tank_Capacity = tankcapacityValue
            jsonContent.Unit_Ph = unitphValue
            jsonContent.Unit_Water = unitwaterValue
            jsonContent.Unit_Moisture = unitmoistureValue
            jsonContent.Unit_Temperature = unittempValue
            jsonContent.Unit_Humidity = unithumidityValue
            jsonContent.Unit_Anemo = unitanemoValue
            jsonContent.Unit_LDR = unitldrValue
            jsonContent.Unit_Ultrasonic = unitultrasonicValue
            jsonContent.Unit_Tank_Percentage = unittankpercentValue
            jsonContent.Unit_Tank_Capacity = unittankcapValue

            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: 'Failed to write JSON' });
                    addLogError('editsensor.js', 'api/get/edit/batch/sensor', 500, 'Failed to read JSON file')
                    return;
                }
                res.status(200).json({ code: 200, msg: 'All values updated successfully' });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: 'Internal Server Error' });
            addLogError('editsensor.js', 'api/get/edit/batch/sensor', 500, 'Internal Server Error')
        }
    });
});

module.exports = router;