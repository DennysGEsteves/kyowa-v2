import { useApi } from "@/api/api.hook";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { useInvalidateUsersQuery } from "@/api/Users/users.query";
import { adminRoutes } from "@/routes/adminRoutes";
import { permissionLabels, type User, userPermissions } from "@entities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  emptyUserFormValues,
  userValidationSchema,
  type UserFormSchema,
} from "./UpsertUser.schema";
import {
  formValuesToUpsertUserDTO,
  userToFormValues,
} from "./UpsertUser.transform";

type UseUpsertUserLogicParams = {
  user?: User;
  listHref?: string;
};

export function useUpsertUserLogic({
  user,
  listHref = adminRoutes.users.list,
}: UseUpsertUserLogicParams) {
  const { usersApi } = useApi();
  const invalidateUsers = useInvalidateUsersQuery();
  const { data: stores = [] } = useStoresQuery();
  const router = useRouter();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const defaultStoreId = stores[0]?.id ?? "";

  const permissionOptions = useMemo(
    () =>
      userPermissions.map((permission) => ({
        value: permission,
        label: permissionLabels[permission],
      })),
    [],
  );

  const storeOptions = useMemo(
    () =>
      stores.map((store) => ({
        value: store.id,
        label: store.name,
      })),
    [stores],
  );

  const onSubmit = useCallback(
    (values: UserFormSchema) => {
      const userData = formValuesToUpsertUserDTO(values);

      if (user) {
        usersApi.update(user.id, userData).then(() => {
          invalidateUsers();
          navigateBack();
        });
      } else {
        usersApi.create(userData).then(() => {
          invalidateUsers();
          navigateBack();
        });
      }
    },
    [user, usersApi, invalidateUsers, navigateBack],
  );

  const formik = useFormik<UserFormSchema>({
    enableReinitialize: true,
    initialValues: user
      ? userToFormValues(user, defaultStoreId)
      : emptyUserFormValues,
    validationSchema: userValidationSchema,
    onSubmit,
  });

  return {
    formik,
    permissionOptions,
    storeOptions,
    navigateBack,
    listHref,
    title: user ? "Editar usuário" : "Novo usuário",
    isEdit: Boolean(user),
    backLabel: "Voltar aos usuários",
  };
}
