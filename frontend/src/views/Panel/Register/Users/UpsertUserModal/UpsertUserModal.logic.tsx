/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import UserResolvers from "../Users.gql";
import type { IForm } from "./UpsertUserModal.schema";
import type { UpsertUserModalType } from "./UpsertUserModal.view";

export const useLogic = (props: UpsertUserModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const isActive = props.user && props.user.active;

  const [upsertUser, { loading, client }] = useMutation(
    props.user?.id ? UserResolvers.UPDATE_USER : UserResolvers.CREATE_USER,
  );

  const [changeUserActiveValue] = useMutation(
    isActive ? UserResolvers.INACTIVE_USER : UserResolvers.ACTIVE_USER,
  );

  const handleChangeUserActiveStatus = (userId: number) => {
    changeUserActiveValue({
      variables: {
        userId,
      },
    }).then(() => {
      client.refetchQueries({
        include: ["GetUsers"],
      });
      props.setOpenModal(false);
    });
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    upsertUser({
      variables: {
        input: {
          ...(props.user?.id ? { id: props.user.id } : {}),
          name: data.name,
          email: data.email,
          phone: data.phone,
          storeId: data.storeId,
          role: data.role,
          login: data.login,
        },
      },
    })
      .then(() => {
        client.refetchQueries({
          include: ["GetUsers"],
        });
        props.setOpenModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    clearErrors();

    if (props.user) {
      reset({ ...props.user });
    }
  }, [props.openModal]);

  return {
    data: {
      control,
      isLoading: loading,
      errors,
      isActive,
    },
    methods: {
      handleSubmit,
      onSubmit,
      handleChangeUserActiveStatus,
    },
  };
};
