/* eslint-disable react-hooks/exhaustive-deps */
import { useEntitiesContext } from "@/context/Entities.context";
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { GET_USERS_REFETCH_TAG } from "../Stores.props";
import type { IForm } from "./UpsertStoreModal.schema";
import Transform from "./UpsertStoreModal.transform";
import type { UpsertStoreModalType } from "./UpsertStoreModal.view";

export const useLogic = (props: UpsertStoreModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    clearErrors,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const { storesRepository } = useRepository();
  const queryClient = useQueryClient();
  const { managers } = useEntitiesContext();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertStoreDTO(data, props.store?.mid);
    storesRepository[props.store?.mid ? "update" : "create"](payload)
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
    } else if (props.store) {
      reset({ ...props.store });
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
    },
  };
};
