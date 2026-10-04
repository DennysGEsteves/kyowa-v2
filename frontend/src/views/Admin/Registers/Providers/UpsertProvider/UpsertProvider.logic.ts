import { useApi } from "@/api/api.hook";
import { useInvalidateProvidersQuery } from "@/api/Providers/providers.query";
import { adminRoutes } from "@/routes/adminRoutes";
import { providerTypeLabels, providerTypes, type Provider } from "@entities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  emptyProviderFormValues,
  providerValidationSchema,
  type ProviderFormSchema,
} from "./UpsertProvider.schema";
import {
  formValuesToUpsertProviderDTO,
  providerToFormValues,
} from "./UpsertProvider.transform";

type UseUpsertProviderLogicParams = {
  provider?: Provider;
  listHref?: string;
};

export function useUpsertProviderLogic({
  provider,
  listHref = adminRoutes.providers.href,
}: UseUpsertProviderLogicParams) {
  const { providersApi } = useApi();
  const invalidateProviders = useInvalidateProvidersQuery();
  const router = useRouter();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const typeOptions = useMemo(
    () =>
      providerTypes.map((type) => ({
        value: type,
        label: providerTypeLabels[type],
      })),
    [],
  );

  const onSubmit = useCallback(
    (values: ProviderFormSchema) => {
      const payload = formValuesToUpsertProviderDTO(values);

      if (provider) {
        providersApi.update(provider.id, payload).then(() => {
          invalidateProviders();
          navigateBack();
        });
      } else {
        providersApi.create(payload).then(() => {
          invalidateProviders();
          navigateBack();
        });
      }
    },
    [provider, providersApi, invalidateProviders, navigateBack],
  );

  const formik = useFormik<ProviderFormSchema>({
    enableReinitialize: true,
    initialValues: provider
      ? providerToFormValues(provider)
      : emptyProviderFormValues,
    validationSchema: providerValidationSchema,
    onSubmit,
  });

  return {
    formik,
    typeOptions,
    navigateBack,
    listHref,
    title: provider ? "Editar fornecedor" : "Novo fornecedor",
    isEdit: Boolean(provider),
    backLabel: "Voltar aos fornecedores",
  };
}
