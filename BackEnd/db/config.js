const { config } = require("../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);


const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log(URI)

module.exports = {
  development: {
    url: URI,
    dialect: "mysql"
  },
  production: {
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    dialect: "mysql",
    dialectOptions: {
      socketPath: config.dbSocketPath, 
    },
  },
};
