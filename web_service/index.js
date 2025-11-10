import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import resolvers from '../resolvers.js';
import NoticiasService from '../services/NoticiasService.js';
import StatusService from '../services/StatusService.js';
import TeamService from '../services/TeamService.js';
import AiAdviceService from '../services/AiAdviceService.js';
import CryptoService from '../services/CryptoService.js';
import StockService from '../services/StockService.js';

// Inicializa servicios
const noticiasService = new NoticiasService();
const statusService = new StatusService();
const teamService = new TeamService();
const aiAdviceService = new AiAdviceService();
const cryptoService = new CryptoService();
const stockService = new StockService();

// Schema
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, '../schema.graphql');
const typeDefs = fs.readFileSync(schemaPath, 'utf8').trim();

if (!typeDefs) {
  throw new Error(`ESQUEMA VACÍO O INVÁLIDO en: ${schemaPath}`);
}

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

// Express
const app = express();
app.use(express.json());
app.use(expressMiddleware(server, {
  context: async () => ({
    noticiasService,
    statusService,
    teamService,
    aiAdviceService,
    cryptoService,
    stockService,
  }),
}));

// Exporta handler serverless para Vercel
export default app;
