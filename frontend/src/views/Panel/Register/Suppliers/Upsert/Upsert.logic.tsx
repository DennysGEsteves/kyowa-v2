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

  const { suppliersRepository } = useRepository();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const payload = Transform.toUpsertSupplierDTO(data, props.supplier?.mid);
    suppliersRepository[props.supplier?.mid ? "update" : "create"](
      payload,
    ).then(() => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_REFETCH_TAG] });
      backToSuppliers();
    });
  };

  const backToSuppliers = () => {
    router.push(`/cadastros/fornecedores`);
  };

  useEffect(() => {
    form.clearErrors();

    if (!props.supplier) {
      form.reset({
        name: "",
      });
    } else if (props.supplier) {
      form.reset({ ...props.supplier });
    }
  }, [props.supplier]);

  return {
    data: {
      form,
    },
    methods: {
      handleSubmit: form.handleSubmit(onSubmit),
      backToSuppliers,
    },
  };
};
