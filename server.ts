import express, { Request, Response } from "express";

const app = express();
const API_KEY = "9c7e5ee322mshd46b82b7bb76f01p1ee3cdjsn6c4dae50091e";

app.get("/test", (req: Request, res: Response) => {
  res.send("Test API");
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exe sur le port ${PORT}`);
});
