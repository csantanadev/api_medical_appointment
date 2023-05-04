import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { routes } from "./routes";

// uncomment to enable cron job
//import './infra/cron/notification-appointment-day.cron'

const app = express();

app.use(express.json());

app.use(routes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get("/", (request: Request, response: Response) => {
  return response.json({ message: "ping" });
});

export { app };
