const sql = require('mssql');
const snmp = require('net-snmp');
const axios = require('axios');
const express = require('express');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

// LINE Notify token
const LINE_NOTIFY_TOKEN = "HjvhE48RR4VVGh1kJwxDcne4DbpeEBV0srAH2OaH5Jz";

// Database configuration
const dbConfig = {
    user: 'devprt',
    password: 'prt@1234',
    server: '10.3.99.122',
    database: 'PRT_Management',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

// Connect to the database
const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to the database');
        return pool;
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
};

// Function to get current hour
function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}

// Function to query the database
async function queryDatabase(pool) {
    const request = pool.request();
    const query = "SELECT IP, COMMUNITY, LOCATION_NAME FROM PRINTERS";
    const result = await request.query(query);
    return result.recordset;
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
            const pool = await connectToDatabase();
            const printers = await queryDatabase(pool);
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

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
    executeProcess();
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
