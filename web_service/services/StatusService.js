// StatusService.js

export default class StatusService {
    
    constructor() {
        console.log("StatusService inicializado.");
    }

    async getStatus() {
        try {
            // Aquí podrías añadir más comprobaciones reales (DB, APIs externas, etc.)
            const statusInfo = {
                status: "OK",
                timestamp: new Date().toISOString(),
                message: "El sistema funciona correctamente."
            };

            console.log("[StatusService] Estado del sistema:", statusInfo);
            return statusInfo;

        } catch (e) {
            console.error(`[StatusService] Error al obtener el estado: ${e.message}`);
            throw new Error(`Fallo en el servicio de estado: ${e.message}`);
        }
    }
}
