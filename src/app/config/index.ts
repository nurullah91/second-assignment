import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DB_URL,
};
