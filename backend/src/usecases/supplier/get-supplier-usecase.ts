import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/entities';
import { SupplierMapper } from 'src/adapters/mappers/supplier';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';
import { PaginationArgs } from 'src/util/pagination';
import { GetSuppliersByPaginationResponse } from 'src/adapters/presenters/suppliers/dtos/get-suppliers-by-pagination';
import { GetSuppliersByNameResponse } from 'src/adapters/presenters/suppliers/dtos/get-suppliers-by-name';

@Injectable()
export class GetSuppliersUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(): Promise<SupplierEntity[]> {
    const suppliersDB = await this.supplierRepository.findAll();
    const suppliers = SupplierMapper.fromDBList(suppliersDB);
    return suppliers;
  }

  async executeByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<GetSuppliersByPaginationResponse> {
    const res =
      await this.supplierRepository.findAllByPagination(paginationArgs);

    const suppliers = SupplierMapper.fromDBList(res.items);

    return {
      items: suppliers,
      meta: {
        total: res.total,
        page: paginationArgs.page,
        totalPages: Math.ceil(res.total / paginationArgs.limit),
      },
    };
  }

  async executeByName(name: string): Promise<GetSuppliersByNameResponse[]> {
    const suppliersDB = await this.supplierRepository.findAllByName(name);
    const suppliers = SupplierMapper.fromDBList(suppliersDB);

    return suppliers.map((supplier) => ({
      mid: supplier.mid,
      name: supplier.name,
    }));
  }
}
