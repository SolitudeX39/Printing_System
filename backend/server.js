const snmp = require('net-snmp');
const axios = require('axios');
const express = require('express');
const mysql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

// LINE Notify token
const LINE_NOTIFY_TOKEN = "HjvhE48RR4VVGh1kJwxDcne4DbpeEBV0srAH2OaH5Jz";

// Database connection
const db = mysql.createConnection({host: "10.3.99.122", user: "devprt", password: "prt@1234", database: "PRT_Department"});

// Function to get current hour
function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}

// Function to query database
function queryDatabase(callback) {
    const sql = "SELECT IP, COMMUNITY, LOCATION_NAME FROM PRINTERS";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
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
            const status = varbinds[0]
                .value
                .toString();
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
function executeProcess() {
    const currentHour = getCurrentHour();
    if (currentHour >= 8 && currentHour <= 17) {
        queryDatabase((err, printers) => {
            if (err) {
                console.error("Error fetching printer data:", err);
                return;
            }

            printers.forEach(printer => {
                checkPrinterStatus(printer);
            });
        });
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
