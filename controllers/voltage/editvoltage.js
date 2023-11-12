const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');

//path json
const jsonFilePath = './database/main/voltage.json'
const jsonFilePathSingleRT = './database/RT/voltage/editvoltageSingleRT.json'
const jsonFilePathBatchRT = './database/RT/voltage/editvoltageBatchRT.json'

//path function 
const addRT = require('../../function/addRT');
const addLogRequest = require('../../function/addLogRequest')
const addLogError = require('../../function/addLogError')


router.get('/edit/voltage', (req, res) => {
    const solarvoltValue = parseFloat(req.query.solar_voltage); 
    const batt1voltValue = parseFloat(req.query.battery1_voltage); 
    const batt2voltValue = parseFloat(req.query.battery2_voltage); 
    const batt1capValue = parseFloat(req.query.battery1_capacity); 
    const batt2capValue = parseFloat(req.query.battery2_capacity); 
    const stepdownvolValue = parseFloat(req.query.stepdown_voltage); 
    const plnvoltValue = parseFloat(req.query.pln_voltage); 
    const plncurrentValue = parseFloat(req.query.pln_current); 
    const plnpowerValue = parseFloat(req.query.pln_power); 
    const plnenergyValue = parseFloat(req.query.pln_energy); 
    const plnfreqValue = parseFloat(req.query.pln_frequency); 
    const plnpfValue = parseFloat(req.query.pln_pf); 
    const invertervoltValue = parseFloat(req.query.inverter_voltage); 
    const invertercurrentValue = parseFloat(req.query.inverter_current); 
    const inverterpowerValue = parseFloat(req.query.inverter_power); 
    const inverterenergyValue = parseFloat(req.query.inverter_energy); 
    const inverterfreqValue = parseFloat(req.query.inverter_frequency); 
    const inverterpfValue = parseFloat(req.query.inverter_pf); 
    const unitvoltValue = req.query.unit_voltage; 
    const unitcapacityValue = req.query.unit_capacity;
    const unitcurrentValue = req.query.unit_current; 
    const unitpowerValue = req.query.unit_power; 
    const unitenergyValue = req.query.unit_energy; 
    const unitfreqValue = req.query.unit_frequency; 
    const unitpfValue = req.query.unit_pf; 

    if (solarvoltValue !== null && solarvoltValue !== undefined && !isNaN(solarvoltValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?solar_voltage', 500, 'Gagal membaca file JSON')
            return;
        }
    
        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Solar_Voltage = solarvoltValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?solar_voltage', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Solar_Voltage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?solar_voltage', 500, 'Internal Server Error')
        }
        });
    } else if (batt1voltValue !== null && batt1voltValue !== undefined && !isNaN(batt1voltValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery1_voltage', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Battery1_Voltage = batt1voltValue; // Mengubah nilai Pump_Tank menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?battery1_voltage', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Battery1_Voltage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery1_voltage', 500, 'Internal Server Error')
        }
        });
    } else if (batt2voltValue !== null && batt2voltValue !== undefined && !isNaN(batt2voltValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery2_voltage', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Battery2_Voltage = batt2voltValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?battery2_voltage', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Battery2_Voltage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery2_voltage', 500, 'Internal Server Error')
        }
        });
    } else if (batt1capValue !== null && batt1capValue !== undefined && !isNaN(batt1capValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery1_capacity', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Battery1_Capacity = batt1capValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?battery1_capacity', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Baterry1_Capacity berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery1_capacity', 500, 'Internal Server Error')
        }
        });
    } else if (batt2capValue !== null && batt2capValue !== undefined && !isNaN(batt2capValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery2_capacity', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Battery2_Capacity = batt2capValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?battery2_capacity', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Battery2_Capacity berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?battery2_capacity', 500, 'Internal Server Error')
        }
        });
    } else if (stepdownvolValue !== null && stepdownvolValue !== undefined && !isNaN(stepdownvolValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?stepdown_voltage', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.StepDown_Voltage = stepdownvolValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?stepdown_voltage', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value StepDown_Voltage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?stepdown_voltage', 500, 'Internal Server Error')
        }
        });
    } else if (plnvoltValue !== null && plnvoltValue !== undefined && !isNaN(plnvoltValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_voltage', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.PLN_Voltage = plnvoltValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?pln_voltage', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value PLN_Voltage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_voltage', 500, 'Internal Server Error')
        }
        });
    } else if (plncurrentValue !== null && plncurrentValue !== undefined && !isNaN(plncurrentValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_current', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.PLN_Current = plncurrentValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?pln_current', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value PLN_Current berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_current', 500, 'Internal Server Error')
        }
        });
    } else if (plnpowerValue !== null && plnpowerValue !== undefined && !isNaN(plnpowerValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_power', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.PLN_Power = plnpowerValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?pln_power', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value PLN_Power berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_power', 500, 'Internal Server Error')
        }
        });
    } else if (plnenergyValue !== null && plnenergyValue !== undefined && !isNaN(plnenergyValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_energy', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.PLN_Energy = plnenergyValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?pln_energy', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value PLN_Energy berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_energy', 500, 'Internal Server Error')
        }
        });
    } else if (plnfreqValue !== null && plnfreqValue !== undefined && !isNaN(plnfreqValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_frequency', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.PLN_Frequency = plnfreqValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?pln_frequency', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value PLN_Frequency berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_frequency', 500, 'Internal Server Error')
        }
        });
    } else if (plnpfValue !== null && plnpfValue !== undefined && !isNaN(plnpfValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_pf', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.PLN_PF = plnpfValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?pln_pf', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value PLN_PF berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?pln_pf', 500, 'Internal Server Error')
        }
        });
    } else if (invertervoltValue !== null && invertervoltValue !== undefined && !isNaN(invertervoltValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_voltage', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Inverter_Voltage = invertervoltValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_voltage', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Inverter_Voltage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_voltage', 500, 'Internal Server Error')
        }
        });
    } else if (invertercurrentValue !== null && invertercurrentValue !== undefined && !isNaN(invertercurrentValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_current', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Inverter_Current = invertercurrentValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_current', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Inverter_Current berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_current', 500, 'Internal Server Error')
        }
        });
    } else if (inverterpowerValue !== null && inverterpowerValue !== undefined && !isNaN(inverterpowerValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_power', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Inverter_Power = inverterpowerValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_power', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Inverter_Power berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_power', 500, 'Internal Server Error')
        }
        });
    } else if (inverterenergyValue !== null && inverterenergyValue !== undefined && !isNaN(inverterenergyValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_energy', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Inverter_Energy = inverterenergyValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_energy', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Inverter_Energy berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_energy', 500, 'Internal Server Error')
        }
        });
    } else if (inverterfreqValue !== null && inverterfreqValue !== undefined && !isNaN(inverterfreqValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_frequency', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Inverter_Frequency = inverterfreqValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_frequency', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Inverter_Frequency berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_frequency', 500, 'Internal Server Error')
        }
        });
    } else if (inverterpfValue !== null && inverterpfValue !== undefined && !isNaN(inverterpfValue)) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_pf', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Inverter_PF = inverterpfValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_pf', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Inverter_PF berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?inverter_pf', 500, 'Internal Server Error')
        }
        });
    } else if (unitvoltValue !== null && unitvoltValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_voltage', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Voltage = unitvoltValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?unit_voltage', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Voltage berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_voltage', 500, 'Internal Server Error')
        }
        });
    } else if(unitcapacityValue !== null && unitcapacityValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_capacity', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Capacity = unitcapacityValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                    addLogError('editvoltage.js', 'api/get/edit/voltage?unit_capacity', 500, 'gagal menulis JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: "value Unit_Capacity berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_capacity', 500, 'Internal Server Error')
        }
        });
    } else if (unitcurrentValue !== null && unitcurrentValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_current', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Current = unitcurrentValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?unit_current', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Current berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_current', 500, 'Internal Server Error')
        }
        });
    } else if (unitpowerValue !== null && unitpowerValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_power', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Power = unitpowerValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?unit_power', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Power berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_power', 500, 'Internal Server Error')
        }
        });
    } else if (unitenergyValue !== null && unitenergyValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_energy', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Energy = unitenergyValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?unit_energy', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Energy berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_energy', 500, 'Internal Server Error')
        }
        });
    } else if (unitfreqValue !== null && unitfreqValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_frequency', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_Frequency = unitfreqValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?unit_frequency', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_Frequency berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_frequency', 500, 'Internal Server Error')
        }
        });
    } else if (unitpfValue !== null && unitpfValue !== undefined) {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error : 'Gagal membaca file JSON' });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_pf', 500, 'Gagal membaca file JSON')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Unit_PF = unitpfValue; // Mengubah nilai Pump_Booster menjadi true
            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).json({ code: 500, error: "gagal menulis JSON" });
                addLogError('editvoltage.js', 'api/get/edit/voltage?unit_pf', 500, 'gagal menulis JSON')
                return;
            }
            res.status(200).json({ code: 200, msg: "value Unit_PF berhasil diubah" });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: "Internal Server Error" });
            addLogError('editvoltage.js', 'api/get/edit/voltage?unit_pf', 500, 'Internal Server Error')
        }
        });
  } else {
    res.status(404).json({ error: 'Parameter tidak ada / parameter harus dalam format float'});
    addLogError('editvoltage.js', 'api/get/edit/voltage', 404, 'Parameter tidak ada / parameter harus dalam format float')
  }
});

router.get('/edit/batch/voltage', (req, res) => {
    const solarvoltValue = parseFloat(req.query.solar_voltage); 
    const batt1voltValue = parseFloat(req.query.battery1_voltage); 
    const batt2voltValue = parseFloat(req.query.battery2_voltage); 
    const batt1capValue = parseFloat(req.query.battery1_capacity); 
    const batt2capValue = parseFloat(req.query.battery2_capacity); 
    const stepdownvolValue = parseFloat(req.query.stepdown_voltage); 
    const plnvoltValue = parseFloat(req.query.pln_voltage); 
    const plncurrentValue = parseFloat(req.query.pln_current); 
    const plnpowerValue = parseFloat(req.query.pln_power); 
    const plnenergyValue = parseFloat(req.query.pln_energy); 
    const plnfreqValue = parseFloat(req.query.pln_frequency); 
    const plnpfValue = parseFloat(req.query.pln_pf); 
    const invertervoltValue = parseFloat(req.query.inverter_voltage); 
    const invertercurrentValue = parseFloat(req.query.inverter_current); 
    const inverterpowerValue = parseFloat(req.query.inverter_power); 
    const inverterenergyValue = parseFloat(req.query.inverter_energy); 
    const inverterfreqValue = parseFloat(req.query.inverter_frequency); 
    const inverterpfValue = parseFloat(req.query.inverter_pf); 
    const unitvoltValue = req.query.unit_voltage; 
    const unitcapacityValue = req.query.unit_capacity;
    const unitcurrentValue = req.query.unit_current; 
    const unitpowerValue = req.query.unit_power; 
    const unitenergyValue = req.query.unit_energy; 
    const unitfreqValue = req.query.unit_frequency; 
    const unitpfValue = req.query.unit_pf; 

    const isValidValueFload = value => value !== null && value !== undefined && !isNaN(value);
    const isValidValueString = value => value !== null && value !== undefined;

    const arrayfloatvalue = [solarvoltValue, batt1voltValue, batt2voltValue, batt1capValue, batt2capValue, stepdownvolValue
                            , plnvoltValue, plncurrentValue, plnpowerValue, plnenergyValue, plnfreqValue, plnpfValue
                            , invertervoltValue, invertercurrentValue, inverterpowerValue, inverterenergyValue, inverterfreqValue, inverterpfValue];
    const arraystringvalue = [unitvoltValue, unitcurrentValue, unitpowerValue, unitenergyValue, unitfreqValue, unitpfValue];

    if (!arrayfloatvalue.every(isValidValueFload)) {
        res.status(400).json({ code: 400, error: 'Please insert full parameter & Query parameters should be valid float other than "Unit"' });
        addLogError('editvoltage.js', 'api/get/edit/batch/voltage', 400, 'Please insert valid float for parameters other than "Unit"');
        return;
    }    

    if (!arraystringvalue.every(isValidValueString)) {
        res.status(400).json({ code: 400, error: 'Please insert full parameter & Query parameters should be either String for "Unit"' });
        addLogError('editvoltage.js', 'api/get/edit/batch/voltage', 400, 'Please insert full parameter & Query parameters should be either String for "Unit"')
        return;
    }

    fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, error: 'Failed to read JSON file' });
            addLogError('editvoltage.js', 'api/get/edit/batch/voltage', 500, 'Failed to read JSON file')
            return;
        }

        try {
            const jsonContent = JSON.parse(data);
            jsonContent.Solar_Voltage = solarvoltValue
            jsonContent.Battery1_Voltage = batt1voltValue
            jsonContent.Battery2_Voltage = batt2voltValue
            jsonContent.Battery1_Capacity = batt1capValue
            jsonContent.Battery2_Capacity = batt2capValue
            jsonContent.StepDown_Voltage = stepdownvolValue
            jsonContent.PLN_Voltage = plnvoltValue
            jsonContent.PLN_Current = plncurrentValue
            jsonContent.PLN_Power = plnpowerValue
            jsonContent.PLN_Energy = plnenergyValue
            jsonContent.PLN_Frequency = plnfreqValue
            jsonContent.PLN_PF = plnpfValue
            jsonContent.Inverter_Voltage = invertervoltValue
            jsonContent.Inverter_Current = invertercurrentValue
            jsonContent.Inverter_Power = inverterpowerValue
            jsonContent.Inverter_Energy = inverterenergyValue
            jsonContent.Inverter_Frequency = inverterfreqValue
            jsonContent.Inverter_PF = inverterpfValue
            jsonContent.Unit_Voltage = unitvoltValue
            jsonContent.Unit_Capacity = unitcapacityValue
            jsonContent.Unit_Current = unitcurrentValue
            jsonContent.Unit_Power = unitpowerValue
            jsonContent.Unit_Energy = unitenergyValue
            jsonContent.Unit_Frequency = unitfreqValue
            jsonContent.Unit_PF = unitpfValue

            fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ code: 500, error: 'Failed to write JSON' });
                    addLogError('editvoltage.js', 'api/get/edit/batch/voltage', 500, 'Failed to write JSON')
                    return;
                }
                res.status(200).json({ code: 200, msg: 'All values updated successfully' });
            });
        } catch (err) {
            res.status(500).json({ code: 500, error: 'Internal Server Error' });
            addLogError('editvoltage.js', 'api/get/edit/batch/voltage', 500, 'Internal Server Error')
        }
    });
});

module.exports = router;