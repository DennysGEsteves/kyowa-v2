import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProviderEntity } from '../../entities/provider';
import {
  CreateProviderData,
  IProviderRepository,
  UpdateProviderData,
} from './interfaces/i-provider-repository';
import { Provider, ProviderDocument } from './schemas/provider.schema';

@Injectable()
export class ProviderRepository implements IProviderRepository {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<ProviderDocument>,
  ) {}

  async create(data: CreateProviderData): Promise<ProviderEntity> {
    const created = await this.providerModel.create({
      ...data,
      active: data.active ?? true,
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<ProviderEntity[]> {
    const providers = await this.providerModel
      .find()
      .sort({ name: 1 })
      .exec();
    return providers.map((provider) => this.toEntity(provider));
  }

  async findById(id: string): Promise<ProviderEntity | null> {
    const provider = await this.providerModel.findById(id).exec();
    return provider ? this.toEntity(provider) : null;
  }

  async update(
    id: string,
    data: UpdateProviderData,
  ): Promise<ProviderEntity | null> {
    const provider = await this.providerModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return provider ? this.toEntity(provider) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.providerModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProviderDocument): ProviderEntity {
    return new ProviderEntity(
      document._id.toString(),
      document.name,
      document.nameFilter,
      document.cnpj,
      document.im,
      document.ie,
      document.email,
      document.cep,
      document.address,
      document.district,
      document.city,
      document.region,
      document.phone1,
      document.phone2,
      document.obs,
      document.type,
      document.active,
      document.createdAt,
      document.updatedAt,
    );
  }
}
