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

  const { clientsRepository } = useRepository();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    await form.trigger();

    const payload = Transform.toUpsertClientDTO(data, props.client?.mid);
    clientsRepository[props.client?.mid ? "update" : "create"](payload).then(
      () => {
        queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
        backToClients();
      },
    );
  };

  const backToClients = () => {
    router.push(`/cadastros/clientes`);
  };

  useEffect(() => {
    form.clearErrors();

    if (!props.client) {
      form.reset({
        name: "",
      });
    } else if (props.client) {
      form.reset({ ...props.client });
    }
  }, [props.client]);

  return {
    data: {
      form,
    },
    methods: {
      handleSubmit: form.handleSubmit(onSubmit),
      backToClients,
    },
  };
};
