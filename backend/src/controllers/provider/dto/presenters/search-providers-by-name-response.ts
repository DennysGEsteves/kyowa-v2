import { ProviderEntity } from '../../../../entities/provider';

export type SearchProvidersByNameResponse = {
  readonly id: string;
  readonly name: string;
};

export function toSearchProvidersByNameResponse(
  providers: ProviderEntity[],
): SearchProvidersByNameResponse[] {
  return providers.map((provider) => ({
    id: provider.id!,
    name: provider.name,
  }));
}
