import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ProviderEntity } from '../../entities/provider';
import { PaginatedResult } from '../../shared/types/pagination';
import { escapeRegExp } from '../../shared/util/string/escape-regexp';
import { toNameFilter } from '../../shared/util/string/name-filter';
import {
  IProviderRepository,
  ProviderListFilters,
  ProviderPaginationParams,
} from './interfaces/i-provider-repository';
import { Provider, ProviderDocument } from './schemas/provider.schema';

@Injectable()
export class ProviderRepository implements IProviderRepository {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<ProviderDocument>,
  ) {}

  async create(data: ProviderEntity): Promise<ProviderEntity> {
    const created = await this.providerModel.create({
      ...data,
      active: data.active ?? true,
    });
    return ProviderEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProviderEntity[]> {
    const providers = await this.providerModel.find().sort({ name: 1 }).exec();
    return providers.map((provider) =>
      ProviderEntity.fromPersistData(provider),
    );
  }

  async findIdsByNameFilter(name: string): Promise<string[]> {
    const normalizedName = toNameFilter(name);
    if (!normalizedName) {
      return [];
    }

    const providers = await this.providerModel
      .find({
        nameFilter: { $regex: escapeRegExp(normalizedName) },
      })
      .select('_id')
      .exec();

    return providers.map((provider) => provider._id.toString());
  }

  async findPaginated(
    filters: ProviderListFilters,
    pagination: ProviderPaginationParams,
  ): Promise<PaginatedResult<ProviderEntity>> {
    const query: FilterQuery<ProviderDocument> = {};

    if (filters.name) {
      const normalizedName = toNameFilter(filters.name);
      if (normalizedName) {
        query.nameFilter = {
          $regex: escapeRegExp(normalizedName),
        };
      }
    }

    if (filters.active !== undefined) {
      query.active = filters.active;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [total, providers] = await Promise.all([
      this.providerModel.countDocuments(query).exec(),
      this.providerModel
        .find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / pagination.limit);

    return {
      data: providers.map((provider) =>
        ProviderEntity.fromPersistData(provider),
      ),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: string): Promise<ProviderEntity | null> {
    const provider = await this.providerModel.findById(id).exec();
    return provider ? ProviderEntity.fromPersistData(provider) : null;
  }

  async update(
    id: string,
    data: ProviderEntity,
  ): Promise<ProviderEntity | null> {
    const provider = await this.providerModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return provider ? ProviderEntity.fromPersistData(provider) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.providerModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
