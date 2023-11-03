const fs = require('fs').promises;
const path = require('path')
const axios = require('axios');
const performance = require('performance-now'); 

async function avgRT(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const json = JSON.parse(data);

        if (Array.isArray(json) && json.length > 0) {
            const sum = json.reduce((acc, val) => acc + val, 0);
            const average = sum / json.length;
            return average.toFixed(2);
        } else {
            return 0;
        }
    } catch (error) {
        throw "Error: " + error;
    }
}

module.exports = avgRT;
