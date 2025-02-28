import { ClientEntity as ClientEntity } from 'src/entities';
// import { UpsertClientDTO } from 'src/controllers/client/dtos';
import { ClientDB } from 'src/repositories/client/types';
import { ArchitectMapper } from '../architect';
import { InterestProduct, Origin } from 'src/entities/client/types';

export class ClientMapper {
  static fromUpsertClientDTO(dto: any, clientId?: number): ClientEntity {
    return new ClientEntity({
      ...(clientId ? { id: clientId } : {}),
      name: dto.name,
      nameFilter: dto.nameFilter,
      cpf: dto.cpf,
      rg: dto.rg,
      nasc: dto.nasc,
      occupation: dto.occupation,
      email: dto.email,
      address: dto.address,
      phone: dto.phone,
      obs: dto.obs,
      active: dto.active,
      interestProducts: dto.interestProducts,
      origins: dto.origins,
      architectID: dto.architectID,
    });
  }

  static fromDB(client: ClientDB): ClientEntity {
    return new ClientEntity({
      id: client.id,
      name: client.name,
      nameFilter: client.nameFilter,
      cpf: client.cpf,
      rg: client.rg,
      nasc: client.nasc,
      occupation: client.occupation,
      email: client.email,
      address: client.address,
      phone: client.phone,
      obs: client.obs,
      active: client.active,
      interestProducts: client.interestProducts as InterestProduct[],
      origins: client.origins as Origin[],
      architectID: client.architectID,

      architect: ArchitectMapper.fromClientDB(client),
    });
  }

  static fromDBList(clients: ClientDB[]): ClientEntity[] {
    return clients.map((client) => ClientMapper.fromDB(client));
  }
}
