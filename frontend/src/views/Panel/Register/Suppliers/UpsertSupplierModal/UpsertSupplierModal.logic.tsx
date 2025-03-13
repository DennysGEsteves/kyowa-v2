/* eslint-disable react-hooks/exhaustive-deps */
import { GET_SUPPLIERS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { IForm } from "./UpsertSupplierModal.schema";
import Transform from "./UpsertSupplierModal.transform";
import type { UpsertSupplierModalType } from "./UpsertSupplierModal.view";

export const useLogic = (props: UpsertSupplierModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    clearErrors,
    register,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const { suppliersRepository } = useRepository();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertSupplierDTO(data, props.supplier?.mid);
    suppliersRepository[props.supplier?.mid ? "update" : "create"](
      payload,
    ).then(() => {
      queryClient.invalidateQueries({
        queryKey: [GET_SUPPLIERS_REFETCH_TAG],
      });
      props.setOpenModal(false);
    });
  };

  useEffect(() => {
    clearErrors();

    if (!props.openModal) {
      reset({
        name: "",
      });
    } else if (props.supplier) {
      reset({ ...props.supplier });
    }
  }, [props.openModal]);

  return {
    data: {
      control,
      isLoading,
      errors,
    },
    methods: {
      handleSubmit,
      onSubmit,
      register,
    },
  };
};
