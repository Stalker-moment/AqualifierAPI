const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');

const jsonFilePath = './database/main/actuator.json'
const jsonFilePathSingleRT = './database/RT/actuator/editactuatorSingleRT.json'
const jsonFilePathBatchRT = './database/RT/actuator/editactuatorBatchRT.json'

//path function 
const addRT = require('../../function/addRT');
const addLogRequest = require('../../function/addLogRequest')
const addLogError = require('../../function/addLogError')

router.get('/edit/actuator', (req, res) => {
    const pumptankValue = req.query.pump_tank; 
    const pumpboosterValue = req.query.pump_boost;
    const selenoidValue = req.query.selenoid;
    const lampValue = req.query.lamp;

    if (pumptankValue === 'true') {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_tank=true', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Pump_Tank = true; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?pump_tank=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Pump_Tank diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_tank=true', 500, 'Internal Server Error')
        }
        });
    } else if(pumptankValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_tank=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Pump_Tank = false; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?pump_tank=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Pump_Tank diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_tank=false', 500, 'Internal Server Error')
        }
        });
    } else if(pumpboosterValue == 'true'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_boost=true', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Pump_Booster = true; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?pump_boost=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Pump_Booster diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_boost=true', 500, 'Internal Server Error')
        }
        });
    } else if(pumpboosterValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_boost=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Pump_Booster = false; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?pump_boost=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Pump_Booster diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?pump_boost=false', 500, 'Internal Server Error')
        }
        });
    } else if(selenoidValue == 'true'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?selenoid=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Selenoid_Valve = true; // Mengubah nilai Selenoid_Valve menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?selenoid=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Selenoid_Valve diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?selenoid=true', 500, 'Internal Server Error')
        }
        });
    } else if(selenoidValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?selenoid=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Selenoid_Valve = false; // Mengubah nilai Selenoid_Valve menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?selenoid=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Selenoid_Valve diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?selenoid=false', 500, 'Internal Server Error')
        }
        });
    } else if(lampValue == 'true'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?lamp=true', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Lamp = true; // Mengubah nilai Lamp menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?lamp=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Lamp diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?lamp=true', 500, 'Internal Server Error')
        }
        });
    } else if(lampValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editactuactor.js', 'api/get/edit/actuator?lamp=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Lamp = false; // Mengubah nilai Lamp menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editactuactor.js', 'api/get/edit/actuator?lamp=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Lamp diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editactuactor.js', 'api/get/edit/actuator?lamp=false', 500, 'Internal Server Error')
        }
        });
  } else {
    res.status(404).json({ code: 404, error: 'Parameter tidak ada / parameter harus bernilai false/true'});
    addLogError('editactuactor.js', 'api/get/edit/actuator', 404, 'Parameter tidak ada / parameter harus bernilai false/true')
  }
});

router.get('/edit/batch/actuator', (req, res) => {
    const pumptankValue = req.query.pumptank; 
    const pumpboosterValue = req.query.pumpboost;
    const selenoidValue = req.query.selenoid;
    const lampValue = req.query.lamp;

    const isValidValue = value => value === 'true' || value === 'false';

    // Check if the query parameters are valid (either 'true' or 'false')
    if (![pumptankValue, pumpboosterValue, selenoidValue, lampValue].every(isValidValue)) {
        res.status(400).json({ code: 400, error: 'Please insert full parameter & Query parameters should be either true or false' });
        addLogError('editactuactor.js', 'api/get/edit/batch/actuator', 400, 'Please insert full parameter & Query parameters should be either true or false')
        return;
    }

    fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error: 'Failed to read JSON file' });
            addLogError('editactuactor.js', 'api/get/edit/batch/actuator', 500, 'Failed to read JSON file')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Pump_Tank = pumptankValue === 'true';
            jsonContent.Pump_Booster = pumpboosterValue === 'true';
            jsonContent.Selenoid_Valve = selenoidValue === 'true';
            jsonContent.Lamp = lampValue === 'true';

            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: 'Failed to write JSON' });
                    addLogError('editactuactor.js', 'api/get/edit/batch/actuator', 500, 'Failed to write JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: 'All values updated successfully' });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: 'Internal Server Error' });
            addLogError('editactuactor.js', 'api/get/edit/batch/actuator', 500, 'Internal Server Error')
        }
    });
});

module.exports = router;




