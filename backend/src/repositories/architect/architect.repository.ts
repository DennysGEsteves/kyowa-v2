import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ArchitectEntity } from '../../entities/architect';
import { IArchitectRepository } from './interfaces/i-architect-repository';
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
