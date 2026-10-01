export interface CreateProductLookupData {
  name: string;
}

export interface UpdateProductLookupData {
  name?: string;
}

export interface IProductLookupRepository<Entity> {
  create(data: CreateProductLookupData): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | null>;
  update(
    id: string,
    data: UpdateProductLookupData,
  ): Promise<Entity | null>;
  delete(id: string): Promise<boolean>;
}
