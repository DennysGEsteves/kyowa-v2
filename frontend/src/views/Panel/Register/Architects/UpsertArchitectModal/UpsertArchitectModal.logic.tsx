/* eslint-disable react-hooks/exhaustive-deps */
import { useEntitiesContext } from "@/context/Entities.context";
import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { GET_ARCHITECTS_REFETCH_TAG } from "../Architects.props";
import type { IForm } from "./UpsertArchitectModal.schema";
import Transform from "./UpsertArchitectModal.transform";
import type { UpsertArchitectModalType } from "./UpsertArchitectModal.view";

export const useLogic = (props: UpsertArchitectModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    clearErrors,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const { architectsRepository } = useRepository();
  const queryClient = useQueryClient();
  const { managers } = useEntitiesContext();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertArchitectDTO(data, props.architect?.mid);
    architectsRepository[props.architect?.mid ? "update" : "create"](
      payload,
    ).then(() => {
      queryClient.invalidateQueries({
        queryKey: [GET_ARCHITECTS_REFETCH_TAG],
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
    } else if (props.architect) {
      reset({ ...props.architect });
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
