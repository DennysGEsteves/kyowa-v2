/* eslint-disable react-hooks/exhaustive-deps */
import { GET_STORES_REFETCH_TAG } from "@/repositories/api";
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

  const { storesRepository } = useRepository();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    await form.trigger();

    const payload = Transform.toUpsertStoreDTO(data, props.store?.mid);
    storesRepository[props.store?.mid ? "update" : "create"](payload).then(
      () => {
        queryClient.invalidateQueries({ queryKey: [GET_STORES_REFETCH_TAG] });
        backToStores();
      },
    );
  };

  const backToStores = () => {
    router.push(`/cadastros/lojas`);
  };

  useEffect(() => {
    form.clearErrors();

    if (!props.store) {
      form.reset({
        name: "",
      });
    } else if (props.store) {
      form.reset({ ...props.store });
    }
  }, [props.store]);

  return {
    data: {
      form,
    },
    methods: {
      handleSubmit: form.handleSubmit(onSubmit),
      backToStores,
    },
  };
};
