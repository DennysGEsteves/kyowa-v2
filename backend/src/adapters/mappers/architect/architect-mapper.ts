import { ArchitectEntity as ArchitectEntity } from 'src/entities';
import { UpsertArchitectDTO } from 'src/controllers/architect/dtos';
import { UserDB } from 'src/repositories/user/types';
import { ArchitectDB } from 'src/repositories/architect/types';
import { UserMapper } from '../user';
import { ClientDB } from 'src/repositories/client/types';

export class ArchitectMapper {
  static fromUpsertArchitectDTO(
    dto: UpsertArchitectDTO,
    architectId?: number,
  ): ArchitectEntity {
    return new ArchitectEntity({
      ...(architectId ? { id: architectId } : {}),
      name: dto.name,
      nameFilter: dto.nameFilter,
      cpf: dto.cpf,
      nasc: dto.nasc,
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
      sellerId: dto.sellerId,
    });
  }

  static fromDB(architect: ArchitectDB): ArchitectEntity {
    return new ArchitectEntity({
      id: architect.id,
      name: architect.name,
      nameFilter: architect.nameFilter,
      cpf: architect.cpf,
      nasc: architect.nasc,
      email: architect.email,
      cep: architect.cep,
      address: architect.address,
      district: architect.district,
      city: architect.city,
      region: architect.region,
      phone1: architect.phone1,
      phone2: architect.phone2,
      obs: architect.obs,
      active: architect.active,
      sellerId: architect.sellerId,

      // clients: ClientMapper.fromArchitectDB(architect),
      seller: UserMapper.fromArchitectDB(architect),
    });
  }

  static fromDBList(architects: ArchitectDB[]): ArchitectEntity[] {
    return architects.map((architect) => ArchitectMapper.fromDB(architect));
  }

  static fromUserDB({ architects }: UserDB): ArchitectEntity[] {
    return architects.map((architect) => {
      return new ArchitectEntity({
        id: architect.id,
        name: architect.name,
        nameFilter: architect.nameFilter,
        cpf: architect.cpf,
        nasc: architect.nasc,
        email: architect.email,
        cep: architect.cep,
        address: architect.address,
        district: architect.district,
        city: architect.city,
        region: architect.region,
        phone1: architect.phone1,
        phone2: architect.phone2,
        obs: architect.obs,
        active: architect.active,
        sellerId: architect.sellerId,
      });
    });
  }

  static fromClientDB({ architect }: ClientDB): ArchitectEntity {
    return new ArchitectEntity({
      id: architect.id,
      name: architect.name,
      nameFilter: architect.nameFilter,
      cpf: architect.cpf,
      nasc: architect.nasc,
      email: architect.email,
      cep: architect.cep,
      address: architect.address,
      district: architect.district,
      city: architect.city,
      region: architect.region,
      phone1: architect.phone1,
      phone2: architect.phone2,
      obs: architect.obs,
      active: architect.active,
      sellerId: architect.sellerId,
    });
  }
}
