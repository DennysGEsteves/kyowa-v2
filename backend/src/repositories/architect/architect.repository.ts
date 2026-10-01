import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ArchitectEntity } from '../../entities/architect';
import {
  CreateArchitectData,
  IArchitectRepository,
  UpdateArchitectData,
} from './interfaces/i-architect-repository';
import { Architect, ArchitectDocument } from './schemas/architect.schema';

@Injectable()
export class ArchitectRepository implements IArchitectRepository {
  constructor(
    @InjectModel(Architect.name)
    private readonly architectModel: Model<ArchitectDocument>,
  ) {}

  async create(data: CreateArchitectData): Promise<ArchitectEntity> {
    const created = await this.architectModel.create({
      ...data,
      sellerId: new Types.ObjectId(data.sellerId),
      active: data.active ?? true,
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<ArchitectEntity[]> {
    const architects = await this.architectModel.find().sort({ name: 1 }).exec();
    return architects.map((architect) => this.toEntity(architect));
  }

  async findById(id: string): Promise<ArchitectEntity | null> {
    const architect = await this.architectModel.findById(id).exec();
    return architect ? this.toEntity(architect) : null;
  }

  async update(
    id: string,
    data: UpdateArchitectData,
  ): Promise<ArchitectEntity | null> {
    const payload: Record<string, unknown> = { ...data };

    if (data.sellerId !== undefined) {
      payload.sellerId = new Types.ObjectId(data.sellerId);
    }

    const architect = await this.architectModel
      .findByIdAndUpdate(id, payload, { new: true, runValidators: true })
      .exec();
    return architect ? this.toEntity(architect) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.architectModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ArchitectDocument): ArchitectEntity {
    return new ArchitectEntity(
      document._id.toString(),
      document.name,
      document.nameFilter,
      document.cpf,
      document.nasc,
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
      document.sellerId.toString(),
    );
  }
}
