"use client";

import { DeleteProviderDialog } from "@/components/admin/delete-provider-dialog";
import { ProviderFormModal } from "@/components/admin/provider-form-modal";
import { ProvidersTable } from "@/components/admin/providers-table";
import { mockProviders } from "@/data/mocks/providers";
import {
  toNameFilter,
  type Provider,
  type ProviderFormValues,
  type ProviderType,
} from "@entities/provider";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? String(Date.now());
}

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function toProvider(values: ProviderFormValues, id: string): Provider {
  const name = values.name.trim();

  return {
    id,
    name,
    nameFilter: toNameFilter(name),
    cnpj: emptyToNull(values.cnpj),
    im: emptyToNull(values.im),
    ie: emptyToNull(values.ie),
    email: emptyToNull(values.email)?.toLowerCase() ?? null,
    cep: emptyToNull(values.cep),
    address: emptyToNull(values.address),
    district: emptyToNull(values.district),
    city: emptyToNull(values.city),
    region: emptyToNull(values.region)?.toUpperCase() ?? null,
    phone1: emptyToNull(values.phone1),
    phone2: emptyToNull(values.phone2),
    obs: emptyToNull(values.obs),
    type: values.type ? (values.type as ProviderType) : null,
    active: values.active,
  };
}

export function ProvidersPanel() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingProvider, setEditingProvider] = useState<
    Provider | undefined
  >();
  const [deleteTarget, setDeleteTarget] = useState<Provider | null>(null);

  const openCreate = useCallback(() => {
    setFormMode("create");
    setEditingProvider(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((provider: Provider) => {
    setFormMode("edit");
    setEditingProvider(provider);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    (values: ProviderFormValues) => {
      if (formMode === "create") {
        setProviders((current) => [...current, toProvider(values, createId())]);
      } else if (editingProvider) {
        setProviders((current) =>
          current.map((provider) =>
            provider.id === editingProvider.id
              ? toProvider(values, provider.id)
              : provider,
          ),
        );
      }
      setFormOpen(false);
      setEditingProvider(undefined);
    },
    [formMode, editingProvider],
  );

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    setProviders((current) =>
      current.filter((provider) => provider.id !== deleteTarget.id),
    );
    setDeleteTarget(null);
  }, [deleteTarget]);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {providers.length}{" "}
          {providers.length === 1
            ? "fornecedor cadastrado"
            : "fornecedores cadastrados"}
        </p>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo fornecedor
        </button>
      </div>

      <ProvidersTable
        providers={providers}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <ProviderFormModal
        open={formOpen}
        mode={formMode}
        provider={editingProvider}
        onClose={() => {
          setFormOpen(false);
          setEditingProvider(undefined);
        }}
        onSubmit={handleFormSubmit}
      />

      <DeleteProviderDialog
        open={Boolean(deleteTarget)}
        provider={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
