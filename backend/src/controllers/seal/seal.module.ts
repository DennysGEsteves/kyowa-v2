import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SEAL_REPOSITORY } from '../../repositories/seal/interfaces/i-seal-repository';
import { SealRepository } from '../../repositories/seal/seal.repository';
import { Seal, SealSchema } from '../../repositories/seal/schemas/seal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seal.name, schema: SealSchema }]),
  ],
  providers: [
    {
      provide: SEAL_REPOSITORY,
      useClass: SealRepository,
    },
  ],
  exports: [SEAL_REPOSITORY],
})
export class SealModule {}
