import { Repository } from 'typeorm';
import { Item } from 'src/models/item.entity';
import { AppDataSource } from 'src/config/typeorm.config';
export class ItemService {
    private itemRepository: Repository<Item>;
    constructor() {
        this.itemRepository = AppDataSource.getRepository(Item);
    }

    async findAll(): Promise<Item[]> {
        return this.itemRepository.find();
      }
    
      async findById(id: number): Promise<Item | null> {
        return this.itemRepository.findOneBy({ id });
      }
    
      async create(item: Partial<Item>): Promise<Item> {
        const newItem = this.itemRepository.create(item);
        return this.itemRepository.save(newItem);
      }
    
      async update(id: number, item: Partial<Item>): Promise<Item | null> {
        const existingItem = await this.findById(id);
        if (!existingItem) return null;
    
        const updatedItem = this.itemRepository.merge(existingItem, item);
        return this.itemRepository.save(updatedItem);
      }
    
      async delete(id: number): Promise<boolean> {
        const result = await this.itemRepository.delete(id);
        return result.affected === 1;
      }
    
}