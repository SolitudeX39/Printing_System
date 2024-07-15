const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

const dbConfig = {
    user: 'bobby',
    password: 'battlefield1234',
    server: 'W06-CA-NR-003T',
    database: 'Prototype',
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: true, // Trust server certificate
    }
};
