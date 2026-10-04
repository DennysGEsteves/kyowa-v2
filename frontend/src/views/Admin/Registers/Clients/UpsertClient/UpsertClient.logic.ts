import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useApi } from "@/api/api.hook";
import { useInvalidateClientsQuery } from "@/api/Clients/clients.query";
import { adminRoutes } from "@/routes/adminRoutes";
import {
  clientOriginLabels,
  clientOrigins,
  interestProductLabels,
  interestProducts,
  type Client,
} from "@entities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  clientValidationSchema,
  emptyClientFormValues,
  type ClientFormSchema,
} from "./UpsertClient.schema";
import {
  clientToFormValues,
  formValuesToUpsertClientDTO,
} from "./UpsertClient.transform";

type UseUpsertClientLogicParams = {
  client?: Client;
  listHref?: string;
};

export function useUpsertClientLogic({
  client,
  listHref = adminRoutes.clients.href,
}: UseUpsertClientLogicParams) {
  const { clientsApi } = useApi();
  const invalidateClients = useInvalidateClientsQuery();
  const { data: architects = [] } = useArchitectsQuery();
  const router = useRouter();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const architectOptions = useMemo(
    () =>
      architects.map((architect) => ({
        value: architect.id,
        label: architect.name,
      })),
    [architects],
  );

  const interestOptions = useMemo(
    () =>
      interestProducts.map((product) => ({
        value: product,
        label: interestProductLabels[product],
      })),
    [],
  );

  const originOptions = useMemo(
    () =>
      clientOrigins.map((origin) => ({
        value: origin,
        label: clientOriginLabels[origin],
      })),
    [],
  );

  const onSubmit = useCallback(
    (values: ClientFormSchema) => {
      if (client) {
        const payload = formValuesToUpsertClientDTO(values, true);
        clientsApi.update(client.id, payload).then(() => {
          invalidateClients();
          navigateBack();
        });
      } else {
        const payload = formValuesToUpsertClientDTO(values);
        clientsApi.create(payload).then(() => {
          invalidateClients();
          navigateBack();
        });
      }
    },
    [client, clientsApi, invalidateClients, navigateBack],
  );

  const formik = useFormik<ClientFormSchema>({
    enableReinitialize: true,
    initialValues: client ? clientToFormValues(client) : emptyClientFormValues,
    validationSchema: clientValidationSchema,
    onSubmit,
  });

  return {
    formik,
    architectOptions,
    interestOptions,
    originOptions,
    navigateBack,
    listHref,
    title: client ? "Editar cliente" : "Novo cliente",
    isEdit: Boolean(client),
    backLabel: "Voltar aos clientes",
  };
}
