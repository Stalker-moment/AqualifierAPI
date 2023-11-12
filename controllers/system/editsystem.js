const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');

const jsonFilePath = './database/main/system.json'
const jsonFilePathSingleRT = './database/RT/system/editsystemSingleRT.json'
const jsonFilePathBatchRT = './database/RT/system/editsystemBatchRT.json'

//path function 
const addRT = require('../../function/addRT');
const addLogRequest = require('../../function/addLogRequest')
const addLogError = require('../../function/addLogError')

router.get('/edit/system', (req, res) => {
    const switchValue = req.query.switch; // Mendapatkan nilai switch dari query parameter
    const autoValue = req.query.auto;
    const plnValue = req.query.pln;
    const pltsValue = req.query.plts;

    if (switchValue === 'true') {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?switch=true', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Switch = true; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?switch=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "switch diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?switch=true', 500, 'Internal Server Error')
        }
        });
    } else if(switchValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?switch=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Switch = false; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?switch=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200,  msg: "switch diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?switch=false', 500, 'Internal Server Error')
        }
        });
    } else if(autoValue == 'true'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?auto=true', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Auto = true; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?auto=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Auto diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?auto=true', 500, 'Internal Server Error')
        }
        });
    } else if(autoValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?auto=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Auto = false; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?auto=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "Auto diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?auto=false', 500, 'Internal Server Error')
        }
        });
    } else if(plnValue == 'true'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?pln=true', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            if ((plnValue === 'true' && jsonContent.PLTS === true) || (plnValue === 'false' && jsonContent.PLTS === false)) {
                res.status(400).json({ code: 400, error: 'PLN and PLTS values should be different (true/false)' });
                addLogError('editsystem.js', 'api/get/edit/system?pln=true', 500, 'PLN and PLTS values should be different (true/false)')
                return;
            }
            jsonContent.PLN = true; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?pln=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "PLN diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?pln=true', 500, 'Internal Server Error')
        }
        });
    } else if(plnValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?pln=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            if ((plnValue === 'true' && jsonContent.PLTS === true) || (plnValue === 'false' && jsonContent.PLTS === false)) {
                res.status(400).json({ code: 400, error: 'PLN and PLTS values should be different (true/false)' });
                addLogError('editsystem.js', 'api/get/edit/system?pln=false', 500, 'PLN and PLTS values should be different (true/false)')
                return;
            }
            jsonContent.PLN = false; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?pln=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "PLN diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?pln=false', 500, 'Internal Server Error')
        }
        });
    } else if(pltsValue == 'true'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?plts=true', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            if ((jsonContent.PLN === true && pltsValue === 'true') || (jsonContent.PLN === false && pltsValue === 'false')) {
                res.status(400).json({ code: 400, error: 'PLN and PLTS values should be different (true/false)' });
                addLogError('editsystem.js', 'api/get/edit/system?plts=true', 500, 'PLN and PLTS values should be different (true/false)')
                return;
            }
            jsonContent.PLTS = true; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?plts=true', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "PLTS diubah menjadi true" });
            });
        } catch (err) {
            res.status(500).json({ code: 500,  error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?plts=true', 500, 'Internal Server Error')
        }
        });
    } else if(pltsValue == 'false'){
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editsystem.js', 'api/get/edit/system?plts=false', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            if ((jsonContent.PLN === true && pltsValue === 'true') || (jsonContent.PLN === false && pltsValue === 'false')) {
                res.status(400).json({ code: 400, error: 'PLN and PLTS values should be different (true/false)' });
                addLogError('editsystem.js', 'api/get/edit/system?plts=false', 500, 'PLN and PLTS values should be different (true/false)')
                return;
            }
            jsonContent.PLTS = false; // Mengubah nilai Switch menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editsystem.js', 'api/get/edit/system?plts=false', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "PLTS diubah menjadi false" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editsystem.js', 'api/get/edit/system?plts=false', 500, 'Internal Server Error') 
        }
        });
  } else {
    res.status(404).json({ error: 'Parameter tidak ada / parameter harus bernilai false/true'});
    addLogError('editsystem.js', 'api/get/edit/system', 404, 'Parameter tidak ada / parameter harus bernilai false/true') 
  }
});

router.get('/edit/batch/system', (req, res) => {
    const switchValue = req.query.switch;
    const autoValue = req.query.auto;
    const plnValue = req.query.pln;
    const pltsValue = req.query.plts;

    const isValidValue = value => value === 'true' || value === 'false';

    // Check if the query parameters are valid (either 'true' or 'false')
    if (![switchValue, autoValue, plnValue, pltsValue].every(isValidValue)) {
        res.status(400).json({ code: 400, error: 'Please insert full parameter & Query parameters should be either true or false' });
        addLogError('editsystem.js', 'api/get/edit/batch/system', 400, 'PLN and PLTS values should be different (true/false)')
        return;
    }

    if ((plnValue === 'true' && pltsValue === 'true') || (plnValue === 'false' && pltsValue === 'false')) {
        res.status(400).json({ code: 400, error: 'PLN and PLTS values should be different (true/false)' });
        addLogError('editsystem.js', 'api/get/edit/batch/system', 400, 'PLN and PLTS values should be different (true/false)')
        return;
    }

    fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error: 'Failed to read JSON file' });
            addLogError('editsystem.js', 'api/get/edit/batch/system', 500, 'Failed to read JSON file')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Switch = switchValue === 'true';
            jsonContent.Auto = autoValue === 'true';
            jsonContent.PLN = plnValue === 'true';
            jsonContent.PLTS = pltsValue === 'true';

            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: 'Failed to write JSON' });
                    addLogError('editsystem.js', 'api/get/edit/batch/system', 500, 'Failed to write JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: 'All values updated successfully' });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: 'Internal Server Error' });
            addLogError('editsystem.js', 'api/get/edit/batch/system', 500, 'Internal Server Error')
        }
    });
});

router.get('/edit/batch/system/onlymcu', (req, res) => {
    const plnValue = req.query.pln;
    const pltsValue = req.query.plts;
    // Check if the query parameters are valid (either 'true' or 'false')

    const isValidValue = value => value === 'true' || value === 'false';
    
    if (![plnValue, pltsValue].every(isValidValue)) {
        res.status(400).json({ code: 400, error: 'Please insert full parameter & Query parameters should be either true or false' });
        addLogError('editsystem.js', 'api/get/edit/batch/system/onlymcu', 400, 'PLN and PLTS values should be different (true/false)')
        return;
    }

    if ((plnValue === 'true' && pltsValue === 'true') || (plnValue === 'false' && pltsValue === 'false')) {
        res.status(400).json({ code: 400, error: 'PLN and PLTS values should be different (true/false)' });
        addLogError('editsystem.js', 'api/get/edit/batch/system/onlymcu', 400, 'PLN and PLTS values should be different (true/false)')
        return;
    }

    fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error: 'Failed to read JSON file' });
            addLogError('editsystem.js', 'api/get/edit/batch/system/onlymcu', 500, 'Failed to read JSON file')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.PLN = plnValue === 'true';
            jsonContent.PLTS = pltsValue === 'true';

            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: 'Failed to write JSON' });
                    addLogError('editsystem.js', 'api/get/edit/batch/system/onlymcu', 500, 'Failed to write JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: 'All values updated successfully' });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: 'Internal Server Error' });
            addLogError('editsystem.js', 'api/get/edit/batch/system/onlymcu', 500, 'Internal Server Error')
        }
    });
});

module.exports = router;




