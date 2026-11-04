import { useApi } from "@/api/api.hook";
import { useInvalidateSalesQuery } from "@/api/Sales/sales.query";
import { useProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import { useProductsQuery } from "@/api/Products/products.query";
import { useClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import { useUsersQuery } from "@/api/Users/users.query";
import { routes } from "@routes";
import type { Sale } from "@entities";
import { getSessionUser } from "@/utils";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {
  consignmentValidationSchema,
  emptyConsignmentFormValues,
  type ConsignmentFormSchema,
} from "./UpsertConsignment.schema";
import {
  formValuesToCreateSaleDTO,
  formValuesToUpdateSaleDTO,
  saleToFormValues,
} from "./UpsertConsignment.transform";

function markAllFieldsTouched(values: unknown): unknown {
  if (Array.isArray(values)) {
    return values.map((item) => markAllFieldsTouched(item));
  }
  if (values !== null && typeof values === "object") {
    return Object.fromEntries(
      Object.entries(values).map(([key, entry]) => [
        key,
        markAllFieldsTouched(entry),
      ]),
    );
  }
  return true;
}

type UseUpsertConsignmentLogicParams = {
  sale?: Sale;
  listHref?: string;
};

export function useUpsertConsignmentLogic({
  sale,
  listHref = routes.consignment.href,
}: UseUpsertConsignmentLogicParams) {
  const { salesApi } = useApi();
  const invalidateSales = useInvalidateSalesQuery();
  const router = useRouter();
  const [isClosingSale, setIsClosingSale] = useState(false);
  const { clients, stores, architects } = useClientStoreArchitectLookups();
  const { data: users = [] } = useUsersQuery();
  const { data: categories = [] } = useProductLookupQuery("categories");
  const { data: products = [] } = useProductsQuery();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const storeOptions = useMemo(
    () => stores.map((store) => ({ value: store.id, label: store.name })),
    [stores],
  );

  const sellerOptions = useMemo(
    () =>
      users
        .filter(
          (user) => user.permission === "sales" && user.active !== false,
        )
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
        .map((user) => ({ value: user.id, label: user.name })),
    [users],
  );

  const clientDisplayValue = useMemo(() => {
    if (!sale?.clientId) return "";
    return clients.find((client) => client.id === sale.clientId)?.name ?? "";
  }, [sale, clients]);

  const architectDisplayValue = useMemo(() => {
    if (!sale?.architectId) return "";
    return (
      architects.find((architect) => architect.id === sale.architectId)?.name ??
      ""
    );
  }, [sale, architects]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  const initialValues = useMemo((): ConsignmentFormSchema => {
    if (sale) {
      return saleToFormValues(sale, products);
    }
    const sessionUser = getSessionUser();
    return {
      ...emptyConsignmentFormValues,
      sellerId: sessionUser?.id ?? "",
    };
  }, [sale, products]);

  const onSubmit = useCallback(
    (values: ConsignmentFormSchema) => {
      if (sale) {
        const payload = formValuesToUpdateSaleDTO(values);
        salesApi.update(sale.id, payload).then(() => {
          invalidateSales();
          navigateBack();
        });
        return;
      }

      const payload = formValuesToCreateSaleDTO(values);
      salesApi.create(payload).then(() => {
        invalidateSales();
        navigateBack();
      });
    },
    [sale, salesApi, invalidateSales, navigateBack],
  );

  const formik = useFormik<ConsignmentFormSchema>({
    enableReinitialize: true,
    initialValues,
    validationSchema: consignmentValidationSchema,
    onSubmit,
  });

  const closeConsignmentAsSale = useCallback(async () => {
    if (!sale) {
      return;
    }

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      void formik.setTouched(
        markAllFieldsTouched(formik.values) as ConsignmentFormSchema,
        true,
      );
      return;
    }

    setIsClosingSale(true);
    try {
      await salesApi.update(sale.id, {
        ...formValuesToUpdateSaleDTO(formik.values),
        type: "sale",
      });
      invalidateSales();
      router.push(listHref);
    } finally {
      setIsClosingSale(false);
    }
  }, [formik, invalidateSales, listHref, router, sale, salesApi]);

  return {
    formik,
    storeOptions,
    sellerOptions,
    clientDisplayValue,
    architectDisplayValue,
    categoryOptions,
    products,
    navigateBack,
    closeConsignmentAsSale,
    isClosingSale,
    listHref,
    title: sale ? "Editar consignação" : "Nova consignação",
    backLabel: "Voltar à consignação",
    isEdit: Boolean(sale),
  };
}
