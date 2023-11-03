const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');

//path database get
const systemRT = "./database/RT/system/systemRT.json"
const systemSingleRT = "./database/RT/system/systemSingleRT.json"
const sensorRT = "./database/RT/sensor/sensorRT.json"
const sensorSingleRT = "./database/RT/sensor/sensorSingleRT.json"
const sensorBatchRT = "./database/RT/sensor/sensorBatchRT.json"
const voltageRT = "./database/RT/voltage/voltageRT.json"
const voltageSingleRT = "./database/RT/voltage/voltageSingleRT.json"
const voltageBatchRT = "./database/RT/voltage/voltageBatchRT.json"
const actuatorRT = "./database/RT/actuator/actuatorRT.json"
const actuatorSingleRT = "./database/RT/actuator/actuatorSingleRT.json"

//path database edit
const systemSingleRTedit = "./database/RT/system/editsystemSingleRT.json"
const systemBatchRTedit = "./database/RT/system/editsystemBatchRT.json"
const sensorSingleRTedit = "./database/RT/sensor/editsensorSingleRT.json"
const sensorBatchRTedit = "./database/RT/sensor/editsensorBatchRT.json"
const voltageSingleRTedit = "./database/RT/voltage/editvoltageSingleRT.json"
const voltageBatchRTedit = "./database/RT/voltage/editvoltageBatchRT.json"
const actuatorSingleRTedit = "./database/RT/actuator/editactuatorSingleRT.json"
const actuatorBatchRTedit = "./database/RT/actuator/editactuatorBatchRT.json"

//path function 
const avgRT = require('../../../function/avgRT');
const countArray = require('../../../function/countArray');

router.get("/getrt", async(req, res) => {
      try {
        //TOTAL GET
        const systemRTotal = await countArray(systemRT);
        const systemSingleRTotal = await countArray(systemSingleRT);
        const sensorRTotal = await countArray(sensorRT);
        const sensorSingleRTotal = await countArray(sensorSingleRT);
        const sensorBatchRTotal = await countArray(sensorBatchRT);
        const voltageRTotal = await countArray(voltageRT);
        const voltageSingleRTotal = await countArray(voltageSingleRT);
        const voltageBatchRTotal = await countArray(voltageBatchRT);
        const actuatorRTotal = await countArray(actuatorRT);
        const actuatorSingleRTotal = await countArray(actuatorSingleRT);

        //TOTAL EDIT
        const systemSingleRTeditTotal = await countArray(systemSingleRTedit);
        const systemBatchRTeditTotal = await countArray(systemBatchRTedit);
        const sensorSingleRTeditTotal = await countArray(sensorSingleRTedit);
        const sensorBatchRTeditTotal = await countArray(sensorBatchRTedit);
        const voltageSingleRTeditTotal = await countArray(voltageSingleRTedit);
        const voltageBatchRTeditTotal = await countArray(voltageBatchRTedit);
        const actuatorSingleRTeditTotal = await countArray(actuatorSingleRTedit);
        const actuatorBatchRTeditTotal = await countArray(actuatorBatchRTedit);
        
        //AVERAGE
        const systemRTresult = await avgRT(systemRT);
        const systemSingleRTresult = await avgRT(systemSingleRT);
        const sensorRTresult = await avgRT(sensorRT);
        const sensorSingleRTresult = await avgRT(sensorSingleRT);
        const sensorBatchRTresult = await avgRT(sensorBatchRT);
        const voltageRTresult = await avgRT(voltageRT);
        const voltageSingleRTresult = await avgRT(voltageSingleRT);
        const voltageBatchRTresult = await avgRT(voltageBatchRT);
        const actuatorRTresult = await avgRT(actuatorRT);
        const actuatorSingleRTresult = await avgRT(actuatorSingleRT);

        //AVERAGE EDIT
        const systemSingleRTeditresult = await avgRT(systemSingleRTedit);
        const systemBatchRTeditresult = await avgRT(systemBatchRTedit);
        const sensorSingleRTeditresult = await avgRT(sensorSingleRTedit);
        const sensorBatchRTeditresult = await avgRT(sensorBatchRTedit);
        const voltageSingleRTeditresult = await avgRT(voltageSingleRTedit);
        const voltageBatchRTeditresult = await avgRT(voltageBatchRTedit);
        const actuatorSingleRTeditresult = await avgRT(actuatorSingleRTedit);
        const actuatorBatchRTeditresult = await avgRT(actuatorBatchRTedit);

        const jsonData = {
          code: 200,
          total:{
            get:{
              System: systemRTotal,
              SystemSingle : systemSingleRTotal,
              Sensor : sensorRTotal,
              SensorSingle : sensorSingleRTotal,
              SensorBatch : sensorBatchRTotal,
              Voltage : voltageRTotal,
              VoltageSingle: voltageSingleRTotal,
              VoltageBatch : voltageBatchRTotal,
              Actuator : actuatorRTotal,
              ActuatorSingle : actuatorSingleRTotal
            },
            edit:{
              SystemSingle : systemSingleRTeditTotal,
              SystemBatch : systemBatchRTeditTotal,
              SensorSingle : sensorSingleRTeditTotal,
              SensorBatch : sensorBatchRTeditTotal,
              VoltageSingle: voltageSingleRTeditTotal,
              VoltageBatch : voltageBatchRTeditTotal,
              ActuatorSingle : actuatorSingleRTeditTotal,
              ActuatorBatch : actuatorBatchRTeditTotal
            }
          },
          avg:{
            get:{
              UnitRT : "ms",
              System: systemRTresult,
              SystemSingle : systemSingleRTresult,
              Sensor : sensorRTresult,
              SensorSingle : sensorSingleRTresult,
              SensorBatch : sensorBatchRTresult,
              Voltage : voltageRTresult,
              VoltageSingle: voltageSingleRTresult,
              VoltageBatch : voltageBatchRTresult,
              Actuator : actuatorRTresult,
              ActuatorSingle : actuatorSingleRTresult
            },
            edit:{
              SystemSingle : systemSingleRTeditresult,
              SystemBatch : systemBatchRTeditresult,
              SensorSingle : sensorSingleRTeditresult,
              SensorBatch : sensorBatchRTeditresult,
              VoltageSingle: voltageSingleRTeditresult,
              VoltageBatch : voltageBatchRTeditresult,
              ActuatorSingle : actuatorSingleRTeditresult,
              ActuatorBatch : actuatorBatchRTeditresult
            }
          }
        }
        const formattedJson = JSON.stringify(jsonData, null, 2);
        res.setHeader("Content-Type", "application/json");
        res.send(formattedJson);
      } catch (error) {
        console.error("Terjadi kesalahan saat memformat JSON:", error);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
      }
  });

module.exports = router;