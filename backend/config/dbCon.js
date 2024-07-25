const sql = require("mssql");

const dbConfig = {
  user: "devprt",
  password: "prt@1234",
  server: "10.3.99.122",
  database: "PRT_Management",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// run a query against the global connection pool
// ref: https://www.npmjs.com/package/mssql#connections-1
function runQuery(query) {
  // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
  return sql.connect(dbConfig).then((pool) => {
    return pool.query(query);
  });
}

// สร้างและเชื่อมต่อ connection pool
// sqlPool: เป็น Promise ที่สร้างการเชื่อมต่อครั้งแรก
const sqlPool = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    poolGlobal = pool; // กำหนดค่าให้ poolGlobal เมื่อเชื่อมต่อสำเร็จ
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed!", err);
    throw err;
  });

  // ประกาศตัวแปร poolGlobal ไว้ในระดับโมดูล
let poolGlobal;

// ฟังก์ชันเพื่อคืนค่าการเชื่อมต่อที่มีอยู่
async function getPool() {
  if (!poolGlobal) {
    console.log("Initializing pool");
    poolGlobal = await sqlPool; // รอให้เชื่อมต่อสำเร็จถ้ายังไม่เชื่อมต่อ
  }
  return poolGlobal;
}

module.exports = {
  // sqlPool,
  getPool,
};
