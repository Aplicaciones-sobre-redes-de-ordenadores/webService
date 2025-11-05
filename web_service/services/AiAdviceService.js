// services/AiAdviceService.js
import { GoogleGenAI } from "@google/genai";

export default class AiAdviceService {
    constructor() {
        console.log("AiAdviceService inicializado.");
        this.ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY || "AIzaSyB4RFX0cGPX3vOzobjVjA8HY_6iJhOUeVc"
        });
    }

    async getAdvice() {
        try {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Dame un consejo breve y práctico sobre cómo ahorrar dinero."
        });

        const adviceText =
            response.text ||
            response.output?.[0]?.content?.[0]?.text ||
            "No se pudo generar consejo.";

        return {
            id: Date.now(),
            advice: adviceText
        };
        } catch (e) {
        console.error(`[AiAdviceService] Error: ${e.message}`);
        return {
            id: -1,
            advice: "Error al obtener consejo de IA."
        };
        }
    }
}
