import { useApi } from "@/api/api.hook";
import { useInvalidateArchitectsQuery } from "@/api/Architects/architects.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { adminRoutes } from "@/routes/adminRoutes";
import { permissionLabels, type Architect } from "@entities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  architectValidationSchema,
  emptyArchitectFormValues,
  type ArchitectFormSchema,
} from "./UpsertArchitect.schema";
import {
  architectToFormValues,
  formValuesToUpsertArchitectDTO,
} from "./UpsertArchitect.transform";

type UseUpsertArchitectLogicParams = {
  architect?: Architect;
  listHref?: string;
};

export function useUpsertArchitectLogic({
  architect,
  listHref = adminRoutes.architects.list,
}: UseUpsertArchitectLogicParams) {
  const { architectsApi } = useApi();
  const invalidateArchitects = useInvalidateArchitectsQuery();
  const { data: users = [] } = useUsersQuery();
  const router = useRouter();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const sellerOptions = useMemo(() => {
    const activeUsers = users.filter((user) => user.active);

    return activeUsers.map((user) => ({
      value: user.id,
      label: `${user.name} (${permissionLabels[user.permission]})`,
    }));
  }, [users]);

  const onSubmit = useCallback(
    (values: ArchitectFormSchema) => {
      const payload = formValuesToUpsertArchitectDTO(values);

      if (architect) {
        architectsApi.update(architect.id, payload).then(() => {
          invalidateArchitects();
          navigateBack();
        });
      } else {
        architectsApi.create(payload).then(() => {
          invalidateArchitects();
          navigateBack();
        });
      }
    },
    [architect, architectsApi, invalidateArchitects, navigateBack],
  );

  const formik = useFormik<ArchitectFormSchema>({
    enableReinitialize: true,
    initialValues: architect
      ? architectToFormValues(architect)
      : emptyArchitectFormValues,
    validationSchema: architectValidationSchema,
    onSubmit,
  });

  return {
    formik,
    sellerOptions,
    navigateBack,
    listHref,
    title: architect ? "Editar arquiteto" : "Novo arquiteto",
    isEdit: Boolean(architect),
    backLabel: "Voltar aos arquitetos",
  };
}
