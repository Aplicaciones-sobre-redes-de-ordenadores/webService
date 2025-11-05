// services/CryptoService.js

const API_KEY = "fTVquM6slPEyM6BytNSox4RBhznAXCAx";
const BASE_URL = "https://financialmodelingprep.com/stable/quote-short";

export default class CryptoService {

    constructor() {
        console.log("CryptoService inicializado.");
        this.apiKey = API_KEY;
        this.baseUrl = BASE_URL;

        // Las 10 cryptos más importantes
        this.symbols = [
            "BTCUSD", // Bitcoin
            "ETHUSD", // Ethereum
            "USDTUSD", // Tether
            "BNBUSD", // BNB
            "SOLUSD", // Solana
            "XRPUSD", // XRP
            "USDCUSD", // USD Coin
            "ADAUSD", // Cardano
            "DOGEUSD", // Dogecoin
            "AVAXUSD"  // Avalanche
        ];
    }

    async obtenerTopCryptos() {
        const buildUrl = (symbol) =>
            `${this.baseUrl}?symbol=${symbol}&apikey=${this.apiKey}`;

        try {
            const peticiones = this.symbols.map(async (symbol) => {
                const url = buildUrl(symbol);
                console.log(`[CryptoService] Consultando URL: ${url}`);

                const response = await fetch(url);

                if (!response.ok) {
                    let errorData = {};
                    try {
                        errorData = await response.json();
                    } catch (_) {}

                    console.error(
                        `[CryptoService] Error API (${response.status}) para ${symbol}: ${
                            errorData.message || "Respuesta no OK"
                        }`
                    );
                    return null; // ignoramos este símbolo en caso de error
                }

                const data = await response.json();

                if (!Array.isArray(data) || data.length === 0) {
                    console.warn(`[CryptoService] Respuesta vacía para ${symbol}.`);
                    return null;
                }

                const quote = data[0];

                return {
                    symbol: quote.symbol || symbol,
                    price: quote.price ?? null,
                    change: quote.change ?? null,
                    volume: quote.volume ?? null,
                };
            });

            const resultados = await Promise.all(peticiones);

            // Filtramos posibles nulls por errores individuales
            return resultados.filter((c) => c !== null);

        } catch (e) {
            console.error(`[CryptoService] Error de red o mapeo: ${e.message}`);
            throw new Error(`Fallo en el servicio de criptomonedas: ${e.message}`);
        }
    }
}
