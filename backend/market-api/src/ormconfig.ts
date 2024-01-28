import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { seedPost } from "./seed-script";
// export const AppDataSource = new DataSource({
//  type: "postgres",
//  host: process.env.DB_HOST,
//  port: parseInt(process.env.DB_PORT || "5431", 10),
//  username: process.env.DB_USER,
//  password: process.env.DB_PASSWORD,
//  database: process.env.DB_NAME,
//  synchronize: true,
//  logging: false,
//  entities: ["src/entities/**/*.ts"],
//  migrations: ["src/migrations/**/*.ts"],
//  subscribers: [],
//     migrationsTableName : "migration_xxx"
// })

//FOR ENV NOT WORK
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: "admin",
  password: "1234",
  database: "marketdb",
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
  migrationsTableName: "migration_xxx",
});

AppDataSource.initialize()
  .then(() => {
    seedPost()
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
