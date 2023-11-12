const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')
const axios = require('axios');
const performance = require('performance-now');

//path database
const filePath = "./database/log/logerror.json";

router.get("/error", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Terjadi kesalahan saat membaca file JSON:", err);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
        return;
      } 
      try { 
        const jsonData = JSON.parse(data);
        const formattedJson = JSON.stringify(jsonData, null, 2);
        res.setHeader("Content-Type", "application/json");
        res.send(formattedJson);
        //console.log(`Waktu Ping ke Server(getsensor): ${pingTime} ms`);
      } catch (error) {
        console.error("Terjadi kesalahan saat memformat JSON:", error);
        res.status(500).json({ code: 500, error: "Internal Server Error" });
      }
    });
  });

  module.exports = router;