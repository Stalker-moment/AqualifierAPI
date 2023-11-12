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
        const formattedJson = JSON.stringify(jsonData, null, 2);
        res.setHeader("Content-Type", "application/json");
        res.send(formattedJson);
        return;
      } else {
        if (bagian.toLowerCase() == "pump_tank") {

          const datasort = jsonData.Pump_Tank;
          const proccessingdata = {
            code: 200,
            Pump_Tank: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
        } else if (bagian.toLowerCase() == "pump_booster") {

          const datasort = jsonData.Pump_Booster;
          const proccessingdata = {
            code: 200,
            Pump_Booster: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
        } else if (bagian.toLowerCase() == "selenoid_valve") {

          const datasort = jsonData.Selenoid_Valve;
          const proccessingdata = {
            code: 200,
            Selenoid_Valve: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
        } else if (bagian.toLowerCase() == "lamp") {

          const datasort = jsonData.Lamp;
          const proccessingdata = {
            code: 200,
            Lamp: datasort,
          };
          const formattedJson = JSON.stringify(proccessingdata, null, 2);
          res.setHeader("Content-Type", "application/json");
          res.send(formattedJson);
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
