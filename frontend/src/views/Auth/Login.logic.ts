import { useApi } from "@/api/api.hook";
import { getClientSession, setClientSession } from "@utils";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { LoginFormSchema } from "./Login.schema";

export function LoginLogic() {
  const router = useRouter();
  const { authApi } = useApi();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (values: LoginFormSchema) => {
      setErrorMessage(null);
      setIsPending(true);

      try {
        const user = await authApi.login({
          email: values.email.trim().toLowerCase(),
          password: values.password,
        });
        setClientSession(user);
        router.push("/admin/usuarios");
      } catch (error) {
        if (isAxiosError(error)) {
          setErrorMessage(
            (error.response?.data as { message: string }).message,
          );
        }
      } finally {
        setIsPending(false);
      }
    },
    [authApi, router],
  );

  useEffect(() => {
    if (getClientSession()) {
      router.replace("/admin/usuarios");
    }
  }, [router]);

  return {
    data: {
      isPending,
      errorMessage,
    },
    methods: {
      handleSubmit,
    },
  };
}
