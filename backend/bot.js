const snmp = require ("net-snmp");

// * ======= seq connect ================
const seqCon = require("./database/apiQuery.js");





( async() => {

    // Schedule the task to run every 5 minutes
    // cron.schedule('*/5 * * * *', () => {
        
    //     // * =====> Start Step 1
    // });
    const [result, rowEffect] = await seqCon.api_get_all_list_prt();
    const [result2, rowEffect2] = await seqCon.Toner_Level();
    console.log("result2", result2);
    // console.log("result", result);
    var session = snmp.createSession ("192.168.3.155", "public");

var oids = ["1.3.6.1.2.1.43.11.1.1.9.1.1"];

session.get (oids, function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i])) {
                console.error (snmp.varbindError (varbinds[i]));
            } else {
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
            }
        }
    }
    session.close ();
});

session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error) {
        console.error (error);
    }
});

})();
