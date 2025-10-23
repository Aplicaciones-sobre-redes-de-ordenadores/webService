// resolvers.js (con inyección de servicio services/NoticiasService.js)

export default {
  Query: {
    
    news: async (_, { country }, context) => { 
      
      // Llamamos al método específico en el servicio inyectado.
      try {
        console.log("Probando servicio ..");
        return await context.noticiasService.obtenerNoticiasPorPais(country);
      } catch (error) {
        console.error("Error en el resolver 'news':", error.message);
        return [];
      }
    }
  }
};
