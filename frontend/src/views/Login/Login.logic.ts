import AuthRepository from "@/repositories/Auth/Auth.repository";
import { saveSession } from "@/services/Session/Session";
import { redirect } from "next/navigation";

export function useLogic() {
  async function useLoginAction(formData: FormData) {
    "use server";

    const { email, password } = Object.fromEntries(formData);

    const { signin } = AuthRepository();

    const access_token = await signin({
      email: email as string,
      password: password as string,
    });

    if (access_token) {
      await saveSession(access_token);
      redirect("/");
    }
  }

  return {
    methods: {
      useLoginAction,
    },
  };
}
