const express = require("express");

// * ======= mssql connect pool =========
const { getPool } = require("./config/dbCon");

// * ======= seq connect ================
const seqCon = require("./database/apiQuery.js");

// * ====== mssql type 2 =========
const mssqlCon2 = require("./database/apiQueryMssql");


// const defineRoutes = (sendLineNotify) => {
const router = express.Router();

// Route to get toner levels
router.get("/toner", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
                SELECT TOP (1000) [PRT_Global_Config_Type], [PRT_Global_Config_Value]
                FROM [dbo].[PRT_Global_Configs]
                WHERE [PRT_Global_Config_Type] = 'Toner_Level'
            `);
    res.json(result.recordset); // Send the query result as JSON response
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).send("Database query error");
  }
});

// Route to get department printer status
router.get("/department", async (req, res) => {
  try {
    const pool = await getPool();
    // * with param
    // pool.request()
    //         .input('input_parameter', sql.Int, value)
    //         .query('select * from mytable where id = @input_parameter')
    
    const result = await pool.request().query(`
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
    res.json({ status: true, data: result.recordset }); // Send the query result as JSON response
  } catch (err) {
    console.error("Database query error:", err);
    res.status(400).json({ status: false, errMsg: "Database query error" });
  }
});


router.get("/department_seq", async (req, res) => {
  try {
    const [result, rowEffect] = await seqCon.api_get_all_list_prt();
    res.json({ status: true, data: result }); // Send the query result as JSON response
  } catch (err) {
    console.error("Database query error:", err);
    res.status(400).json({ status: false, errMsg: "Database query error" });
  }
});

router.get("/toner_seq", async (req, res) => {
    try {
      const [result, rowEffect] = await seqCon.Toner_Level();
      res.json({ status: true, data: result }); // Send the query result as JSON response
    } catch (err) {
      console.error("Database query error:", err);
      res.status(400).json({ status: false, errMsg: "Database query error" });
    }
  });


router.get("/department_mssql2", async (req, res) => {
  try {
    const result = await mssqlCon2.api_get_all_list_prt();
    res.json({ status: true, data: result.recordset }); // Send the query result as JSON response
  } catch (err) {
    console.error("Database query error:", err);
    res.status(400).json({ status: false, errMsg: "Database query error" });
  }
});

// Route to send LINE Notify
router.post("/notify", (req, res) => {
  const message = req.body.message || "Test notification";
  sendLineNotify(message);
  res.send("Notification sent");
});

// };

module.exports = router;
