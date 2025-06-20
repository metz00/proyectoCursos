require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.API_PORT || 8080,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = { config };
