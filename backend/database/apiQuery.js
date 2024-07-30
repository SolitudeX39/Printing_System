const { sequelize_train } = require("../config/dbConSeque");
const snmp = require('net-snmp');

const api_get_all_list_prt = () => {
    return sequelize_train.query(`
    SELECT TOP (15) [PRT_DIGIT]
        ,[PRT_FLOOR]
        ,[PRT_IP]
        ,[PRT_PRINTLO]
        ,[PRT_DERNAME]
        ,[PRT_DINAME]
        ,[PRT_StatusGet]
        ,[PRT_Status_Custom_Alarm]
        ,[PRT_Special_Percent_Level]
    FROM [dbo].[PRT_Department]`, {
        bind: {
            // prtid : from parameter in function
        }
    });
}

const Toner_Level = () => {
    return sequelize_train.query(`
    SELECT TOP (1000) [PRT_Global_Config_Type], [PRT_Global_Config_Value]
    FROM [dbo].[PRT_Global_Configs]
    WHERE [PRT_Global_Config_Type] = 'Toner_Level'`, {
        bind: {
            // prtid : from parameter in function
        }
    });
}

// New function to get a specific printer by PRT_IP
const api_get_printer_by_ip = (prt_ip) => {
    return sequelize_train.query(`
    SELECT [PRT_DIGIT]
        ,[PRT_FLOOR]
        ,[PRT_IP]
        ,[PRT_PRINTLO]
        ,[PRT_DERNAME]
        ,[PRT_DINAME]
        ,[PRT_StatusGet]
        ,[PRT_Status_Custom_Alarm]
        ,[PRT_Special_Percent_Level]
    FROM [dbo].[PRT_Department]
    WHERE [PRT_IP] = :prt_ip`, {
        replacements: { prt_ip },
        type: sequelize_train.QueryTypes.SELECT
    });
}


const performSnmpGetWithRetry = async (printer, maxRetries = 3) => {
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
        try {
            const session = snmp.createSession(printer.PRT_IP, "public");
            const oids = ["1.3.6.1.2.1.43.11.1.1.9.1.1"];

            await new Promise((resolve, reject) => {
                session.get(oids, function (error, varbinds) {
                    if (error) {
                        reject(error);
                    } else {
                        for (let i = 0; i < varbinds.length; i++) {
                            if (snmp.isVarbindError(varbinds[i])) {
                                reject(snmp.varbindError(varbinds[i]));
                            } else {
                                console.log(`Printer ${printer.PRT_IP} - OID ${varbinds[i].oid} = ${varbinds[i].value}`);
                                success = true;
                            }
                        }
                    }
                    session.close();
                    resolve();
                });
            });

        } catch (error) {
            console.error(`Error fetching SNMP data for printer ${printer.PRT_IP} (attempt ${attempt + 1}):`, error);
            attempt++;
            if (attempt >= maxRetries) {
                // console.error(`Failed to fetch SNMP data for printer ${printer.PRT_IP} after ${maxRetries} attempts.`);
            }
        }
    }
};

module.exports = {
    api_get_all_list_prt,
    Toner_Level,
    api_get_printer_by_ip,
    performSnmpGetWithRetry
}