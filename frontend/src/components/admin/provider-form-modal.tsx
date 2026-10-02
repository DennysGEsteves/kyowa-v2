"use client";

import {
  providerTypeLabels,
  providerTypes,
  type Provider,
  type ProviderFormValues,
} from "@entities/provider";
import { useEffect, useState, type FormEvent } from "react";

type ProviderFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  provider?: Provider;
  onClose: () => void;
  onSubmit: (values: ProviderFormValues) => void;
};

const emptyForm: ProviderFormValues = {
  name: "",
  cnpj: "",
  im: "",
  ie: "",
  email: "",
  cep: "",
  address: "",
  district: "",
  city: "",
  region: "",
  phone1: "",
  phone2: "",
  obs: "",
  type: "",
  active: true,
};

function providerToForm(provider: Provider): ProviderFormValues {
  return {
    name: provider.name,
    cnpj: provider.cnpj ?? "",
    im: provider.im ?? "",
    ie: provider.ie ?? "",
    email: provider.email ?? "",
    cep: provider.cep ?? "",
    address: provider.address ?? "",
    district: provider.district ?? "",
    city: provider.city ?? "",
    region: provider.region ?? "",
    phone1: provider.phone1 ?? "",
    phone2: provider.phone2 ?? "",
    obs: provider.obs ?? "",
    type: provider.type ?? "",
    active: provider.active,
  };
}

const fieldClass =
  "w-full rounded-sm border border-kyowa-border px-3 py-2.5 text-sm outline-none focus:border-kyowa-maroon";

function getInitialForm(
  mode: ProviderFormModalProps["mode"],
  provider?: Provider,
): ProviderFormValues {
  if (mode === "edit" && provider) {
    return providerToForm(provider);
  }
  return emptyForm;
}

type ProviderFormModalBodyProps = Omit<ProviderFormModalProps, "open">;

function ProviderFormModalBody({
  mode,
  provider,
  onClose,
  onSubmit,
}: ProviderFormModalBodyProps) {
  const [form, setForm] = useState(() => getInitialForm(mode, provider));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(form);
  }

  const title = mode === "create" ? "Novo fornecedor" : "Editar fornecedor";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="provider-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="provider-form-title"
            className="font-serif text-xl text-kyowa-ink sm:text-2xl"
          >
            {title}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Dados gerais
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="provider-name"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    Nome / Razão social
                  </label>
                  <input
                    id="provider-name"
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="provider-cnpj"
                      className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                    >
                      CNPJ
                    </label>
                    <input
                      id="provider-cnpj"
                      value={form.cnpj}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          cnpj: event.target.value,
                        }))
                      }
                      className={fieldClass}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="provider-type"
                      className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                    >
                      Tipo
                    </label>
                    <select
                      id="provider-type"
                      value={form.type}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          type: event.target
                            .value as ProviderFormValues["type"],
                        }))
                      }
                      className={fieldClass}
                    >
                      <option value="">Selecione</option>
                      {providerTypes.map((type) => (
                        <option key={type} value={type}>
                          {providerTypeLabels[type]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="provider-ie"
                      className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                    >
                      Inscrição estadual
                    </label>
                    <input
                      id="provider-ie"
                      value={form.ie}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          ie: event.target.value,
                        }))
                      }
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="provider-im"
                      className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                    >
                      Inscrição municipal
                    </label>
                    <input
                      id="provider-im"
                      value={form.im}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          im: event.target.value,
                        }))
                      }
                      className={fieldClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Contato
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="provider-email"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    E-mail
                  </label>
                  <input
                    id="provider-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="provider-phone1"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    Telefone 1
                  </label>
                  <input
                    id="provider-phone1"
                    value={form.phone1}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone1: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="provider-phone2"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    Telefone 2
                  </label>
                  <input
                    id="provider-phone2"
                    value={form.phone2}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone2: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Endereço
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="provider-cep"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    CEP
                  </label>
                  <input
                    id="provider-cep"
                    value={form.cep}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        cep: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="provider-address"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    Endereço
                  </label>
                  <input
                    id="provider-address"
                    value={form.address}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        address: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="provider-district"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    Bairro
                  </label>
                  <input
                    id="provider-district"
                    value={form.district}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        district: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="provider-city"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    Cidade
                  </label>
                  <input
                    id="provider-city"
                    value={form.city}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        city: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="provider-region"
                    className="mb-1.5 block text-sm font-medium text-kyowa-ink"
                  >
                    UF
                  </label>
                  <input
                    id="provider-region"
                    value={form.region}
                    maxLength={2}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        region: event.target.value.toUpperCase(),
                      }))
                    }
                    className={fieldClass}
                    placeholder="SP"
                  />
                </div>
              </div>
            </section>

            <section>
              <label
                htmlFor="provider-obs"
                className="mb-1.5 block text-sm font-medium text-kyowa-ink"
              >
                Observações
              </label>
              <textarea
                id="provider-obs"
                rows={3}
                value={form.obs}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    obs: event.target.value,
                  }))
                }
                className={fieldClass}
              />
            </section>

            <label className="flex cursor-pointer items-center gap-3 text-sm text-kyowa-ink">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    active: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-kyowa-border text-kyowa-maroon focus:ring-kyowa-maroon"
              />
              Fornecedor ativo
            </label>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-kyowa-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-kyowa-muted hover:text-kyowa-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-kyowa-maroon-dark"
            >
              {mode === "create" ? "Adicionar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ProviderFormModal({
  open,
  mode,
  provider,
  onClose,
  onSubmit,
}: ProviderFormModalProps) {
  if (!open) return null;

  const formKey =
    mode === "edit" ? `edit-${provider?.id ?? "unknown"}` : "create";

  return (
    <ProviderFormModalBody
      key={formKey}
      mode={mode}
      provider={provider}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
