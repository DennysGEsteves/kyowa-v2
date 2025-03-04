import { saveSession } from "@/services/Session/Session";
import { redirect } from "next/navigation";
import { useLoginAction } from "./actions/login-action";

export function useLogic() {
  async function useSubmitCredentials(formData: FormData) {
    "use server";

    const result = await useLoginAction(formData);

    console.log(result);

    if (result.success) {
      await saveSession(result.token);
      // Redireciona apenas em caso de sucesso
      redirect("/");
    }

    // Em caso de falha, recarrega a página com a mensagem de erro
    redirect(`/login?error=${encodeURIComponent(result.message)}`);
  }

  return {
    methods: {
      useSubmitCredentials,
    },
  };
}
