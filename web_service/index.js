
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


const noticiasService = new NoticiasService();
const statusService = new StatusService();
const teamService = new TeamService();
const aiAdviceService = new AiAdviceService();
const cryptoService = new CryptoService();
const stockService = new StockService();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, 'schema.graphql'); 

let server; 
let app;    


async function initializeServer() {
  if (server) return; 

  try {
    const typeDefs = fs.readFileSync(schemaPath, 'utf8').trim();

    if (!typeDefs) {
        throw new Error(`ESQUEMA VACÍO O INVÁLIDO.`);
    }

    server = new ApolloServer({ 
      typeDefs, 
      resolvers 
    });
    
    await server.start();

    app = express();
    
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
      res.status(200).send('API Handler OK. GraphQL en /webServer/');
    });
    
    app.use(
      '/webServer/',
      expressMiddleware(server, {
        context: async () => ({
          noticiasService: noticiasService,
          statusService: statusService,
          teamService: teamService,
          aiAdviceService: aiAdviceService,
          cryptoService: cryptoService,
          stockService: stockService,
        }),
      }),
    );
    

  } catch (error) {
    console.error(` ERROR FATAL durante la inicialización de Apollo/Express: ${error.message || error}`);
    
    app = express();
    app.use((req, res) => res.status(500).send(`Error de inicialización de API: ${error.message}`));
  }
}


export default async function handler(req, res) {
  await initializeServer(); 
  
  if (app) {
    return app(req, res);
  }
  
  // 3. Fallback
  res.status(500).send("Server initialization failed and handler is unavailable.");
}