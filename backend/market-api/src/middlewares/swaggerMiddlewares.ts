import express from "express";
import swaggerUi from "swagger-ui-express";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { getMetadataArgsStorage } from "routing-controllers";
export function swaggerHandler() {
  const spec = routingControllersToSpec(
    getMetadataArgsStorage(),
    {},
    {
      info: {
        title: "My API",
        version: "0.0.1",
      },
    }
  );
  const url = process.env.SWAGGER_URL || "/api-docs";
  const router = express.Router();
  router.use(url, swaggerUi.serve);
  router.get(url, swaggerUi.setup(spec));
  return router;
}
