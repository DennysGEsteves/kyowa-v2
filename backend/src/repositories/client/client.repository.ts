import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClientEntity } from '../../entities/client';
import {
  CreateClientData,
  IClientRepository,
  UpdateClientData,
} from './interfaces/i-client-repository';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(data: CreateClientData): Promise<ClientEntity> {
    const created = await this.clientModel.create({
      ...data,
      architectId: this.toObjectId(data.architectId),
      active: data.active ?? true,
      entry: data.entry ?? new Date(),
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<ClientEntity[]> {
    const clients = await this.clientModel.find().sort({ name: 1 }).exec();
    return clients.map((client) => this.toEntity(client));
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const client = await this.clientModel.findById(id).exec();
    return client ? this.toEntity(client) : null;
  }

  async update(
    id: string,
    data: UpdateClientData,
  ): Promise<ClientEntity | null> {
    const payload: Record<string, unknown> = { ...data };

    if ('architectId' in data) {
      payload.architectId = this.toObjectId(data.architectId);
    }

    const client = await this.clientModel
      .findByIdAndUpdate(id, payload, { new: true, runValidators: true })
      .exec();
    return client ? this.toEntity(client) : null;
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

  private toEntity(document: ClientDocument): ClientEntity {
    return new ClientEntity(
      document._id.toString(),
      document.name,
      document.nameFilter,
      document.cpf,
      document.rg,
      document.architectId?.toString() ?? null,
      document.nasc,
      document.occupation,
      document.email,
      document.cep,
      document.address,
      document.district,
      document.city,
      document.region,
      document.phone1,
      document.phone2,
      document.obs,
      document.active,
      document.interestProducts,
      document.origins,
      document.entry,
    );
  }
}
