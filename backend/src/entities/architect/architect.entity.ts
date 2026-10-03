import { CreateArchitectDto } from '../../controllers/architect/dto/create-architect.dto';
import { UpdateArchitectDto } from '../../controllers/architect/dto/update-architect.dto';
import { Address, toAddress } from '../../types/address';
import { ArchitectDocument } from '../../repositories/architect/schemas/architect.schema';
import { resolveNameFilter } from '../../util/string/name-filter';

export interface IArchitectConstructorParams {
  id?: string;
  name: string;
  nameFilter: string;
  cpf?: string | null;
  nasc?: Date | null;
  email?: string | null;
  address?: Address | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  active?: boolean;
  sellerId: string;
}

export class ArchitectEntity {
  public id?: string;
  public name: string;
  public nameFilter: string;
  public cpf: string | null;
  public nasc: Date | null;
  public email: string | null;
  public address: Address | null;
  public phone1: string | null;
  public phone2: string | null;
  public obs: string | null;
  public active: boolean;
  public sellerId: string;

  constructor(params: IArchitectConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cpf = params.cpf ?? null;
    this.nasc = params.nasc ?? null;
    this.email = params.email ?? null;
    this.address = params.address ?? null;
    this.phone1 = params.phone1 ?? null;
    this.phone2 = params.phone2 ?? null;
    this.obs = params.obs ?? null;
    this.active = params.active ?? true;
    this.sellerId = params.sellerId;
  }

  static fromPersistData(document: ArchitectDocument): ArchitectEntity {
    return new ArchitectEntity({
      id: document._id.toString(),
      name: document.name,
      nameFilter: document.nameFilter,
      cpf: document.cpf,
      nasc: document.nasc,
      email: document.email,
      address: document.address ?? null,
      phone1: document.phone1,
      phone2: document.phone2,
      obs: document.obs,
      active: document.active,
      sellerId: document.sellerId.toString(),
    });
  }

  static fromCreateArchitectDto(dto: CreateArchitectDto): ArchitectEntity {
    return new ArchitectEntity({
      name: dto.name,
      nameFilter: resolveNameFilter(dto.name, dto.nameFilter),
      cpf: dto.cpf,
      nasc: dto.nasc ? new Date(dto.nasc) : null,
      email: dto.email,
      address: toAddress(dto.address),
      phone1: dto.phone1,
      phone2: dto.phone2,
      obs: dto.obs,
      active: dto.active,
      sellerId: dto.sellerId,
    });
  }

  static fromUpdateArchitectDto(
    oldArchitect: ArchitectEntity,
    dto: UpdateArchitectDto,
  ): ArchitectEntity {
    const name = dto.name ?? oldArchitect.name;

    return new ArchitectEntity({
      id: oldArchitect.id,
      name,
      nameFilter:
        dto.nameFilter ??
        (dto.name !== undefined
          ? resolveNameFilter(name)
          : oldArchitect.nameFilter),
      cpf: dto.cpf !== undefined ? dto.cpf : oldArchitect.cpf,
      nasc:
        dto.nasc !== undefined
          ? dto.nasc
            ? new Date(dto.nasc)
            : null
          : oldArchitect.nasc,
      email: dto.email !== undefined ? dto.email : oldArchitect.email,
      address:
        dto.address !== undefined
          ? toAddress(dto.address)
          : oldArchitect.address,
      phone1: dto.phone1 !== undefined ? dto.phone1 : oldArchitect.phone1,
      phone2: dto.phone2 !== undefined ? dto.phone2 : oldArchitect.phone2,
      obs: dto.obs !== undefined ? dto.obs : oldArchitect.obs,
      active: dto.active !== undefined ? dto.active : oldArchitect.active,
      sellerId: dto.sellerId ?? oldArchitect.sellerId,
    });
  }
}
