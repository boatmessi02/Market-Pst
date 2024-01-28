import dotenv from "dotenv";
import { ServerConfig } from "./serverConfig";
import { SwaggerConfig } from "./swaggerConfig";

dotenv.config();

interface AppConfig {
  server: ServerConfig;
  swagger: SwaggerConfig;
}

const config: AppConfig = {
  server: {
    port: parseInt(process.env.PORT || "3000"),
    isDev: (process.env.NODE_ENV || "") === "development" ? true : false,
  },
  swagger: {
    url: process.env.SWAGGER_URL || "/api-docs",
  },
};
export default config;
