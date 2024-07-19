require('dotenv').config();
const snmp = require('net-snmp');
const axios = require('axios');
const {connectToDatabase} = require('./config/dbCon.js'); // Import the database configuration

// Environment variables
const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN;
const OID = process.env.OID; // This should be the OID you want to monitor

// Function to send LINE Notify message
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

    session.get([OID], (error, varbinds) => {
        if (error) {
            console.error('SNMP error:', error);
            sendLineNotify(`Error querying printer status: ${error.message}`);
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
        session.close();
    });
}

// Main function to execute the process
async function executeProcess() {
    try {
        const dbPool = await connectToDatabase();
        const query = "SELECT IP, COMMUNITY, LOCATION_NAME FROM PRINTERS";
        const result = await dbPool
            .request()
            .query(query);
        const printers = result.recordset;

        printers.forEach(printer => {
            checkPrinterStatus(printer);
        });

    } catch (error) {
        console.error('Error during execution process:', error);
    }
}

// Schedule to run every 5 minutes
setInterval(executeProcess, 5 * 60 * 1000);

// Start execution immediately on server start
executeProcess();
