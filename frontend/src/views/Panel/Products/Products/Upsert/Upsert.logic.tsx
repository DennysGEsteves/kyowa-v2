/* eslint-disable react-hooks/exhaustive-deps */
import { GET_PRODUCTS_REFETCH_TAG } from "@/repositories/api";
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

  const { productsRepository } = useRepository();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    await form.trigger();

    const payload = Transform.toUpsertProductDTO(data, props.product?.mid);
    productsRepository[props.product?.mid ? "update" : "create"](payload).then(
      () => {
        queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_REFETCH_TAG] });
        backToProducts();
      },
    );
  };

  const backToProducts = () => {
    router.push(`/produtos/produtos`);
  };

  useEffect(() => {
    form.clearErrors();

    if (!props.product) {
      form.reset({
        name: "",
      });
    } else if (props.product) {
      form.reset({ ...props.product });
    }
  }, [props.product]);

  return {
    data: {
      form,
    },
    methods: {
      handleSubmit: form.handleSubmit(onSubmit),
      backToProducts,
    },
  };
};
