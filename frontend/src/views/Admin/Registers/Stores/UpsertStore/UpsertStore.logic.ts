import { useApi } from "@/api/api.hook";
import { useInvalidateStoresQuery } from "@/api/Stores/stores.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { adminRoutes } from "@/routes/adminRoutes";
import { permissionLabels, type Store } from "@entities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  emptyStoreFormValues,
  storeValidationSchema,
  type StoreFormSchema,
} from "./UpsertStore.schema";
import {
  formValuesToUpsertStoreDTO,
  storeToFormValues,
} from "./UpsertStore.transform";

type UseUpsertStoreLogicParams = {
  store?: Store;
  listHref?: string;
};

export function useUpsertStoreLogic({
  store,
  listHref = adminRoutes.stores.list,
}: UseUpsertStoreLogicParams) {
  const { storesApi } = useApi();
  const invalidateStores = useInvalidateStoresQuery();
  const { data: users = [] } = useUsersQuery();
  const router = useRouter();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const managerOptions = useMemo(
    () =>
      users
        .filter((user) => user.active)
        .filter((user) => user.permission === "manager")
        .map((user) => ({
          value: user.id,
          label: `${user.name} (${permissionLabels[user.permission]})`,
        })),
    [users],
  );

  const onSubmit = useCallback(
    (values: StoreFormSchema) => {
      if (store) {
        const payload = formValuesToUpsertStoreDTO(values);
        storesApi.update(store.id, payload).then(() => {
          invalidateStores();
          navigateBack();
        });
      } else {
        const payload = formValuesToUpsertStoreDTO(values);
        storesApi.create(payload).then(() => {
          invalidateStores();
          navigateBack();
        });
      }
    },
    [store, storesApi, invalidateStores, navigateBack],
  );

  const formik = useFormik<StoreFormSchema>({
    enableReinitialize: true,
    initialValues: store ? storeToFormValues(store) : emptyStoreFormValues,
    validationSchema: storeValidationSchema,
    onSubmit,
  });

  return {
    formik,
    managerOptions,
    navigateBack,
    listHref: listHref,
    title: store ? "Editar loja" : "Nova loja",
    isEdit: Boolean(store),
    backLabel: "Voltar às lojas",
  };
}
