import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

/**
 * @swagger
 * /latest/{currency}:
 *  get:
 *    summary: Conversion EUR > Monnaie Donnée.
 *    description: Récupère la conversion d'une monnaie donnée avec comme base l'EURO.
 *    tags: [Conversion Simple]
 *    parameters:
 *      - in: path
 *        name: currency
 *        required: true
 *        description: Code de la monnaie pour la conversion (USD, RUB, TND...)
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: SUCCÈS !
 *      400:
 *        description: ERREUR !
 */

/**
 * @swagger
 * /info/{currency}:
 *  get:
 *    summary: Obtention des informations d'une monnaie.
 *    description: Récupère toutes les infos d'une monnaie donnée.
 *    tags: [Info Monnaie]
 *    parameters:
 *      - in: path
 *        name: currency
 *        required: true
 *        description: Code de la monnaie pour obtenir les informations (USD, RUB, TND...)
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: SUCCÈS !
 *      400:
 *        description: ERREUR !
 */

/**
 * @swagger
 * /historical/{currency}/{date}:
 *  get:
 *    summary: Conversion EUR > Monnaie Donnée + Date donnée
 *    description: Récupère la conversion d'une monnaie à une date précisée avec comme base l'EURO.
 *    tags: [Conversion Datée]
 *    parameters:
 *      - in: path
 *        name: currency
 *        required: true
 *        description: Code de la monnaie pour la conversion (USD, RUB, TND...)
 *        schema:
 *          type: string
 *      - in: path
 *        name: date
 *        required: true
 *        description: Date à entrer (année-mois-jour)
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: SUCCÈS !
 *      400:
 *        description: ERREUR !
 */

export class CurrencyController {
  private API_KEY: string;

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  public async getCurrency(req: Request, res: Response): Promise<void> {
    const currencies: string = req.params.currencies;
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.currencyapi.com/v3/latest?apikey=${this.API_KEY}&base_currency=EUR&currencies=${currencies}`
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
        `https://api.currencyapi.com/v3/currencies?apikey=${this.API_KEY}&base_currency=EUR&currencies=${currencies}`
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
        `https://api.currencyapi.com/v3/historical?apikey=${this.API_KEY}&base_currency=EUR&currencies=${currencies}&date=${date}`
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
