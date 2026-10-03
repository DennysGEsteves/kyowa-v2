import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClientEntity } from '../../entities/client';
import { IClientRepository } from './interfaces/i-client-repository';
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
