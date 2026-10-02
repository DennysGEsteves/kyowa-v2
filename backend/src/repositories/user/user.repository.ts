import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../../entities/user';
import {
  CreateUserData,
  IUserRepository,
  UpdateUserData,
} from './interfaces/i-user-repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserData): Promise<UserEntity> {
    const created = await this.userModel.create({
      ...data,
      pass: data.pass ?? 'mudar123',
      active: data.active ?? true,
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().sort({ createdAt: -1 }).exec();
    return users.map((user) => this.toEntity(user));
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();
    return user ? this.toEntity(user) : null;
  }

  async update(id: string, data: UpdateUserData): Promise<UserEntity | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return user ? this.toEntity(user) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: UserDocument): UserEntity {
    return new UserEntity(
      document._id.toString(),
      document.email,
      document.name,
      document.pass,
      document.phone,
      document.login,
      document.permission,
      document.storeId?.toString() ?? null,
      document.active,
      document.createdAt,
      document.updatedAt,
    );
  }
}
