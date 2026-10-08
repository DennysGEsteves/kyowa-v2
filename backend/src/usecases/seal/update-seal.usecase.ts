import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSealDto } from '../../controllers/seal/dto/update-seal.dto';
import { SealDetail } from '../../entities/seal';
import {
  ISealRepository,
  SEAL_REPOSITORY,
} from '../../repositories/seal/interfaces/i-seal-repository';
import { GetSealDetailUseCase } from './get-seal-detail.usecase';

@Injectable()
export class UpdateSealUseCase {
  constructor(
    @Inject(SEAL_REPOSITORY)
    private readonly sealRepository: ISealRepository,
    private readonly getSealDetailUseCase: GetSealDetailUseCase,
  ) {}

  async execute(
    id: string,
    dto: UpdateSealDto,
    userId: string,
  ): Promise<SealDetail> {
    const seal = await this.sealRepository.findById(id);

    if (!seal?.id) {
      throw new NotFoundException('Lacre não encontrado.');
    }

    const hasChanges =
      seal.number !== dto.number ||
      seal.storeId !== dto.storeId ||
      seal.productId !== dto.productId;

    if (!hasChanges) {
      return this.getSealDetailUseCase.execute(id);
    }

    const updated = await this.sealRepository.update(
      id,
      {
        number: dto.number,
        storeId: dto.storeId,
        productId: dto.productId,
      },
      {
        status: seal.status,
        userId,
        data: {
          previousNumber: seal.number,
          number: dto.number,
          previousStoreId: seal.storeId,
          storeId: dto.storeId,
          previousProductId: seal.productId,
          productId: dto.productId,
        },
        createdAt: new Date(),
      },
    );

    if (!updated) {
      throw new BadRequestException('Não foi possível atualizar o lacre.');
    }

    return this.getSealDetailUseCase.execute(id);
  }
}
