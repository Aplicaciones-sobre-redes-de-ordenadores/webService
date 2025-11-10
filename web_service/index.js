// index.js (Versión Express con Servicio)

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5'; 

import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import resolvers from './resolvers.js';
import NoticiasService from './services/NoticiasService.js'; 
import StatusService from './services/StatusService.js';
import TeamService from './services/TeamService.js';
import AiAdviceService from './services/AiAdviceService.js';
import CryptoService from './services/CryptoService.js';
import StockService from './services/StockService.js';


// Inicializa el servicio de noticias para inyectarlo en el contexto
const noticiasService = new NoticiasService();
const statusService = new StatusService();
const teamService = new TeamService();
const aiAdviceService = new AiAdviceService();
const cryptoService = new CryptoService();
const stockService = new StockService();


// CONFIGURACIÓN DE RUTA ABSOLUTA 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, 'schema.graphql'); 


let app;

try {
  const typeDefs = fs.readFileSync(schemaPath, 'utf8').trim();

  if (!typeDefs) {
      throw new Error(`ESQUEMA VACÍO O INVÁLIDO. La ruta leída: ${schemaPath} no contiene definiciones válidas.`);
  }

  //Crea la instancia de Apollo Server
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers 
  });
  
  //Inicia el servidor Apollo para que se prepare
  await server.start();

  //Configura Express
  app = express();
  const PORT = process.env.PORT || 8080;
  
  //Aplica middlewares de Express
  app.use(cors());
  app.use(express.json());

  // Monta Apollo Server como middleware en la ruta /
  app.use(
    '/webServer/',
    expressMiddleware(server, {
      //context se utiliza para inyectar dependencias (servicios) en los resolvers
      context: async ({ req }) => ({
        noticiasService: noticiasService,
        statusService: statusService,
        teamService: teamService,
        aiAdviceService: aiAdviceService,
        cryptoService: cryptoService,
        stockService: stockService,
      }),
    }),
  );

  app.listen(PORT, () => {
    console.log(`\n Servidor Express con Apollo GraphQL escuchando en http://localhost:${PORT}/ \n`);
  });

  // Arranca Express
  // Exporta el handler para Vercel (no abrir puerto)
  
  //module.exports = app;

} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(`\n ERROR FATAL: Archivo de esquema NO encontrado en: ${schemaPath}\n`);
  } else {
    console.error(` Error al iniciar el servidor: ${error.message || error}`);
  }
}
export default app;

