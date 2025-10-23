// index.js (Versión Express con Servicio)

import express from 'express';
import { ApolloServer } from '@apollo/server';
// ----------------------------------------------------------------------
// CORRECCIÓN CLAVE: expressMiddleware DEBE importarse desde el subpaquete '@apollo/server/express4'
import { expressMiddleware } from '@as-integrations/express5'; 

// ----------------------------------------------------------------------
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ----------------------------------------------------------------------
// IMPORTACIÓN DE RESOLVERS Y SERVICIO
import resolvers from './resolvers.js';
// La importación de la clase NoticiasService (sin llaves) es CORRECTA para export default.
import NoticiasService from './services/NoticiasService.js'; 

// Inicializa el servicio de noticias para inyectarlo en el contexto
const noticiasService = new NoticiasService();
// ----------------------------------------------------------------------


// --- CONFIGURACIÓN DE RUTA ABSOLUTA ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, 'schema.graphql'); 
// -------------------------------------


try {
  const typeDefs = fs.readFileSync(schemaPath, 'utf8').trim();

  if (!typeDefs) {
      throw new Error(`ESQUEMA VACÍO O INVÁLIDO. La ruta leída: ${schemaPath} no contiene definiciones válidas.`);
  }

  // 1. Crear la instancia de Apollo Server
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers 
  });
  
  // 2. Iniciar el servidor Apollo para que se prepare
  await server.start();

  // 3. Configurar Express
  const app = express();
  const PORT = 8082;
  
  // 4. Aplicar middleware de Express
  app.use(cors()); // Permite peticiones desde el frontend
  app.use(express.json()); // Permite que Express parse el cuerpo JSON

  // 5. Montar Apollo Server como middleware en la ruta /graphql
  app.use(
    '/',
    expressMiddleware(server, {
      // El contexto se utiliza para INYECTAR SERVICIOS en los resolvers
      context: async ({ req }) => ({
        // Inyectamos nuestro servicio de noticias
        noticiasService: noticiasService,
        // (Aquí podrías inyectar el usuario autenticado, si lo hubiera)
        // user: req.user
      }),
    }),
  );

  // 6. Arrancar Express
  app.listen(PORT, () => {
    console.log(` Servidor Express y GraphQL listo en: http://localhost:${PORT}/graphql`);
    console.log(`Explora el Sandbox de GraphQL en: http://localhost:${PORT}/graphql`);
  });

} catch (error) {
  // Manejo de errores de lectura y de inicialización
  if (error.code === 'ENOENT') {
    console.error(`\n ERROR FATAL: Archivo de esquema NO encontrado en: ${schemaPath}\n`);
  } else {
    console.error(` Error al iniciar el servidor: ${error.message || error}`);
  }
}
