/* eslint-disable react-hooks/exhaustive-deps */
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { GET_USERS_REFETCH_TAG } from "../Users.props";
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

  const isUserActive = props.user && props.user.active;

  const { usersRepository } = useRepository();

  const queryClient = useQueryClient();

  const handleChangeUserActiveStatus = (userId: number) => {
    usersRepository[isUserActive ? "inactive" : "active"](userId).then(() => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
      props.setOpenModal(false);
    });
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertUserDTO(data, props.user?.id);
    usersRepository[props.user?.id ? "update" : "create"](payload)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
        props.setOpenModal(false);
      })
      .catch((e) => {
        console.log(e);
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
    },
    methods: {
      handleSubmit,
      onSubmit,
      handleChangeUserActiveStatus,
    },
  };
};
