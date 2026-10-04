export interface IProductLookupRepository<Entity extends { name: string }> {
  create(data: Entity): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | null>;
  findIdByName(name: string): Promise<string | null>;
  update(id: string, data: Entity): Promise<Entity | null>;
  delete(id: string): Promise<boolean>;
}
