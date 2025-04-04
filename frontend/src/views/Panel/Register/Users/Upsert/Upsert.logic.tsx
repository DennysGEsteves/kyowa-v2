/* eslint-disable react-hooks/exhaustive-deps */
import { GET_USERS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { IForm } from "./Upsert.schema";
import Transform from "./Upsert.transform";
import type { UpsertProps } from "./Upsert.view";

export const useLogic = (props: UpsertProps) => {
  const form = useForm<IForm>({
    defaultValues: {},
  });

  const router = useRouter();

  const { usersRepository } = useRepository();
  const queryClient = useQueryClient();

  const isUserActive = props.user && props.user.active;

  const handleChangeUserActiveStatus = (userId: string) => {
    usersRepository[isUserActive ? "inactive" : "active"](userId).then(() => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
      backToUsers();
    });
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertUserDTO(data, props.user?.mid);
    usersRepository[props.user?.mid ? "update" : "create"](payload).then(() => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
      backToUsers();
    });
  };

  const backToUsers = () => {
    router.push(`/cadastros/usuarios`);
  };

  useEffect(() => {
    form.clearErrors();

    if (!props.user) {
      form.reset({
        name: "",
      });
    } else if (props.user) {
      form.reset({ ...props.user });
    }
  }, [props.user]);

  return {
    data: {
      isUserActive,
      form,
    },
    methods: {
      handleSubmit: form.handleSubmit(onSubmit),
      handleChangeUserActiveStatus,
      backToUsers,
    },
  };
};
