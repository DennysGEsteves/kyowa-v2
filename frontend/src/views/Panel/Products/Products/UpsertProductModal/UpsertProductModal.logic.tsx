/* eslint-disable react-hooks/exhaustive-deps */
import { useEntitiesContext } from "@/context/Entities.context";
import { GET_PRODUCTS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { IForm } from "./UpsertProductModal.schema";
import Transform from "./UpsertProductModal.transform";
import type { UpsertProductModalType } from "./UpsertProductModal.view";

export const useLogic = (props: UpsertProductModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    clearErrors,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const { productsRepository } = useRepository();
  const queryClient = useQueryClient();
  const { managers } = useEntitiesContext();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertProductDTO(data, props.product?.mid);
    productsRepository[props.product?.mid ? "update" : "create"](payload).then(
      () => {
        queryClient.invalidateQueries({
          queryKey: [GET_PRODUCTS_REFETCH_TAG],
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
    } else if (props.product) {
      reset({ ...props.product });
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
