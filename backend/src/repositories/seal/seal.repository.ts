import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SealEntity } from '../../entities/seal';
import { ISealRepository } from './interfaces/i-seal-repository';
import { Seal, SealDocument } from './schemas/seal.schema';

@Injectable()
export class SealRepository implements ISealRepository {
  constructor(
    @InjectModel(Seal.name)
    private readonly sealModel: Model<SealDocument>,
  ) {}

  async create(data: SealEntity): Promise<SealEntity> {
    const created = await this.sealModel.create({
      number: data.number,
      storeId: new Types.ObjectId(data.storeId),
      status: data.status,
      productId: new Types.ObjectId(data.productId),
      saleId: data.saleId ? new Types.ObjectId(data.saleId) : null,
      history: data.history.map((entry) => ({
        status: entry.status,
        userId: new Types.ObjectId(entry.userId),
        data: entry.data,
        createdAt: entry.createdAt,
      })),
    });

    return SealEntity.fromPersistData(created);
  }

  async findById(id: string): Promise<SealEntity | null> {
    const seal = await this.sealModel.findById(id).exec();
    return seal ? SealEntity.fromPersistData(seal) : null;
  }

  async findByIds(ids: string[]): Promise<SealEntity[]> {
    if (ids.length === 0) {
      return [];
    }

    const seals = await this.sealModel
      .find({ _id: { $in: ids.map((id) => new Types.ObjectId(id)) } })
      .sort({ number: 1 })
      .exec();

    return seals.map((seal) => SealEntity.fromPersistData(seal));
  }
}
