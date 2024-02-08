import express, { Request, Response } from "express";
import { CurrencyController } from "./CurrencyController";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swaggerOptions";

const app = express();
const API_KEY = "fca_live_XiPouDv94apg596878Z7sNCm6ra37s9NcNOf9gD1";
const currencyController = new CurrencyController(API_KEY);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get("/test", (req: Request, res: Response) => {
  res.send("SERV OK !");
});

app.get("/latest/:currencies", async (req: Request, res: Response) => {
  await currencyController.getCurrency(req, res);
});

app.get("/info/:currencies", async (req: Request, res: Response) => {
  await currencyController.getInfo(req, res);
});

app.get(
  "/historical/:currencies/:date",
  async (req: Request, res: Response) => {
    await currencyController.getHistorical(req, res);
  }
);

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exe sur le port ${PORT}`);
});
