import mysql from "mysql2/promise";

// MySQL connection settings

export const db_connect = () => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "useradmin",
      password: "bBx-DUcY7YXE6cbL",
      database: "node_api",
    });
    return connection;
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};

// const db = mysql.createPool({
// host: process.env.DB_HOST,
// user: process.env.DB_USER,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME,
// });
// export default db;

// const db_connect = mysql.createPool({
//   host: process.env.DB_SERVERNAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// export default db_connect;
