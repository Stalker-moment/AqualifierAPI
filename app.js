const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import module fs
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

//-------------------IMPORT CONTROLLER FILE-------------------
const getsystemController = require('./controllers/system/getsystem')
const editsystemController = require('./controllers/system/editsystem')

const getvoltageController = require('./controllers/voltage/getvoltage')
const editvoltageController = require('./controllers/voltage/editvoltage')

const getsensorController = require('./controllers/sensor/getsensor')
const editsensorController = require('./controllers/sensor/editsensor')

const getactuatorController = require('./controllers/actuator/getactuator')
const editactuatorController = require('./controllers/actuator/editactuator')

const getapiRTController = require('./controllers/api/RT/getRT')
const fileapiRTController = require('./controllers/api/RT//fileRT')
const fileapiErrorController = require('./controllers/api/error/fileError')

//IMPORT FUNCTION
const addLogRequest = require('./function/addLogRequest')
const addLogError = require('./function/addLogError')

//------------------------APP USE AREA--------------------------

//SYSTEM
app.use('/api/get', getsystemController);
app.use('/api/get', editsystemController);

//VOLTAGE
app.use('/api/get', getvoltageController);
app.use('/api/get', editvoltageController);

//SENSOR
app.use('/api/get', getsensorController);
app.use('/api/get', editsensorController);

//ACTUATOR
app.use('/api/get', getactuatorController);
app.use('/api/get', editactuatorController);

//API
app.use('/api/get', getapiRTController);
app.use('/api/file', fileapiRTController);
app.use('/api/file', fileapiErrorController);

/*
//test log function
app.get("/api/test", (req, res) => {
  addLogError('test.js', '/testing/function', 500, 'internal server error')
  addLogRequest('test.js', 'getdata', 9.0)
})*/



const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});