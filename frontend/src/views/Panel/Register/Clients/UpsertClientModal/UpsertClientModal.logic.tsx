/* eslint-disable react-hooks/exhaustive-deps */
import { useEntitiesContext } from "@/context/Entities.context";
import { GET_CLIENTS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { IForm } from "./UpsertClientModal.schema";
import Transform from "./UpsertClientModal.transform";
import type { UpsertClientModalType } from "./UpsertClientModal.view";

export const useLogic = (props: UpsertClientModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    clearErrors,
    register,
    getValues,
  } = useForm<IForm>({
    defaultValues: {},
  });

  console.log(getValues());

  const { clientsRepository } = useRepository();
  const queryClient = useQueryClient();
  const { managers } = useEntitiesContext();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertClientDTO(data, props.client?.mid);
    clientsRepository[props.client?.mid ? "update" : "create"](payload).then(
      () => {
        queryClient.invalidateQueries({
          queryKey: [GET_CLIENTS_REFETCH_TAG],
        });
        props.setOpenModal(false);
      },
    );
  };

  useEffect(() => {
    clearErrors();

    if (!props.openModal) {
      reset({
        name: "",
      });
    } else if (props.client) {
      reset({ ...props.client });
    }
  }, [props.openModal]);

  return {
    data: {
      control,
      isLoading,
      errors,
      managers,
    },
    methods: {
      handleSubmit,
      onSubmit,
      register,
    },
  };
};
