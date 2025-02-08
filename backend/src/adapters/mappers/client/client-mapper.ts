import { ClientEntity as ClientEntity } from 'src/entities';
import { UpsertClientDTO } from 'src/controllers/client/dtos';
import { ClientDB } from 'src/repositories/client/types';
import { ArchitectMapper } from '../architect';
import { InterestProduct, Origin } from 'src/entities/client/types';

export class ClientMapper {
  static fromUpsertClientDTO(
    dto: UpsertClientDTO,
    clientId?: number,
  ): ClientEntity {
    return new ClientEntity({
      ...(clientId ? { id: clientId } : {}),
      name: dto.name,
      nameFilter: dto.nameFilter,
      cpf: dto.cpf,
      rg: dto.rg,
      nasc: dto.nasc,
      occupation: dto.occupation,
      email: dto.email,
      cep: dto.cep,
      address: dto.address,
      district: dto.district,
      city: dto.city,
      region: dto.region,
      phone1: dto.phone1,
      phone2: dto.phone2,
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
      cep: client.cep,
      address: client.address,
      district: client.district,
      city: client.city,
      region: client.region,
      phone1: client.phone1,
      phone2: client.phone2,
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
