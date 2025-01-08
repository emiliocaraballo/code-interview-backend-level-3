import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import { defineRoutes } from "src/routes";
import { AppDataSource } from "src/config/typeorm.config";
import { Item } from "src/models/item.entity";

const swaggerOptions = {
  info: {
    title: 'Coding Interview Backend Level 3',
    description: 'API para el proyecto de Coding Interview Backend Level 3',
    version: "1.0.0",
  },
  grouping: "tags",
  documentationPath: "/api-docs",
};

const getServer = async () => {
  const server: Hapi.Server = Hapi.server({
    // host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000,
  });
  defineRoutes(server);

  return server;
};

// Manejar errores al iniciar el servidor
process.on("unhandledRejection", (err) => {
  console.error("Error no manejado:", err);
  process.exit(1);
});

// Inicializar el servidor
export const initializeServer = async () => {
  
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const itemRepository = AppDataSource.getRepository(Item);
  await itemRepository.clear(); // Borra todos los registros de la tabla de la base de datos temporal.

  const server = await getServer();
  await server.initialize();
  return server;
};

export const startServer = async () => {
  const server = await getServer();

  try {
    // Registrar plugins de forma asíncrona
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ]);

    console.log("Plugins registrados exitosamente.");

    // Iniciar el servidor
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.error("Error durante la inicialización del servidor:", err);
    process.exit(1); // Salir del proceso si hay un error crítico
  }
};
