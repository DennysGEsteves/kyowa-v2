import { saveSession } from "@/services/Session/Session";
import { redirect } from "next/navigation";

export function useLogic() {
  async function loginAction(formData: FormData) {
    "use server";

    const { email, password } = Object.fromEntries(formData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (response.ok) {
      const { access_token } = await response.json();
      await saveSession(access_token);
      redirect("/");
    }
  }

  return {
    methods: {
      loginAction,
    },
  };
}
