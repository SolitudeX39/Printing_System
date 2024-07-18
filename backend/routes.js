const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Route to get toner levels
    router.get('/toner-levels', async (req, res) => {
        try {
            const result = await db.request().query(`
                SELECT TOP (1000) [PRT_Global_Config_Type], [PRT_Global_Config_Value]
                FROM [dbo].[PRT_Global_Configs]
                WHERE [PRT_Global_Config_Type] = 'Toner_Level'
            `);
            res.json(result.recordset); // Send the query result as JSON response
        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).send('Database query error');
        }
    });

    // Route to get department printer status
    router.get('/department-printers', async (req, res) => {
        try {   
            const result = await db.request().query(`
                SELECT TOP (1000) [PRT_DIGIT]
                    ,[PRT_FLOOR]
                    ,[PRT_IP]
                    ,[PRT_PRINTLO]
                    ,[PRT_DERNAME]
                    ,[PRT_DINAME]
                    ,[PRT_StatusGet]
                    ,[PRT_Status_Custom_Alarm]
                    ,[PRT_Special_Percent_Level]
                FROM [dbo].[PRT_Department]
            `);
            res.json(result.recordset); // Send the query result as JSON response
        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).send('Database query error');
        }
    });

    return router;
};
