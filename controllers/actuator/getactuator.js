const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const axios = require("axios");
const performance = require("performance-now");

//path function
const addRT = require("../../function/addRT");
const addLogRequest = require("../../function/addLogRequest");
const addLogError = require("../../function/addLogError");

//path database
const filePath = "./database/main/actuator.json";
const actuatorRT = "./database/RT/actuator/actuatorRT.json";
const actuatorSingleRT = "./database/RT/actuator/actuatorSingleRT.json";

router.get("/actuator", (req, res) => {
  const start = performance();
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Terjadi kesalahan saat membaca file JSON:", err);
      res.status(500).json({ code: 500, error: "Internal Server Error" });
      addLogError('getactuactor.js', 'api/get/actuator', 500, 'Internal Server Error')
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      const formattedJson = JSON.stringify(jsonData, null, 2);
      res.setHeader("Content-Type", "application/json");
      res.send(formattedJson);
      const end = performance(); // Waktu setelah pemrosesan permintaan
      const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

      //console.log(`Waktu Ping ke Server(getactuator): ${pingTime} ms`);
      addRT(pingTime, actuatorRT); //add record array
      addLogRequest('getactuator.js', 'All', pingTime)
    } catch (error) {
      console.error("Terjadi kesalahan saat memformat JSON:", error);
      res.status(500).json({ code: 500, error: "Internal Server Error" });
      addLogError('getactuactor.js', 'api/get/actuator', 500, 'Internal Server Error')
    }
  });
});

router.get("/actuator/:div", (req, res) => {
  const bagian = req.params.div;
  //console.log(bagian)

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Terjadi kesalahan saat membaca file JSON:", err);
      res.status(500).json({ code: 500, error: "Internal Server Error" });
      addLogError('getactuactor.js', 'api/get/actuator/:div', 500, 'Internal Server Error')
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      if (!bagian) {
        const start = performance();
        const formattedJson = JSON.stringify(jsonData, null, 2);
        res.setHeader("Content-Type", "application/json");
        res.send(formattedJson);
        const end = performance(); // Waktu setelah pemrosesan permintaan
        const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

        //console.log(`Waktu Ping ke Server(getactuator): ${pingTime} ms`);
        addRT(pingTime, actuatorRT); //add record array
        addLogRequest('getactuator.js', 'All', pingTime)
        return;
      } else {
        if (bagian.toLowerCase() == "pump_tank") {
          const start = performance();
          const datasort = jsonData.Pump_Tank;
          const proccessingdata = {
            code: 200,
            Pump_Tank: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
          const end = performance(); // Waktu setelah pemrosesan permintaan
          const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

          //console.log(`Waktu Ping ke Server(getactuator): ${pingTime} ms`);
          addRT(pingTime, actuatorSingleRT); //add record array
          addLogRequest('getactuator.js', 'Pump_Tank', pingTime)
        } else if (bagian.toLowerCase() == "pump_booster") {
          const start = performance();
          const datasort = jsonData.Pump_Booster;
          const proccessingdata = {
            code: 200,
            Pump_Booster: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
          const end = performance(); // Waktu setelah pemrosesan permintaan
          const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

          //console.log(`Waktu Ping ke Server(getactuator): ${pingTime} ms`);
          addRT(pingTime, actuatorSingleRT); //add record array
          addLogRequest('getactuator.js', 'Pump_Booster', pingTime)
        } else if (bagian.toLowerCase() == "selenoid_valve") {
          const start = performance();
          const datasort = jsonData.Selenoid_Valve;
          const proccessingdata = {
            code: 200,
            Selenoid_Valve: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
          const end = performance(); // Waktu setelah pemrosesan permintaan
          const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

          //console.log(`Waktu Ping ke Server(getactuator): ${pingTime} ms`);
          addRT(pingTime, actuatorSingleRT); //add record array
          addLogRequest('getactuator.js', 'Selenoid_Valve', pingTime)
        } else if (bagian.toLowerCase() == "lamp") {
          const start = performance();
          const datasort = jsonData.Lamp;
          const proccessingdata = {
            code: 200,
            Lamp: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
          const end = performance(); // Waktu setelah pemrosesan permintaan
          const pingTime = (end - start).toFixed(2); // Menghitung selisih waktu dalam milidetik

          //console.log(`Waktu Ping ke Server(getactuator): ${pingTime} ms`);
          addRT(pingTime, actuatorSingleRT); //add record array
          addLogRequest('getactuator.js', 'Lamp', pingTime)
        } else {
          res
            .status(404)
            .json({
              code: 404,
              error:
                "query yang tersedia hanya : pump_tank, pump_booster, selenoid_valve, lamp",
            });
            addLogError('getactuactor.js', 'api/get/actuator/:div', 404, "query yang tersedia hanya : pump_tank, pump_booster, selenoid_valve, lamp")
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memformat JSON:", error);
      res.status(500).json({ code: 500, error: "Internal Server Error" });
      addLogError('getactuactor.js', 'api/get/actuator/:div', 500, 'Internal Server Error')
    }
  });
});

module.exports = router;
