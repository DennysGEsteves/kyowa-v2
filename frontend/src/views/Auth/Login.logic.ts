import { useApi } from "@/api/api.hook";
import { adminRoutes } from "@routes";
import { getAuthToken, setAuthToken } from "@utils";
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
        const token = await authApi.login(values);
        setAuthToken(token);
        router.push(adminRoutes.dashboard.href);
      } catch (error) {
        console.log(error);
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
    if (getAuthToken()) {
      router.replace(adminRoutes.dashboard.href);
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
