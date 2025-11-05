// services/StockService.js

const API_KEY = "fTVquM6slPEyM6BytNSox4RBhznAXCAx";
const BASE_URL = "https://financialmodelingprep.com/stable/profile";

// Las 10 empresas que quieres consultar
const SYMBOLS = [
  "MSFT", // Microsoft
  "META", // Meta Platforms
  "NVDA", // NVIDIA
  "AAPL", // Apple
  "GOOG", // Alphabet
  "TSLA", // Tesla
  "AMZN", // Amazon
  "AVGO", // Broadcom
  "ASML", // ASML Holding
  "ADBE"  // Adobe
];

export default class StockService {
  constructor() {
    console.log("StockService inicializado.");
    this.apiKey = API_KEY;
    this.baseUrl = BASE_URL;
    this.symbols = SYMBOLS;
  }

  async obtenerTopStocks() {
    const buildUrl = (symbol) =>
      `${this.baseUrl}?symbol=${symbol}&apikey=${this.apiKey}`;

    try {
      const peticiones = this.symbols.map(async (symbol) => {
        const url = buildUrl(symbol);
        console.log(`[StockService] Consultando URL: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
          let errorData = {};
          try {
            errorData = await response.json();
          } catch (_) {}

          console.error(
            `[StockService] Error API (${response.status}) para ${symbol}: ${
              errorData.message || "Respuesta no OK"
            }`
          );
          // No tiramos todo, devolvemos null y luego filtramos
          return null;
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          console.warn(`[StockService] Respuesta vacía para ${symbol}.`);
          return null;
        }

        const profile = data[0];

        return {
          symbol: profile.symbol || symbol,
          name: profile.companyName ?? null,
          price: profile.price ?? null,
          sector: profile.sector ?? null,
          industry: profile.industry ?? null,
        };
      });

      const resultados = await Promise.all(peticiones);

      // Quitamos los null de símbolos que hayan fallado
      return resultados.filter((s) => s !== null);
    } catch (e) {
      console.error(`[StockService] Error de red o mapeo: ${e.message}`);
      throw new Error(`Fallo en el servicio de acciones: ${e.message}`);
    }
  }
}
