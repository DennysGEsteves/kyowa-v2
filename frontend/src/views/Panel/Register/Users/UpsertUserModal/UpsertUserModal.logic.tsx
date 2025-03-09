/* eslint-disable react-hooks/exhaustive-deps */
import { useEntitiesContext } from "@/context/Entities.context";
import { GET_USERS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { IForm } from "./UpsertUserModal.schema";
import Transform from "./UpsertUserModal.transform";
import type { UpsertUserModalType } from "./UpsertUserModal.view";

export const useLogic = (props: UpsertUserModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    clearErrors,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const { usersRepository } = useRepository();
  const queryClient = useQueryClient();
  const { stores } = useEntitiesContext();

  const isUserActive = props.user && props.user.active;

  const handleChangeUserActiveStatus = (userId: string) => {
    usersRepository[isUserActive ? "inactive" : "active"](userId).then(() => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
      props.setOpenModal(false);
    });
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertUserDTO(data, props.user?.mid);
    usersRepository[props.user?.mid ? "update" : "create"](payload).then(() => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
      props.setOpenModal(false);
    });
  };

  useEffect(() => {
    clearErrors();

    if (!props.openModal) {
      reset({
        name: "",
      });
    } else if (props.user) {
      reset({ ...props.user });
    }
  }, [props.openModal]);

  return {
    data: {
      control,
      isLoading,
      errors,
      isUserActive,
      stores,
    },
    methods: {
      handleSubmit,
      onSubmit,
      handleChangeUserActiveStatus,
    },
  };
};
