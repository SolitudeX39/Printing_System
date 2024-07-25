const express = require('express');
const snmp = require('net-snmp');
const axios = require('axios');
const cron = require('node-cron');

const defineRoutes = require('./routes.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

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


// LINE Notify token
const LINE_NOTIFY_TOKEN = "HjvhE48RR4VVGh1kJwxDcne4DbpeEBV0srAH2OaH5Jz";
const SOME_THRESHOLD = 20; 


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
async function scheduledTask() {
    try {
        const db = await connectToDatabase();
        const result = await db.request().query(`
            SELECT TOP (1000) [PRT_Global_Config_Type], [PRT_Global_Config_Value]
            FROM [dbo].[PRT_Global_Configs]
            WHERE [PRT_Global_Config_Type] = 'Toner_Level'
        `);
        console.log('Scheduled task result:', result.recordset);

        // Example: Send a notification if a certain condition is met
        result.recordset.forEach(record => {
            if (record.PRT_Global_Config_Value < SOME_THRESHOLD) {
                sendLineNotify(`Toner level is low: ${record.PRT_Global_Config_Value}`);
            }
        });
    } catch (err) {
        console.error('Scheduled task error:', err);
    }
}



// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
    scheduledTask();
});
