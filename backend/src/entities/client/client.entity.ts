import { CreateClientDto } from '../../controllers/client/dto/create-client.dto';
import { UpdateClientDto } from '../../controllers/client/dto/update-client.dto';
import { ClientDocument } from '../../repositories/client/schemas/client.schema';
import { resolveNameFilter } from '../../util/string/name-filter';
import { ClientOrigin, InterestProduct } from './types';

export interface IClientConstructorParams {
  id?: string;
  name: string;
  nameFilter: string;
  cpf?: string | null;
  rg?: string | null;
  architectId?: string | null;
  nasc?: Date | null;
  occupation?: string | null;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  active?: boolean;
  interestProducts?: InterestProduct[] | null;
  origins?: ClientOrigin[] | null;
  entry: Date;
}

export class ClientEntity {
  public id?: string;
  public name: string;
  public nameFilter: string;
  public cpf: string | null;
  public rg: string | null;
  public architectId: string | null;
  public nasc: Date | null;
  public occupation: string | null;
  public email: string | null;
  public cep: string | null;
  public address: string | null;
  public district: string | null;
  public city: string | null;
  public region: string | null;
  public phone1: string | null;
  public phone2: string | null;
  public obs: string | null;
  public active: boolean;
  public interestProducts: InterestProduct[] | null;
  public origins: ClientOrigin[] | null;
  public entry: Date;

  constructor(params: IClientConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cpf = params.cpf ?? null;
    this.rg = params.rg ?? null;
    this.architectId = params.architectId ?? null;
    this.nasc = params.nasc ?? null;
    this.occupation = params.occupation ?? null;
    this.email = params.email ?? null;
    this.cep = params.cep ?? null;
    this.address = params.address ?? null;
    this.district = params.district ?? null;
    this.city = params.city ?? null;
    this.region = params.region ?? null;
    this.phone1 = params.phone1 ?? null;
    this.phone2 = params.phone2 ?? null;
    this.obs = params.obs ?? null;
    this.active = params.active ?? true;
    this.interestProducts = params.interestProducts ?? null;
    this.origins = params.origins ?? null;
    this.entry = params.entry;
  }

  static fromPersistData(document: ClientDocument): ClientEntity {
    return new ClientEntity({
      id: document._id.toString(),
      name: document.name,
      nameFilter: document.nameFilter,
      cpf: document.cpf,
      rg: document.rg,
      architectId: document.architectId?.toString() ?? null,
      nasc: document.nasc,
      occupation: document.occupation,
      email: document.email,
      cep: document.cep,
      address: document.address,
      district: document.district,
      city: document.city,
      region: document.region,
      phone1: document.phone1,
      phone2: document.phone2,
      obs: document.obs,
      active: document.active,
      interestProducts: document.interestProducts,
      origins: document.origins,
      entry: document.entry,
    });
  }

  static fromCreateClientDto(dto: CreateClientDto): ClientEntity {
    return new ClientEntity({
      name: dto.name,
      nameFilter: resolveNameFilter(dto.name, dto.nameFilter),
      cpf: dto.cpf,
      rg: dto.rg,
      architectId: dto.architectId,
      nasc: dto.nasc ? new Date(dto.nasc) : null,
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
      entry: dto.entry ? new Date(dto.entry) : new Date(),
    });
  }

  static fromUpdateClientDto(
    oldClient: ClientEntity,
    dto: UpdateClientDto,
  ): ClientEntity {
    const name = dto.name ?? oldClient.name;

    return new ClientEntity({
      id: oldClient.id,
      name,
      nameFilter:
        dto.nameFilter ??
        (dto.name !== undefined
          ? resolveNameFilter(name)
          : oldClient.nameFilter),
      cpf: dto.cpf !== undefined ? dto.cpf : oldClient.cpf,
      rg: dto.rg !== undefined ? dto.rg : oldClient.rg,
      architectId:
        dto.architectId !== undefined ? dto.architectId : oldClient.architectId,
      nasc:
        dto.nasc !== undefined
          ? dto.nasc
            ? new Date(dto.nasc)
            : null
          : oldClient.nasc,
      occupation:
        dto.occupation !== undefined ? dto.occupation : oldClient.occupation,
      email: dto.email !== undefined ? dto.email : oldClient.email,
      cep: dto.cep !== undefined ? dto.cep : oldClient.cep,
      address: dto.address !== undefined ? dto.address : oldClient.address,
      district: dto.district !== undefined ? dto.district : oldClient.district,
      city: dto.city !== undefined ? dto.city : oldClient.city,
      region: dto.region !== undefined ? dto.region : oldClient.region,
      phone1: dto.phone1 !== undefined ? dto.phone1 : oldClient.phone1,
      phone2: dto.phone2 !== undefined ? dto.phone2 : oldClient.phone2,
      obs: dto.obs !== undefined ? dto.obs : oldClient.obs,
      active: dto.active !== undefined ? dto.active : oldClient.active,
      interestProducts:
        dto.interestProducts !== undefined
          ? dto.interestProducts
          : oldClient.interestProducts,
      origins: dto.origins !== undefined ? dto.origins : oldClient.origins,
      entry:
        dto.entry !== undefined
          ? dto.entry
            ? new Date(dto.entry)
            : oldClient.entry
          : oldClient.entry,
    });
  }
}
