import { useRepository } from "@/repositories/repositories.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { GET_USERS_REVALIDATE_TAG } from "../Users.props";
import type { IForm } from "./UpsertUserModal.scheme";
import type { UpsertUserModalType } from "./UpsertUserModal.view";

export const useLogic = (props: UpsertUserModalType) => {
  const {
    control,
    handleSubmit,
    formState: { isLoading, errors },
    reset,
  } = useForm<IForm>({
    defaultValues: {},
  });

  const { usersRepository } = useRepository();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    usersRepository
      .upsertUser(data)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [GET_USERS_REVALIDATE_TAG] });
        reset();
        props.setOpenModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    //
  }, []);

  console.log(errors);

  return {
    data: {
      control,
      isLoading,
    },
    methods: {
      handleSubmit,
      onSubmit,
    },
  };
};
