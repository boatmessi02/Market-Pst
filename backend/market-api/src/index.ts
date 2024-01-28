import express from "express";
import { useExpressServer } from "routing-controllers";
import "./container";
import "dotenv/config";
import config from './configs';
import { swaggerHandler } from './middlewares/swaggerMiddlewares'
import 'reflect-metadata'
import cors from "cors";
//env
const port = config.server.port;
const isDev = config.server.isDev;

// cors
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: true,
}
const app = express();

// Middleware
app.use(express.json()); 
if (isDev) {
  app.use(swaggerHandler())
}

app.use(cors(corsOptions))
useExpressServer(app, {
  cors: false,
  controllers: [__dirname + "/controllers/*.ts"],
});

app.listen(port, () => {
  console.log(`Listen at port ${port}`);
});
