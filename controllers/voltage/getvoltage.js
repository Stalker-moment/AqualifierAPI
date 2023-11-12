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
const filePath = "./database/main/voltage.json";
const voltageRT = "./database/RT/voltage/voltageRT.json"
const voltageSingleRT = "./database/RT/voltage/voltageSingleRT.json"
const voltageBatchRT = "./database/RT/voltage/voltageBatchRT.json"

router.get("/voltage", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Terjadi kesalahan saat membaca file JSON:", err);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getvoltage.js', 'api/get/voltage', 500, 'Internal Server Error')
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
        addLogError('getvoltage.js', 'api/get/voltage', 500, 'Internal Server Error')
      }
    });
  });

router.get('/voltage/:div', (req, res) => {
    const bagian = req.params.div
  
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Terjadi kesalahan saat membaca file JSON:", err);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getvoltage.js', 'api/get/voltage/:div', 500, 'Internal Server Error')
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
            if(bagian.toLowerCase() == 'voltage'){
        
                const proccessingdata = {
                    code: 200, 
                    Solar_Voltage : jsonData.Solar_Voltage,
                    Battery1_Voltage : jsonData.Battery1_Voltage,
                    Battery2_Voltage : jsonData.Battery2_Voltage,
                    StepDown_Voltage : jsonData.StepDown_Voltage,
                    PLN_Voltage : jsonData.PLN_Voltage,
                    Inverter_Voltage : jsonData.Inverter_Voltage,
                    Unit_Voltage : jsonData.Unit_Voltage
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'battery'){
        
                const proccessingdata = {
                    code: 200,
                    Solar_Voltage : jsonData.Solar_Voltage,
                    Battery1_Voltage : jsonData.Battery1_Voltage,
                    Battery2_Voltage : jsonData.Battery2_Voltage,
                    Battery1_Capacity : jsonData.Battery1_Capacity,
                    Battery2_Capacity : jsonData.Battery2_Capacity,
                    StepDown_Voltage : jsonData.StepDown_Voltage,
                    Unit_Capacity : jsonData.Unit_Capacity,
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
                const end = performance(); // Waktu setelah pemrosesan permintaan
                const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

                addRT(pingTime, voltageBatchRT); //add record array
            } else if(bagian.toLowerCase() == 'pln'){
        
                const proccessingdata = {
                    code: 200,
                    PLN_Voltage: jsonData.PLN_Voltage,
                    PLN_Current: jsonData.PLN_Current,
                    PLN_Power: jsonData.PLN_Power,
                    PLN_Energy: jsonData.PLN_Energy,
                    PLN_Frequency: jsonData.PLN_Frequency,
                    PLN_PF: jsonData.PLN_PF,
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'inverter'){
        
                const proccessingdata = {
                    code: 200,
                    Inverter_Voltage: jsonData.Inverter_Voltage,
                    Inverter_Current: jsonData.Inverter_Current,
                    Inverter_Power: jsonData.Inverter_Power,
                    Inverter_Energy: jsonData.Inverter_Energy,
                    Inverter_Frequency: jsonData.Inverter_Frequency,
                    Inverter_PF: jsonData.Inverter_PF,
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'unit'){
        
                const proccessingdata = {
                    code: 200,
                    Unit_Voltage: jsonData.Unit_Voltage,
                    Unit_Capacity: jsonData.Unit_Capacity,
                    Unit_Current: jsonData.Unit_Current,
                    Unit_Power: jsonData.Unit_Power,
                    Unit_Energy: jsonData.Unit_Energy,
                    Unit_Frequency: jsonData.Unit_Frequency,
                    Unit_PF: jsonData.Unit_PF,
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'current'){
        
                const proccessingdata = {
                    code: 200,
                    PLN_Current : jsonData.PLN_Current,
                    Inverter_Current : jsonData.Inverter_Current,
                    Unit_Current : jsonData.Unit_Current
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'power'){
        
                const proccessingdata = {
                    code: 200,
                    PLN_Power : jsonData.PLN_Power,
                    Inverter_Power : jsonData.Inverter_Power,
                    Unit_Power : jsonData.Unit_Power
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'energy'){
        
                const proccessingdata = {
                    code: 200,
                    PLN_Energy : jsonData.PLN_Energy,
                    Inverter_Energy : jsonData.Inverter_Energy,
                    Unit_Energy : jsonData.Unit_Energy
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'frequency'){
        
                const proccessingdata = {
                    code: 200,
                    PLN_Frequency : jsonData.PLN_Frequency,
                    Inverter_Frequency : jsonData.Inverter_Frequency,
                    Unit_Frequency : jsonData.Unit_Frequency
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'pf'){
        
                const proccessingdata = {
                    code: 200,
                    PLN_PF : jsonData.PLN_PF,
                    Inverter_PF : jsonData.Inverter_PF,
                    Unit_PF : jsonData.Unit_PF
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'solar_voltage'){
        
                const datasort = jsonData.Solar_Voltage;
                const proccessingdata = {
                    code: 200,
                    Solar_Voltage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'battery1_voltage'){
        
                const datasort = jsonData.Battery1_Voltage;
                const proccessingdata = {
                    code: 200,
                    Battery1_Voltage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'battery2_voltage'){
        
                const datasort = jsonData.Battery2_Voltage;
                const proccessingdata = {
                    code: 200,
                    Battery2_Voltage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'battery1_capacity'){
        
                const datasort = jsonData.Battery1_Capacity;
                const proccessingdata = {
                    code: 200,
                    Battery1_Capacity : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'battery2_capacity'){
        
                const datasort = jsonData.Battery2_Capacity;
                const proccessingdata = {
                    code: 200,
                    Battery2_Capacity : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'stepdown_voltage'){
        
                const datasort = jsonData.StepDown_Voltage;
                const proccessingdata = {
                    code: 200,
                    StepDown_Voltage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'pln_voltage'){
        
                const datasort = jsonData.PLN_Voltage;
                const proccessingdata = {
                    code: 200,
                    PLN_Voltage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'pln_current'){
        
                const datasort = jsonData.PLN_Current;
                const proccessingdata = {
                    code: 200,
                    PLN_Current : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'pln_power'){
        
                const datasort = jsonData.PLN_Power;
                const proccessingdata = {
                    code: 200,
                    PLN_Power : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'pln_energy'){
        
                const datasort = jsonData.PLN_Energy;
                const proccessingdata = {
                    code: 200,
                    PLN_Energy : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'pln_frequency'){
        
                const datasort = jsonData.PLN_Frequency;
                const proccessingdata = {
                    code: 200,
                    PLN_Frequency : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'pln_pf'){
                const datasort = jsonData.PLN_PF;
                const proccessingdata = {
                    code: 200,
                    PLN_PF : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'inverter_voltage'){
                const datasort = jsonData.Inverter_Voltage;
                const proccessingdata = {
                    code: 200,
                    Inverter_Voltage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'inverter_current'){
                const datasort = jsonData.Inverter_Current;
                const proccessingdata = {
                    code: 200,
                    Inverter_Current : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'inverter_power'){
        
                const datasort = jsonData.Inverter_Power;
                const proccessingdata = {
                    code: 200,
                    Inverter_Power : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'inverter_energy'){
        
                const datasort = jsonData.Inverter_Energy;
                const proccessingdata = {
                    code: 200,
                    Inverter_Energy : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'inverter_frequency'){
        
                const datasort = jsonData.Inverter_Frequency;
                const proccessingdata = {
                    code: 200,
                    Inverter_Frequency : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'inverter_pf'){
        
                const datasort = jsonData.Inverter_PF;
                const proccessingdata = {
                    code: 200,
                    Inverter_PF : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'unit_voltage'){
        
                const datasort = jsonData.Unit_Voltage;
                const proccessingdata = {
                    code: 200,
                    Unit_Voltage : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagiann.toLowerCase() == 'unit_capacity'){
        
                const datasort = jsonData.Unit_Capacity;
                const proccessingdata = {
                    code: 200,
                    Unit_Capacity : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json"); 
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'unit_current'){
        
                const datasort = jsonData.Unit_Current;
                const proccessingdata = {
                    code: 200,
                    Unit_Current : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'unit_power'){
        
                const datasort = jsonData.Unit_Power;
                const proccessingdata = {
                    code: 200,
                    Unit_Power : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'unit_energy'){
        
                const datasort = jsonData.Unit_Energy;
                const proccessingdata = {
                    code: 200,
                    Unit_Energy : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'unit_frequency'){
        
                const datasort = jsonData.Unit_Frequency;
                const proccessingdata = {
                    code: 200,
                    Unit_Frequency : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else if(bagian.toLowerCase() == 'unit_pf'){
        
                const datasort = jsonData.Unit_PF;
                const proccessingdata = {
                    code: 200,
                    Unit_PF : datasort
                }
                const formattedJson = JSON.stringify(proccessingdata, null, 2);
                res.setHeader("Content-Type", "application/json");
                res.send(formattedJson);
            } else {
                res.status(404).json({ code: 404, error: "Query tidak ditemukan, Query yang tersedia : voltage, battery, pln, inverter, unit, current, power, energy, frequency, pf, solar_voltage, battery1_voltage, battery2_voltage, battery1_capacity, battery2_capacity, stepdown_voltage, pln_voltage, pln_current, pln_power, pln_energy, pln_frequency, pln_pf, inverter_voltage, inverter_current, inverter_power, inverter_energy, inverter_frequency, inverter_pf, unit_voltage, unit_current, unit_power, unit_energy, unit_frequency, unit_pf" });
                addLogError('getvoltage.js', 'api/get/voltage/:div', 404, "Query tidak ditemukan, Query yang tersedia : voltage, battery, pln, inverter, unit, current, power, energy, frequency, pf, solar_voltage, battery1_voltage, battery2_voltage, battery1_capacity, battery2_capacity, stepdown_voltage, pln_voltage, pln_current, pln_power, pln_energy, pln_frequency, pln_pf, inverter_voltage, inverter_current, inverter_power, inverter_energy, inverter_frequency, inverter_pf, unit_voltage, unit_current, unit_power, unit_energy, unit_frequency, unit_pf")
            }
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat memformat JSON:", error);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        addLogError('getvoltage.js', 'api/get/voltage/:div', 500, 'Internal Server Error')
      }
    });
  });

module.exports = router;