const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setUpModel = require("../db/models");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const isProduction = process.env.NODE_ENV === 'production';

const URI = isProduction
  ? `mysql://${USER}:${PASSWORD}@/${config.dbName}`
  : `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: "mysql",
  logging: true,
  dialectOptions: isProduction ? { socketPath: config.dbSocketPath } : {},
});

setUpModel(sequelize);

module.exports = sequelize;
