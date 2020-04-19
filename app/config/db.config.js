module.exports = {
  HOST: "localhost",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: "task_tracker_development",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};