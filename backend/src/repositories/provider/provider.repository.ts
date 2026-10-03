import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProviderEntity } from '../../entities/provider';
import { IProviderRepository } from './interfaces/i-provider-repository';
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
