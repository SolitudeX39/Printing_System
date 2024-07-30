const seqCon = require("./database/apiQuery.js");
const cron = require("node-cron");
const snmp = require('net-snmp');

// const performSnmpGetWithRetry = async (printer, maxRetries = 3) => {
//     let attempt = 0;
//     let success = false;

//     while (attempt < maxRetries && !success) {
//         try {
//             const session = snmp.createSession(printer.PRT_IP, "public");
//             const oids = ["1.3.6.1.2.1.43.11.1.1.9.1.1"];

//             await new Promise((resolve, reject) => {
//                 session.get(oids, function (error, varbinds) {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         for (let i = 0; i < varbinds.length; i++) {
//                             if (snmp.isVarbindError(varbinds[i])) {
//                                 reject(snmp.varbindError(varbinds[i]));
//                             } else {
//                                 console.log(`Printer ${printer.PRT_IP} - OID ${varbinds[i].oid} = ${varbinds[i].value}`);
//                                 success = true;
//                             }
//                         }
//                     }
//                     session.close();
//                     resolve();
//                 });
//             });

//         } catch (error) {
//             console.error(`Error fetching SNMP data for printer ${printer.PRT_IP} (attempt ${attempt + 1}):`, error);
//             attempt++;
//             if (attempt >= maxRetries) {
//                 // console.error(`Failed to fetch SNMP data for printer ${printer.PRT_IP} after ${maxRetries} attempts.`);
//             }
//         }
//     }
// };


const performSnmpGetWithRetry_mod = async (printer) => {
    
    return new Promise( async (resolve, reject) => {

        try {

            const session = snmp.createSession(printer.PRT_IP, "public");
            const oids = ["1.3.6.1.2.1.43.11.1.1.9.1.1"];

                session.get(oids, function (error, varbinds) {
                    if (error) {
                        // reject(error);

                        console.log(error);
                        resolve({ status: false, valueToner: null, msgError: error.message });
                    } else {
                        for (let i = 0; i < varbinds.length; i++) {
                            if (snmp.isVarbindError(varbinds[i])) {
                                // reject(snmp.varbindError(varbinds[i]));

                                resolve({ status: false, valueToner: null, msgError: 'หาค่าหมึกไมได้' });
                            } else {
                                // console.log(`Printer ${printer.PRT_IP} - OID ${varbinds[i].oid} = ${varbinds[i].value}`);

                                resolve({ status: true, valueTonerUnit: varbinds[i].value, valuePercentange: varbinds[i].value * 100 / 7200, printerIp: printer.PRT_IP, printerOid: varbinds[i].oid });
                            }
                        }
                    }
                    session.close();
                });

            } catch (err) {
                console.log(err);
                resolve({ status: false, valueToner: null, msgError: error.message });
            }
    });
};



(async() => {
    // Function to perform SNMP GET operation with retries

    // Main execution block
    try {
        const [printers,
            rowEffect] = await seqCon.api_get_all_list_prt();
        const [tonerLevels,
            rowEffect2] = await seqCon.Toner_Level();
        // console.log("Toner Levels:", tonerLevels);
        // console.log("Printers:", printers);

        console.log('List Printer >>> ', printers.length);

        let noarmal_list_printer = []; // * toner percent > 50%
        let warning_list_printer = [];

        for (const [index, printer] of printers.entries()) {
            const res_printer = await performSnmpGetWithRetry_mod(printer);

            
            console.log(`index >>> ${index + 1} >>> res_printer check pass`);
            // console.log(res_printer);

            if (!res_printer.status) {warning_list_printer.push(res_printer); continue}

            if (res_printer.valuePercentange >= 50) {
                // console.log('printer normal toner > 50% >>> ', res_printer.printerIp);
                // noarmal_list_printer.push(res_printer);
            }
            
        }

        console.log('======== summnarize ========');
        console.log('noarmal_list_printer : ', noarmal_list_printer.length, ' items');
        console.log('warning_list_printer : ', warning_list_printer.length, ' items');
    } catch (error) {
        console.error('Error querying the database:', error);
    }

    // Schedule the task to run every 5 minutes (uncomment if needed)

    cron.schedule('*/5 * * * *', async() => {
        try {
            const [printers] = await seqCon.api_get_all_list_prt();
            const [tonerLevels] = await seqCon.Toner_Level();
            // console.log("Toner Levels:", tonerLevels);
            // console.log("Printers:", printers);

            for (const [index, printer] of printers.entries()) {

                console.log('index >>> ', index);
                await seqCon.performSnmpGetWithRetry(printer);
            }
        } catch (error) {
            console.error('Error querying the database:', error);
        }
    });

})();
