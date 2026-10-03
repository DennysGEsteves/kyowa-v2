import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { ArchitectEntity } from '../../entities/architect';
import { PaginatedResult } from '../../shared/types/pagination';
import { escapeRegExp } from '../../shared/util/string/escape-regexp';
import { toNameFilter } from '../../shared/util/string/name-filter';
import {
  ArchitectListFilters,
  ArchitectPaginationParams,
  IArchitectRepository,
} from './interfaces/i-architect-repository';
import { Architect, ArchitectDocument } from './schemas/architect.schema';

@Injectable()
export class ArchitectRepository implements IArchitectRepository {
  constructor(
    @InjectModel(Architect.name)
    private readonly architectModel: Model<ArchitectDocument>,
  ) {}

  async create(data: ArchitectEntity): Promise<ArchitectEntity> {
    const created = await this.architectModel.create({
      ...data,
      sellerId: new Types.ObjectId(data.sellerId),
      active: data.active ?? true,
    });
    return ArchitectEntity.fromPersistData(created);
  }

  async findAll(): Promise<ArchitectEntity[]> {
    const architects = await this.architectModel
      .find()
      .sort({ name: 1 })
      .exec();
    return architects.map((architect) =>
      ArchitectEntity.fromPersistData(architect),
    );
  }

  async findPaginated(
    filters: ArchitectListFilters,
    pagination: ArchitectPaginationParams,
  ): Promise<PaginatedResult<ArchitectEntity>> {
    const query: FilterQuery<ArchitectDocument> = {};

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

    const [total, architects] = await Promise.all([
      this.architectModel.countDocuments(query).exec(),
      this.architectModel
        .find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / pagination.limit);

    return {
      data: architects.map((architect) =>
        ArchitectEntity.fromPersistData(architect),
      ),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: string): Promise<ArchitectEntity | null> {
    const architect = await this.architectModel.findById(id).exec();
    return architect ? ArchitectEntity.fromPersistData(architect) : null;
  }

  async update(
    id: string,
    data: ArchitectEntity,
  ): Promise<ArchitectEntity | null> {
    const architect = await this.architectModel
      .findByIdAndUpdate(
        id,
        {
          ...data,
          sellerId: new Types.ObjectId(data.sellerId),
        },
        { new: true, runValidators: true },
      )
      .exec();
    return architect ? ArchitectEntity.fromPersistData(architect) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.architectModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
