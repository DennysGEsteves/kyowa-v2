import { useApi } from "@/api/api.hook";
import { useInvalidateBudgetsQuery } from "@/api/Budgets/budgets.query";
import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useClientsQuery } from "@/api/Clients/clients.query";
import { useProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { routes } from "@routes";
import {
  budgetClosingAtLabels,
  budgetClosingAtValues,
  budgetClosingLevelLabels,
  budgetClosingLevels,
  budgetStatusLabels,
  budgetStatuses,
  type Budget,
  type BudgetHistoryItem,
} from "@entities";
import {
  BUDGET_HISTORY_EVENT_CREATED,
  isBudgetHistoryCreationEvent,
  type BudgetHistoryLookups,
} from "./budget-history.format";
import type { BudgetHistoryViewItem } from "./BudgetHistoryTimeline";
import { getSessionUser } from "@/utils";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  budgetValidationSchema,
  emptyBudgetFormValues,
  type BudgetFormSchema,
} from "./UpsertBudget.schema";
import {
  budgetToFormValues,
  formValuesToCreateBudgetDTO,
  formValuesToUpdateBudgetDTO,
} from "./UpsertBudget.transform";

type UseUpsertBudgetLogicParams = {
  budget?: Budget;
  listHref?: string;
};

export function useUpsertBudgetLogic({
  budget,
  listHref = routes.budgets.href,
}: UseUpsertBudgetLogicParams) {
  const { budgetsApi } = useApi();
  const invalidateBudgets = useInvalidateBudgetsQuery();
  const router = useRouter();
  const { data: stores = [] } = useStoresQuery();
  const { data: clients = [] } = useClientsQuery();
  const { data: architects = [] } = useArchitectsQuery();
  const { data: categories = [] } = useProductLookupQuery("categories");
  const { data: users = [] } = useUsersQuery();

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

  const clientDisplayValue = useMemo(() => {
    if (!budget?.clientId) {
      return "";
    }
    return clients.find((client) => client.id === budget.clientId)?.name ?? "";
  }, [budget, clients]);

  const architectDisplayValue = useMemo(() => {
    if (!budget?.architectId) {
      return "";
    }
    return (
      architects.find((architect) => architect.id === budget.architectId)
        ?.name ?? ""
    );
  }, [budget, architects]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  const statusOptions = useMemo(
    () =>
      budgetStatuses.map((status) => ({
        value: status,
        label: budgetStatusLabels[status],
      })),
    [],
  );

  const closingAtOptions = useMemo(
    () =>
      budgetClosingAtValues.map((value) => ({
        value,
        label: budgetClosingAtLabels[value],
      })),
    [],
  );

  const historyLookups = useMemo<BudgetHistoryLookups>(
    () => ({
      getClientName: (id) => {
        if (!id) return "—";
        return clients.find((client) => client.id === id)?.name ?? "—";
      },
      getStoreName: (id) => {
        if (!id) return "—";
        return stores.find((store) => store.id === id)?.name ?? "—";
      },
      getArchitectName: (id) => {
        if (!id) return "—";
        return architects.find((architect) => architect.id === id)?.name ?? "—";
      },
    }),
    [architects, clients, stores],
  );

  const historyItems = useMemo<BudgetHistoryViewItem[]>(() => {
    if (!budget) {
      return [];
    }

    const entries: BudgetHistoryItem[] = [...budget.history];

    if (!entries.some((entry) => isBudgetHistoryCreationEvent(entry.data))) {
      entries.push({
        userId: budget.userId,
        createdAt: budget.createdAt,
        data: {
          event: BUDGET_HISTORY_EVENT_CREATED,
          storeId: budget.storeId,
          clientId: budget.clientId,
          architectId: budget.architectId,
          status: budget.status,
        },
      });
    }

    return entries
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .map((entry: BudgetHistoryItem) => ({
        ...entry,
        userName: users.find((user) => user.id === entry.userId)?.name ?? "—",
      }));
  }, [budget, users]);

  const closingLevelOptions = useMemo(
    () =>
      budgetClosingLevels.map((value) => ({
        value,
        label: budgetClosingLevelLabels[value],
      })),
    [],
  );

  const onSubmit = useCallback(
    (values: BudgetFormSchema) => {
      if (budget) {
        const payload = formValuesToUpdateBudgetDTO(values);
        budgetsApi.update(budget.id, payload).then(() => {
          invalidateBudgets();
          navigateBack();
        });
        return;
      }

      const sessionUser = getSessionUser();
      if (!sessionUser) {
        return;
      }

      const payload = formValuesToCreateBudgetDTO(values, sessionUser.id);
      budgetsApi.create(payload).then(() => {
        invalidateBudgets();
        navigateBack();
      });
    },
    [budget, budgetsApi, invalidateBudgets, navigateBack],
  );

  const formik = useFormik<BudgetFormSchema>({
    enableReinitialize: true,
    initialValues: budget ? budgetToFormValues(budget) : emptyBudgetFormValues,
    validationSchema: budgetValidationSchema,
    onSubmit,
  });

  return {
    formik,
    storeOptions,
    clientDisplayValue,
    architectDisplayValue,
    categoryOptions,
    statusOptions,
    closingAtOptions,
    closingLevelOptions,
    historyItems,
    historyLookups,
    navigateBack,
    listHref,
    title: budget ? "Editar orçamento" : "Novo orçamento",
    backLabel: "Voltar aos orçamentos",
    isEdit: Boolean(budget),
  };
}
