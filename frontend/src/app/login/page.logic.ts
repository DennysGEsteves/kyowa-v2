import { saveSession } from "@/services/Session/Session";
import { redirect } from "next/navigation";

export function logic() {
  async function loginAction(formData: FormData) {
    "use server";

    const { email, password } = Object.fromEntries(formData);

    const response = await fetch(`http://localhost:3001/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { access_token } = await response.json();
      await saveSession(access_token);
      redirect("/");
    }
  }

  const teste = 1;
  return {
    data: {
      teste,
    },
    methods: {
      loginAction,
    },
  };
}
