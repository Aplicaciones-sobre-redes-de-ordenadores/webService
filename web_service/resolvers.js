// resolvers.js (con inyección de servicios NoticiasService y StatusService)

export default {
  Query: {
    // Resolver de noticias
    news: async (_, { country }, context) => { 
      try {
        console.log("Probando servicio de noticias ..");
        return await context.noticiasService.obtenerNoticiasPorPais(country);
      } catch (error) {
        console.error("Error en el resolver 'news':", error.message);
        return [];
      }
    },

    // Resolver de estado del sistema
    status: async (_, __, context) => {
      try {
        console.log("Consultando estado del sistema ..");
        return await context.statusService.getStatus();
      } catch (error) {
        console.error("Error en el resolver 'getStatus':", error.message);
        return {
          status: "ERROR",
          timestamp: new Date().toISOString(),
          message: `Fallo al obtener estado: ${error.message}`
        };
      }
    },

    // Resolver team
    team: async (_, __, context) => {
      try {
        console.log("Consultando estado del sistema ..");
        return await context.teamService.getTeam();
      } catch (error) {
        console.error("Error en el resolver 'getTeam':", error.message);
        return {
          status: "ERROR",
          timestamp: new Date().toISOString(),
          message: `Fallo al obtener estado: ${error.message}`
        };
      }
    },

    // Resolver AiAdvice
    aiSavingsTip: async (_, __, context) => {
      try {
        console.log("Consultando estado del sistema ..");
        return await context.aiAdviceService.getAdvice();
      } catch (error) {
        console.error("Error en el resolver 'getAdvice':", error.message);
        return {
          status: "ERROR",
          timestamp: new Date().toISOString(),
          message: `Fallo al obtener estado: ${error.message}`
        };
      }
    },

    // Ejemplo de cómo quedaría, añadiendo SOLO esto nuevo:

    topStocks: async (_, __, context) => {
      try {
        console.log("Consultando topStocks desde StockService ..");
        return await context.stockService.obtenerTopStocks();
      } catch (error) {
        console.error("Error en el resolver 'topStocks':", error.message);
        return [];
      }
    },

     topCryptos: async (_, __, context) => {
      try {
        console.log("Consultando topCryptos desde CryptoService ..");
        return await context.cryptoService.obtenerTopCryptos();
      } catch (error) {
        console.error("Error en el resolver 'topCryptos':", error.message);
        return [];
      }
    }
  }
};
