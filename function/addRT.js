const fs = require('fs');
const path = require('path')
const axios = require('axios');
const performance = require('performance-now'); 

function addRT(value, filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        try {
            const json = JSON.parse(data);
            const floatValue = parseFloat(value); // Konversi ke float

            if (!isNaN(floatValue)) { // Pastikan nilai bisa dikonversi ke float
                json.push(floatValue);

                fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error("Error writing to the file:", err);
                    } else {
                        //console.log(`Successfully added ${floatValue} to the file at ${filePath}`);
                    }
                });
            } else {
                console.error("Nilai tidak dapat diubah menjadi float:", value);
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
}

module.exports = addRT;