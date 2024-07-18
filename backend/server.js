const snmp = require('net-snmp');
const axios = require('axios');
const express = require('express');
const { connectToDatabase } = require('./config/dbCon.js'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

// LINE Notify token
const LINE_NOTIFY_TOKEN = "HjvhE48RR4VVGh1kJwxDcne4DbpeEBV0srAH2OaH5Jz";

// Function to get current hour
function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}

// Function to query database
async function queryDatabase() {
    const pool = await connectToDatabase();
    const sql = "SELECT IP, COMMUNITY, LOCATION_NAME FROM PRINTERS";
    try {
        const result = await pool.request().query(sql);
        return result.recordset;
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}

// Function to send LINE Notify
function sendLineNotify(message) {
    axios.post('https://notify-api.line.me/api/notify', `message=${encodeURIComponent(message)}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`
        }
    }).then(response => {
        console.log('Notification sent:', response.data);
    }).catch(error => {
        console.error('Error sending notification:', error);
    });
}

// Function to check printer status
function checkPrinterStatus(printer) {
    const session = snmp.createSession(printer.IP, printer.COMMUNITY);
    const oid = "1.3.6.1.2.1.43.11.1.1.9.1.1"; // Replace with actual OID

    session.get([oid], (error, varbinds) => {
        if (error) {
            console.error(error);
        } else {
            const status = varbinds[0].value.toString();
            console.log(`Printer ${printer.LOCATION_NAME} status: ${status}`);

            // Example condition for notifying (replace with actual logic)
            if (status !== "OK") {
                sendLineNotify(`Printer at ${printer.LOCATION_NAME} has an issue: ${status}`);
            }
        }
    });

    session.close();
}

// Main function to execute the process
async function executeProcess() {
    const currentHour = getCurrentHour();
    if (currentHour >= 8 && currentHour <= 17) {
        try {
            const printers = await queryDatabase();
            printers.forEach(printer => {
                checkPrinterStatus(printer);
            });
        } catch (err) {
            console.error("Error fetching printer data:", err);
        }
    } else {
        console.log("Outside working hours, skipping check.");
    }
}

// Schedule to run every 5 minutes
setInterval(executeProcess, 5 * 60 * 1000);

// Start Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
