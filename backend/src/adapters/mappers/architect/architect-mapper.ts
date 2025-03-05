import { ArchitectEntity as ArchitectEntity } from 'src/entities';
// import { UpsertArchitectDTO } from 'src/controllers/architect/dtos';
import { UserDB } from 'src/repositories/user/types';
import { ArchitectDB } from 'src/repositories/architect/types';
import { UserMapper } from '../user';
import { ClientDB } from 'src/repositories/client/types';
import { slugify } from 'src/util/string';

export class ArchitectMapper {
  static fromUpsertArchitectDTO(dto: any): ArchitectEntity {
    return new ArchitectEntity({
      ...(dto.mid
        ? {
            mid: dto.mid,
          }
        : {
            nameFilter: slugify(dto.name),
          }),
      name: dto.name,
      cpf: dto.cpf,
      birthday: dto.birthday,
      email: dto.email,
      address: dto.address,
      phone: dto.phone,
      obs: dto.obs,
      active: dto.active,
      sellerId: dto.sellerId,
    });
  }

  static fromDB(architect: ArchitectDB): ArchitectEntity {
    return new ArchitectEntity({
      mid: architect.mid,
      id: architect.id,
      name: architect.name,
      nameFilter: architect.nameFilter,
      cpf: architect.cpf,
      birthday: architect.birthday,
      email: architect.email,
      address: architect.address,
      phone: architect.phone,
      obs: architect.obs,
      active: architect.active,
      sellerId: architect.sellerId,

      // clients: ClientMapper.fromArchitectDB(architect),
      seller: architect.seller
        ? UserMapper.fromArchitectDB(architect)
        : undefined,
    });
  }

  static fromDBList(architects: ArchitectDB[]): ArchitectEntity[] {
    return architects.map((architect) => ArchitectMapper.fromDB(architect));
  }

  static fromUserDB({ architects }: UserDB): ArchitectEntity[] {
    return architects.map((architect) => {
      return new ArchitectEntity({
        mid: architect.mid,
        id: architect.id,
        name: architect.name,
        nameFilter: architect.nameFilter,
        cpf: architect.cpf,
        birthday: architect.birthday,
        email: architect.email,
        address: architect.address,
        phone: architect.phone,
        obs: architect.obs,
        active: architect.active,
        sellerId: architect.sellerId,
      });
    });
  }

  static fromClientDB({ architect }: ClientDB): ArchitectEntity {
    return new ArchitectEntity({
      mid: architect.mid,
      id: architect.id,
      name: architect.name,
      nameFilter: architect.nameFilter,
      cpf: architect.cpf,
      birthday: architect.birthday,
      email: architect.email,
      address: architect.address,
      phone: architect.phone,
      obs: architect.obs,
      active: architect.active,
      sellerId: architect.sellerId,
    });
  }
}
