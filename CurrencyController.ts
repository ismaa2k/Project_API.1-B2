import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

export class CurrencyController {
  private API_KEY: string;

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  public async getCurrency(req: Request, res: Response): Promise<void> {
    const currencies: string = req.params.currencies;
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.currencyapi.com/v3/latest?apikey=${this.API_KEY}&currencies=${currencies}`
      );
      const data = response.data;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Impossible d'avoir la conversion" });
    }
  }

  public async getInfo(req: Request, res: Response): Promise<void> {
    const currencies: string = req.params.currencies;
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.currencyapi.com/v3/currencies?apikey=${this.API_KEY}&currencies=${currencies}`
      );
      const data = response.data;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Impossible d'obtenir les infos" });
    }
  }

  public async getHistorical(req: Request, res: Response): Promise<void> {
    const currencies: string = req.params.currencies;
    const date: string = req.params.date;
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.currencyapi.com/v3/historical?apikey=${this.API_KEY}&currencies=${currencies}&date=${date}`
      );
      const data = response.data;
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Impossible d'obtenir l'historique de la monnaie" });
    }
  }
}
