const snmp = require("net-snmp");
const seqCon = require("./database/apiQuery.js");
const cron = require("node-cron");

(async() => {
    // Function to perform SNMP GET operation with retries
    const performSnmpGetWithRetry = async(printer, maxRetries = 3) => {
        let attempt = 0;
        let success = false;

        while (attempt < maxRetries && !success) {
            try {
                const session = snmp.createSession(printer.PRT_IP, "public");
                const oids = ["1.3.6.1.2.1.43.11.1.1.9.1.1"];

                await new Promise((resolve, reject) => {
                    session
                        .get(oids, function (error, varbinds) {
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
                    console.error(`Failed to fetch SNMP data for printer ${printer.PRT_IP} after ${maxRetries} attempts.`);
                }
            }
        }
    };

    // Main execution block
    try {
        const [printers,
            rowEffect] = await seqCon.api_get_all_list_prt();
        const [tonerLevels,
            rowEffect2] = await seqCon.Toner_Level();
        console.log("Toner Levels:", tonerLevels);
        console.log("Printers:", printers);

        for (const printer of printers) {
            await performSnmpGetWithRetry(printer);
        }
    } catch (error) {
        console.error('Error querying the database:', error);
    }

    // Schedule the task to run every 5 minutes (uncomment if needed)

    cron.schedule('*/5 * * * *', async() => {
        try {
            const [printers,
                rowEffect] = await seqCon.api_get_all_list_prt();
            const [tonerLevels,
                rowEffect2] = await seqCon.Toner_Level();
            console.log("Toner Levels:", tonerLevels);
            console.log("Printers:", printers);

            for (const printer of printers) {
                await performSnmpGetWithRetry(printer);
            }
        } catch (error) {
            console.error('Error querying the database:', error);
        }
    });

})();
