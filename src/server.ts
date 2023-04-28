import "dotenv/config";
import express, { Request, Response } from "express";

import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get("/", (request: Request, response: Response) => {
  return response.send("ping");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

process.on("uncaughtException", (err) => {
  console.log(`erro no servidor ${err}`);
});
