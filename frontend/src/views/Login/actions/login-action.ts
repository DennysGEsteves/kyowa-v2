"use server";

import { useRepositorySSR } from "@/repositories/repositories.hook";
import type { ApolloError } from "@apollo/client";

export async function useLoginAction(formData: FormData) {
  const { email, password } = Object.fromEntries(formData);

  const { authRepository } = useRepositorySSR();

  try {
    const { data } = await authRepository.signin({
      email: email as string,
      password: password as string,
    });

    return {
      success: true,
      token: data.signin.access_token,
    };
  } catch (e) {
    const errors = e as ApolloError;
    const error = JSON.parse(errors.message);

    return {
      success: false,
      message: error.message,
    };
  }

  // try {
  //   const { data } = await authRepository.signin({
  //     email: email as string,
  //     password: password as string,
  //   });

  //   if (data?.signin?.access_token) {
  //     await saveSession(data.signin.access_token);
  //     redirect("/");
  //   }
  // } catch (e) {
  //   const errors = e as ApolloError;

  //   if (errors.message === "NEXT_REDIRECT") {
  //     const error = JSON.parse(errors.message);
  //     redirect(`/login?error=${encodeURIComponent(error.message)}`);
  //   } else {}
  // }
}
