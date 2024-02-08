import path from "path";

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API CURRENCY",
      version: "1.0.0",
      description:
        "ApiCurrency est une API facile à utiliser qui fournit des informations de conversion de devises en temps réel. Il utilise des technologies comme Axios, Node.js (Express) et TypeScript.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur Local",
      },
    ],
  },
  apis: [path.resolve(__dirname, "./CurrencyController.ts")],
};
