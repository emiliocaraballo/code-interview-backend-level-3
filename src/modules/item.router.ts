import { Server } from "@hapi/hapi";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "src/modules/item.controller";
import { createItemSchema, updateItemSchema } from "src/modules/joiSchemas";
import Joi from "joi";
import { formatValidationErrors } from "src/utils/validationErrorFormatter";

const JoiId = Joi.object({
  id: Joi.number().integer().required().description("El ID del item").messages({
    "any.required": "Field {#label} is required",
    "number.integer": "Field {#label} must be an integer",
  }),
});

export const itemRoutes = (server: Server) => {
  server.route([
    {
      method: "GET",
      path: "/items",
      handler: getItems,
      options: {
        tags: ["api"],
        description: "Obtener todos los items",
      },
    },
    {
      method: "GET",
      path: "/items/{id}",
      handler: getItem,
      options: {
        tags: ["api"],
        description: "Obtener un item por su id",
        validate: {
          params: JoiId,
          failAction: async (request, h, err: any) => {
            const errors = formatValidationErrors(err);
            return h
              .response({ errors })
              .code(400)
              .takeover();
          },
        },
      },
    },
    {
      method: "POST",
      path: "/items",
      handler: createItem,
      options: {
        tags: ["api"],
        description: "Crear un item",
        validate: {
          payload: createItemSchema,
          failAction: async (request, h, err: any) => {
            const errors = formatValidationErrors(err);
            return h
              .response({ errors })
              .code(400)
              .takeover();
          },
        },
      },
    },
    {
      method: "PUT",
      path: "/items/{id}",
      handler: updateItem,
      options: {
        tags: ["api"],
        description: "Actualizar un item",
        validate: {
          payload: updateItemSchema,
          params: JoiId,
          failAction: async (request, h, err: any) => {
            const errors = formatValidationErrors(err);
            return h
              .response({ errors })
              .code(400)
              .takeover();
          },
        },
      },
    },
    {
      method: "DELETE",
      path: "/items/{id}",
      handler: deleteItem,
      options: {
        tags: ["api"],
        description: "Eliminar un item",
        validate: {
          params: JoiId,
          failAction: async (request, h, err: any) => {
            const errors = formatValidationErrors(err);
            return h
              .response({ errors })
              .code(400)
              .takeover();
          },
        },
      },
    },
  ]);
};
