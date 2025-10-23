//const API_KEY = "577cfa4b7cce432c8851ef3bace2b3e4"; 
//const BASE_URL = "https://newsapi.org/v2/top-headlines"; 
const API_KEY = "a17c11966e182025521e8eb227dc219e";
const BASE_URL = "https://gnews.io/api/v4/top-headlines";

export default class NoticiasService {
    
    constructor() {
        console.log("NoticiasService inicializado.");
    }
    
   
    async obtenerNoticiasPorPais(country) {
        const url = `${BASE_URL}?country=${country}&apikey=${API_KEY}`;
        console.log("URL: ",url);
        try {
            console.log(`[NoticiasService] Consultando URL: ${url}`);
            const response = await fetch(url);

            // Manejo de errores 
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`[NoticiasService] Error API (${response.status}): ${errorData.message}`);
                throw new Error(errorData.message || "Error al obtener datos de la API externa.");
            }

            const data = await response.json();
            
            // Validación de la respuesta de la API de noticias con estado ok
            if (!data.articles || data.articles.length === 0) {
                console.warn("[NoticiasService] API no devolvió un estado 'ok' o artículos.");
                return [];
            }

            // Transforma la respuesta cruda de la API a la estructura exacta de GraphQL (NewsArticle)
            return data.articles.map(article => ({
                title: article.title,
                description: article.description || article.content,
                url: article.url 
            }));

        } catch (e) {
            console.error(`[NoticiasService] Error de red o mapeo: ${e.message}`);
            throw new Error(`Fallo en el servicio de noticias: ${e.message}`);
        }
    }
}
