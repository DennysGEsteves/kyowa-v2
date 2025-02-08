import { Injectable } from '@nestjs/common';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(clientId: string): Promise<void> {
    return this.clientRepository.delete(clientId);
  }
}
