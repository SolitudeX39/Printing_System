// * ======= mssql connect pool =========
const { getPool } = require("../config/dbCon");


const api_get_all_list_prt = async () => {

    const pool = await getPool(); // รอให้ได้ connection pool

    return pool.request().query(`
    SELECT TOP (1000) [PRT_DIGIT]
        ,[PRT_FLOOR]
        ,[PRT_IP]
        ,[PRT_PRINTLO]
        ,[PRT_DERNAME]
        ,[PRT_DINAME]
        ,[PRT_StatusGet]
        ,[PRT_Status_Custom_Alarm]
        ,[PRT_Special_Percent_Level]
    FROM [dbo].[PRT_Department]`);
}


module.exports = {
    api_get_all_list_prt,
}