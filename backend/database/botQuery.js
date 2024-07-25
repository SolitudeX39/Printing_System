// * ======= mssql connect pool =========
const { sequelize_train } = require("./config/dbConSeque");


const bot_get_all_list_prt = () => {
    return sequelize_train.query(`
    SELECT TOP (1000) [PRT_DIGIT]
        ,[PRT_FLOOR]
        ,[PRT_IP]
        ,[PRT_PRINTLO]
        ,[PRT_DERNAME]
        ,[PRT_DINAME]
        ,[PRT_StatusGet]
        ,[PRT_Status_Custom_Alarm]
        ,[PRT_Special_Percent_Level]
    FROM [dbo].[PRT_Department]`,
    {
        bind: {
            // prtid : from parameter in function
        }
    });
}


module.exports = {
    bot_get_all_list_prt,
}