const sql = require('mssql');

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

// Function to connect to the database
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

module.exports = { connectToDatabase };
