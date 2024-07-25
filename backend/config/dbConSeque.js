const { Sequelize } = require('sequelize');


const sequelize_train = new Sequelize('PRT_Management', 'devprt', 'prt@1234', {
    host: '10.3.99.122',
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
        enableArithAbort: false,
        requestTimeout: 40000, // 30 seconds
      },
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });


  module.exports = {
    // createSequelizeInstance,
    sequelize_train,
  };