import { Request, ResponseToolkit } from '@hapi/hapi';
import { ItemService } from 'src/modules/item.service';
import { createItemSchema, updateItemSchema } from 'src/modules/joiSchemas';

const service = new ItemService();

export const getItems = async (_: Request, h: ResponseToolkit) => {
  const items = await service.findAll();
  return h.response(items).code(200);
};

export const getItem = async (request: Request, h: ResponseToolkit) => {
  const item = await service.findById(Number(request.params.id));
  if (!item) return h.response({ error: 'Item not found' }).code(404);

  return h.response(item).code(200);
};

export const createItem = async (request: Request, h: ResponseToolkit) => {
  const { error } = createItemSchema.validate(request.payload);
  if (error) return h.response({ error: error.message }).code(400);

  const newItem = await service.create(request.payload as any);
  return h.response(newItem).code(201);
};

export const updateItem = async (request: Request, h: ResponseToolkit) => {
  const { error } = updateItemSchema.validate(request.payload);
  if (error) return h.response({ error: error.message }).code(400);

  const updatedItem = await service.update(Number(request.params.id), request.payload as any);
  if (!updatedItem) return h.response({ error: 'Item not found' }).code(404);

  return h.response(updatedItem).code(200);
};

export const deleteItem = async (request: Request, h: ResponseToolkit) => {
  const success = await service.delete(Number(request.params.id));
  if (!success) return h.response({ error: 'Item not found' }).code(404);

  return h.response().code(204);
};
