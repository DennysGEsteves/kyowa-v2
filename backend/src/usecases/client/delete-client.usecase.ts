import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../../repositories/client/interfaces/i-client-repository';

@Injectable()
export class DeleteClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.clientRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }
}
