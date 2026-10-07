import { useApi } from "@/api/api.hook";
import { useInvalidateStockQuery } from "@/api/Stock/stock.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { routes } from "@routes";
import { getSessionUser } from "@/utils";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  emptyStockFormValues,
  stockValidationSchema,
  type StockFormSchema,
} from "./UpsertStock.schema";
import { formValuesToCreateStockDTO } from "./UpsertStock.transform";

type UseUpsertStockLogicParams = {
  listHref?: string;
};

export function useUpsertStockLogic({
  listHref = routes.stock.href,
}: UseUpsertStockLogicParams = {}) {
  const { stockApi } = useApi();
  const invalidateStock = useInvalidateStockQuery();
  const router = useRouter();
  const { data: stores = [] } = useStoresQuery();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const storeOptions = useMemo(
    () =>
      stores.map((store) => ({
        value: store.id,
        label: store.name,
      })),
    [stores],
  );

  const onSubmit = useCallback(
    (values: StockFormSchema) => {
      const sessionUser = getSessionUser();
      if (!sessionUser) {
        return;
      }

      const payload = formValuesToCreateStockDTO(values, sessionUser.id);

      stockApi.create(payload).then(() => {
        invalidateStock();
        navigateBack();
      });
    },
    [stockApi, invalidateStock, navigateBack],
  );

  const formik = useFormik<StockFormSchema>({
    initialValues: emptyStockFormValues,
    validationSchema: stockValidationSchema,
    onSubmit,
  });

  return {
    formik,
    storeOptions,
    navigateBack,
    listHref,
    title: "Novo lançamento de estoque",
    backLabel: "Voltar ao estoque",
  };
}
