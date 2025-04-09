/* eslint-disable react-hooks/exhaustive-deps */
import { GET_ARCHITECTS_REFETCH_TAG } from "@/repositories/api";
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

  const { architectsRepository } = useRepository();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    await form.trigger();

    const payload = Transform.toUpsertArchitectDTO(data, props.architect?.mid);
    architectsRepository[props.architect?.mid ? "update" : "create"](
      payload,
    ).then(() => {
      queryClient.invalidateQueries({ queryKey: [GET_ARCHITECTS_REFETCH_TAG] });
      backToArchitects();
    });
  };

  const backToArchitects = () => {
    router.push(`/cadastros/arquitetos`);
  };

  useEffect(() => {
    form.clearErrors();

    if (!props.architect) {
      form.reset({
        name: "",
      });
    } else if (props.architect) {
      form.reset({ ...props.architect });
    }
  }, [props.architect]);

  return {
    data: {
      form,
    },
    methods: {
      handleSubmit: form.handleSubmit(onSubmit),
      backToArchitects,
    },
  };
};
