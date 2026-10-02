import { providerTypeLabels, type Provider } from "@entities/provider";
import { Pencil, Trash2 } from "lucide-react";

type ProvidersTableProps = {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
};

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
      }`}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}

function ProviderActions({
  provider,
  onEdit,
  onDelete,
}: {
  provider: Provider;
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onEdit(provider)}
        aria-label={`Editar ${provider.name}`}
        className="rounded-sm p-2 text-kyowa-gold transition hover:bg-kyowa-surface"
      >
        <Pencil className="h-4 w-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(provider)}
        aria-label={`Remover ${provider.name}`}
        className="rounded-sm p-2 text-red-700 transition hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function formatLocation(provider: Provider) {
  if (provider.city && provider.region) {
    return `${provider.city} / ${provider.region}`;
  }
  return provider.city ?? provider.region ?? "—";
}

export function ProvidersTable({
  providers,
  onEdit,
  onDelete,
}: ProvidersTableProps) {
  if (providers.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-kyowa-border bg-white px-4 py-12 text-center text-sm text-kyowa-muted sm:px-6 sm:py-16">
        Nenhum fornecedor cadastrado. Use &quot;Novo fornecedor&quot; para
        adicionar.
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-3 md:hidden">
        {providers.map((provider) => (
          <li
            key={provider.id}
            className="rounded-sm border border-kyowa-border bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-kyowa-ink">{provider.name}</p>
                <p className="mt-1 text-sm text-kyowa-muted">
                  {provider.cnpj ?? "CNPJ não informado"}
                </p>
              </div>
              <StatusBadge active={provider.active} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-kyowa-muted">
                  Tipo
                </dt>
                <dd className="text-kyowa-ink">
                  {provider.type ? providerTypeLabels[provider.type] : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-kyowa-muted">
                  Local
                </dt>
                <dd className="text-kyowa-ink">{formatLocation(provider)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-wide text-kyowa-muted">
                  Contato
                </dt>
                <dd className="text-kyowa-ink">
                  {provider.phone1 ?? provider.email ?? "—"}
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-end border-t border-kyowa-border pt-3">
              <ProviderActions
                provider={provider}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-sm border border-kyowa-border bg-white md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-kyowa-surface text-xs uppercase tracking-wider text-kyowa-muted">
              <tr>
                <th className="px-4 py-4 font-semibold lg:px-6">Nome</th>
                <th className="px-4 py-4 font-semibold lg:px-6">CNPJ</th>
                <th className="px-4 py-4 font-semibold lg:px-6">Tipo</th>
                <th className="px-4 py-4 font-semibold lg:px-6">Cidade / UF</th>
                <th className="px-4 py-4 font-semibold lg:px-6">Telefone</th>
                <th className="px-4 py-4 font-semibold lg:px-6">Status</th>
                <th className="px-4 py-4 text-right font-semibold lg:px-6">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kyowa-border text-kyowa-ink">
              {providers.map((provider) => (
                <tr key={provider.id} className="hover:bg-kyowa-surface/60">
                  <td className="max-w-[200px] px-4 py-4 font-medium lg:px-6">
                    <span className="line-clamp-2">{provider.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 lg:px-6">
                    {provider.cnpj ?? "—"}
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    {provider.type ? providerTypeLabels[provider.type] : "—"}
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    {formatLocation(provider)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 lg:px-6">
                    {provider.phone1 ?? "—"}
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <StatusBadge active={provider.active} />
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <div className="flex justify-end">
                      <ProviderActions
                        provider={provider}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
