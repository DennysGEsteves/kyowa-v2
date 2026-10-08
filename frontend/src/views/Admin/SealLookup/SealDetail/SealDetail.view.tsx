"use client";

import { AdminFormLayout } from "@/app/(layout)/AdminFormLayout";
import { routes } from "@routes";
import { sealNumberTagClass } from "@entities";
import { SealDetailEditForm } from "./SealDetail.form";
import { SealHistoryTimeline } from "./SealDetail.timeline";
import { useSealDetailLogic } from "./SealDetail.logic";

type SealDetailViewProps = {
  sealId: string;
};

export function SealDetailView({ sealId }: SealDetailViewProps) {
  const {
    seal,
    productDisplayValue,
    storeOptions,
    isLoading,
    isError,
    refetch,
    navigateBack,
  } = useSealDetailLogic(sealId);

  if (isLoading) {
    return <p className="text-sm text-kyowa-muted">Carregando lacre…</p>;
  }

  if (isError || !seal) {
    return (
      <p className="text-sm text-red-600">
        Não foi possível carregar o lacre.{" "}
        <button
          type="button"
          className="font-medium underline"
          onClick={navigateBack}
        >
          Voltar à consulta
        </button>
      </p>
    );
  }

  return (
    <AdminFormLayout
      backHref={routes.sealLookup.href}
      backLabel="Voltar à consulta"
      maxWidth="3xl"
    >
      <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-xl text-kyowa-ink sm:text-2xl">
            Lacre
          </h2>
          <span className={sealNumberTagClass}>{seal.number}</span>
        </div>
      </div>

      <div className="grid gap-6 border-b border-kyowa-border px-5 py-6 sm:grid-cols-2 sm:px-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-kyowa-ink">
            Histórico
          </h3>
          <SealHistoryTimeline items={seal.history} />
        </div>

        <SealDetailEditForm
          seal={seal}
          sealId={sealId}
          productDisplayValue={productDisplayValue}
          storeOptions={storeOptions}
          onSaved={refetch}
          onCancel={navigateBack}
        />
      </div>
    </AdminFormLayout>
  );
}
