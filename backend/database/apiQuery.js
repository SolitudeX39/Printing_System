// * ======= seq connect =========
const {sequelize_train} = require("../config/dbConSeque");

const api_get_all_list_prt = () => {
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
    FROM [dbo].[PRT_Department]`, {bind: {
            // prtid : from parameter in function
        }});
}

const Toner_Level = () => {
    return sequelize_train.query(`
    SELECT TOP (1000) [PRT_Global_Config_Type], [PRT_Global_Config_Value]
    FROM [dbo].[PRT_Global_Configs]
    WHERE [PRT_Global_Config_Type] = 'Toner_Level'
`, {bind: {
            // prtid : from parameter in function
        }});
}

module.exports = {
    api_get_all_list_prt,
    Toner_Level
}