import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { ClientEntity } from '../../entities/client';
import { PaginatedResult } from '../../types/pagination';
import { buildCpfPartialRegex } from '../../util/string/cpf-filter';
import { escapeRegExp } from '../../util/string/escape-regexp';
import { toNameFilter } from '../../util/string/name-filter';
import {
  ClientListFilters,
  ClientPaginationParams,
  IClientRepository,
} from './interfaces/i-client-repository';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(data: ClientEntity): Promise<ClientEntity> {
    const created = await this.clientModel.create({
      ...data,
      architectId: this.toObjectId(data.architectId),
      active: data.active ?? true,
      entry: data.entry ?? new Date(),
    });
    return ClientEntity.fromPersistData(created);
  }

  async findAll(): Promise<ClientEntity[]> {
    const clients = await this.clientModel.find().sort({ name: 1 }).exec();
    return clients.map((client) => ClientEntity.fromPersistData(client));
  }

  async findPaginated(
    filters: ClientListFilters,
    pagination: ClientPaginationParams,
  ): Promise<PaginatedResult<ClientEntity>> {
    const query: FilterQuery<ClientDocument> = {};

    if (filters.name) {
      const normalizedName = toNameFilter(filters.name);
      if (normalizedName) {
        query.nameFilter = {
          $regex: escapeRegExp(normalizedName),
        };
      }
    }

    if (filters.cpf) {
      const cpfRegex = buildCpfPartialRegex(filters.cpf);
      if (cpfRegex) {
        query.cpf = { $regex: cpfRegex };
      }
    }

    if (filters.active !== undefined) {
      query.active = filters.active;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [total, clients] = await Promise.all([
      this.clientModel.countDocuments(query).exec(),
      this.clientModel
        .find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / pagination.limit);

    return {
      data: clients.map((client) => ClientEntity.fromPersistData(client)),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const client = await this.clientModel.findById(id).exec();
    return client ? ClientEntity.fromPersistData(client) : null;
  }

  async update(id: string, data: ClientEntity): Promise<ClientEntity | null> {
    const client = await this.clientModel
      .findByIdAndUpdate(
        id,
        {
          ...data,
          architectId: this.toObjectId(data.architectId),
        },
        { new: true, runValidators: true },
      )
      .exec();
    return client ? ClientEntity.fromPersistData(client) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.clientModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toObjectId(value: string | null | undefined): Types.ObjectId | null {
    if (value === null || value === undefined) {
      return value ?? null;
    }
    return new Types.ObjectId(value);
  }
}
