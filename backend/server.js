const express = require('express');
const snmp = require('net-snmp');
const axios = require('axios');
const cron = require('node-cron');
const { connectToDatabase } = require('./config/dbCon.js');
const defineRoutes = require('./routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// LINE Notify token
const LINE_NOTIFY_TOKEN = "HjvhE48RR4VVGh1kJwxDcne4DbpeEBV0srAH2OaH5Jz";

// Function to get current hour
function getCurrentHour() {
    const now = new Date();
    return now.getHours();
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

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
    executeProcess();
});

// Connect to the database and define the routes
connectToDatabase()
    .then(db => {
        const routes = defineRoutes(db, sendLineNotify);
        app.use('/api', routes);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });
