const fs = require('fs').promises;
const path = require('path')
const axios = require('axios');
const performance = require('performance-now'); 

async function countArray(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const json = JSON.parse(data);

        if (Array.isArray(json) && json.length > 0) {
            return json.length;
        } else {
            return 0
        }
    } catch (error) {
        throw "Error: " + error;
    }
}

module.exports = countArray;