const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');
const {Server} = require('ws');
const moment = require('moment');
require('dotenv').config()

const { config_location } = require('./env');

const app = express();
const PORT = process.env.PORT || 8080;
const WSPORT = 8081; // WebSocket server port

// Middleware to parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// MSSQL configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: '10.3.99.122',
    database: 'Prototype',
    options: {
        encrypt: false, // Use encryption
        trustServerCertificate: false, // Trust server certificate
    }
};

function convertDateTime(_value) {
    return moment(
      new Date(_value).toISOString().replace(/T/, " ").replace(/Z/, "")
    ).format("YYYY-MM-DD HH:mm:ss.SSS");
  }

// Function to insert queue data
const insertOrUpdateQueueData = async(pool, queueNumber, queueScheduleDatetime, queueStatus) => {
    const scheduleDatetime = new Date(queueScheduleDatetime);


    // * ======== need only =============
    await pool
            .request()
            .input('queueScheduleDatetime', sql.DateTime, scheduleDatetime) // ? Please rephrase your sentence so I can understand which specific part or sentence you need to modify to use the 24-hour datetime format.
            .input('queueStatus', sql.Int, queueStatus)
            .input('queueNumber', sql.Int, queueNumber)
            .input('queueLocaltion', sql.NVarChar, config_location.location_name)
            // ? Modify the update format to use WHERE with a constant or uniquely identifying value such as location.
            .query(`
                UPDATE Queue
                SET queue_schedule_datetime = @queueScheduleDatetime, queue_status = @queueStatus, queue_number = @queueNumber
                WHERE queue_location = @queueLocaltion
            `);


    // ? There's no need to select anymore because the values are received from the request body sent by the frontend that calls this API server.
    // Check if the queue number already exists
    // const result = await pool
    //     .request()
    //     .input('queueNumber', sql.Int, queueNumber)
    //     .query(`SELECT * FROM Queue WHERE queue_number = @queueNumber`);

    // if (result.recordset.length > 0) {
    //     // Update existing record
    //     await pool
    //         .request()
    //         .input('queueScheduleDatetime', sql.DateTime, scheduleDatetime)
    //         .input('queueStatus', sql.Int, queueStatus)
    //         .input('queueNumber', sql.Int, queueNumber)
    //         .query(`
    //             UPDATE Queue
    //             SET queue_schedule_datetime = @queueScheduleDatetime, queue_status = @queueStatus
    //             WHERE queue_number = @queueNumber
    //         `);
    // } else {
    //     // Insert new record
    //     await pool
    //         .request()
    //         .input('queueNumber', sql.Int, queueNumber)
    //         .input('queueScheduleDatetime', sql.DateTime, scheduleDatetime)
    //         .input('queueStatus', sql.Int, queueStatus)
    //         .query(`
    //             INSERT INTO Queue (queue_number, queue_schedule_datetime, queue_status)
    //             VALUES (@queueNumber, @queueScheduleDatetime, @queueStatus)
    //         `);
    // }

    return {queueNumber, queueScheduleDatetime: scheduleDatetime, queueStatus};
};

// Function to handle database errors
const handleDatabaseError = (res, error, message) => {
    console.error('Database error:', error);
    res
        .status(500)
        .json({
            message: message || 'Database error occurred'
        });
};

// API endpoint to update queue data
app.post('/api/queue/update', async(req, res) => {
    const {queue_number, queueScheduleDatetime, queueStatus} = req.body;

    console.log('queue_number', queue_number);

    if (!queue_number || !queueScheduleDatetime || queueStatus === undefined) {
        return res
            .status(400)
            .json({message: 'Missing required fields'});
    }

    try {
        const pool = await sql.connect(dbConfig);

        let response;
        if (queue_number > 999) {
            // Delete all records if queue number exceeds 99

            // ? This part will not use delete because we just need to overwrite the value with 0.
            // ? If removing the value affects checking the queue when loading initial data, use the value received in real-time from the websocket.

            // await pool
            //     .request()
            //     .query(`DELETE FROM Queue`);
            // // Insert a new record with queue number 1
            // response = await insertOrUpdateQueueData(pool, 1, queueScheduleDatetime, queueStatus);

            response = await insertOrUpdateQueueData(pool, 0, queueScheduleDatetime, queueStatus);

            // ? Recommendation: It would be better to check the rowEffect value to verify whether the query update conditions were 
            // ? actually successful. In some cases, even if the dynamic value is correct in format, there will be no error, but the rowEffect will be 0.
            res.json({success: true, message: 'Queue number exceeded 99. All records have been deleted and queue reset to 1.'});
        } else {
            // Insert or update the queue number in the database
            response = await insertOrUpdateQueueData(pool, queue_number, convertDateTime(queueScheduleDatetime), queueStatus);
            res.json({success: true});
        }

        // Notify all connected WebSocket clients about the update
        wss
            .clients
            .forEach(client => {
                if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify(response));
                }
            });
    } catch (error) {
        handleDatabaseError(res, error, 'Failed to update queue number');
    } finally {
        sql.close();
    }
});

// API endpoint to delete all queue data
app.delete('/api/queue/delete', async(req, res) => {
    try {
        const pool = await sql.connect(dbConfig);

        // Delete all records from Queue table
        // await pool
        //     .request()
        //     .query(`DELETE FROM Queue`);

        // res.json({success: true, message: 'All queue data deleted successfully'});

        // ? Recommendation: It would be better to check the rowEffect value to verify whether the query update conditions were 
        // ? actually successful. In some cases, even if the dynamic value is correct in format, there will be no error, but the rowEffect will be 0.
        const nowDateDelete = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        const queueStatus = '1'
        await insertOrUpdateQueueData(pool, 0, nowDateDelete, queueStatus);

        res.json({success: true, message: 'ลบข้อมูลคิวทั้งหมดเรียบร้อยแล้ว'});

        // Notify all connected WebSocket clients about the update
        wss
            .clients
            .forEach(client => {
                if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify({queueNumber: 0, queueScheduleDatetime: new Date(), queueStatus: 1}));
                }
            });
    } catch (error) {
        handleDatabaseError(res, error, 'ลบข้อมูลคิวไม่สำเร็จ');
    } finally {
        sql.close();
    }
});

// API endpoint to fetch all queue data
app.get('/api/queue/all', async(req, res) => {
    try {
        const pool = await sql.connect(dbConfig);

        const result = await pool
            .request()
            .input('queueLocaltion', sql.NVarChar, config_location.location_name)
            .query(`SELECT * FROM Queue where queue_location = @queueLocaltion`);


        if (result.recordset.length > 0) {
            const newDataCon = await Promise.all( result.recordset.map( (item) => ({...item, queue_schedule_datetime: convertDateTime(item.queue_schedule_datetime)})))
            res.json(newDataCon);
        } else {
            res.json([]); // Return an empty array if no records are found
        }
    } catch (error) {
        handleDatabaseError(res, error, 'Failed to fetch queue data');
    } finally {
        sql.close();
    }
});

// Start the HTTP server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Start the WebSocket server
const wss = new Server({port: WSPORT});
wss.on('connection', ws => {
    console.log('New WebSocket connection');
    ws.on('message', message => {
        console.log('Received:', message.toString());
        const data = JSON.parse(message.toString())
        wss
            .clients
            .forEach(client => {
                if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify({queueNumber: data.queueNumber, queueScheduleDatetime: new Date(), queueStatus: 2}));
                }

            });
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});
