import { Server } from "@hapi/hapi";
import { itemRoutes } from "src/modules/item.router";

export const defineRoutes = (server: Server) => {
  itemRoutes(server);
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return { message: "¡Hola desde Hapi.js con TypeScript!" };
    },
  });

  server.route({
    method: "GET",
    path: "/ping",
    handler: (request, h) => {
      return { ok: true };
    },
  });
};
