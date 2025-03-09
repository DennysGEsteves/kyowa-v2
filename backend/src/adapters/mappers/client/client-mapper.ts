import { ClientEntity as ClientEntity } from 'src/entities';
// import { UpsertClientDTO } from 'src/controllers/client/dtos';
import { ClientDB } from 'src/repositories/client/types';
import { ArchitectMapper } from '../architect';
import { InterestProduct, Origin } from 'src/entities/client/types';
import { UpsertClientDTO } from 'src/controllers/client/dto';
import { slugify } from 'src/util/string';

export class ClientMapper {
  static fromUpsertClientDTO(dto: UpsertClientDTO): ClientEntity {
    return new ClientEntity({
      ...(dto.mid
        ? {
            mid: dto.mid,
          }
        : {
            nameFilter: slugify(dto.name),
          }),
      name: dto.name,
      cpf: dto.cpf,
      rg: dto.rg,
      birthday: dto.birthday,
      email: dto.email,
      address: dto.address,
      phone: dto.phone,
      occupation: dto.occupation,
      obs: dto.obs,
      active: dto.active,
      interestProducts: dto.interestProducts,
      origins: dto.origins,
      architectId: dto.architectId,
    });
  }

  static fromDB(client: ClientDB): ClientEntity {
    return new ClientEntity({
      mid: client.mid,
      id: client.id,
      name: client.name,
      nameFilter: client.nameFilter,
      cpf: client.cpf,
      rg: client.rg,
      birthday: client.birthday,
      occupation: client.occupation,
      email: client.email,
      address: client.address,
      phone: client.phone,
      obs: client.obs,
      active: client.active,
      interestProducts: client.interestProducts as InterestProduct[],
      origins: client.origins as Origin[],
      architectId: client.architectId,

      architect: client.architect ? ArchitectMapper.fromClientDB(client) : null,
    });
  }

  static fromDBList(clients: ClientDB[]): ClientEntity[] {
    return clients.map((client) => ClientMapper.fromDB(client));
  }
}
