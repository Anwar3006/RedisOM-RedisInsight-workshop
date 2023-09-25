import "dotenv/config";

import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import morgan from "morgan";

// import routers
import { router } from "./routers/personRouter.js";
import { router as searchRouter } from "./routers/searchRouter.js";

/* create an express app and use JSON */
const app = new express();
app.use(express.json());

// use morgan to get request/response logs
app.use(morgan("tiny"));

// register routes
app.use("/person", router);
app.use("/persons", searchRouter);

/* set up swagger in the root */
const swaggerDocument = YAML.load("api.yaml");
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* start the server */
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started, listening on ${PORT}....`);
});
