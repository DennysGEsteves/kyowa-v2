import type { DialogProps } from "./component/Dialog.props";
import { isAxiosError } from "axios";

export type FeedbackDialogContent = {
  title: string;
  message: string;
  alertMessage?: string;
  alertType?: "error" | "warning" | "info";
};

function formatMessage(message: unknown): string {
  if (Array.isArray(message)) {
    return message.map(String).join("\n");
  }
  if (typeof message === "string" && message.trim()) {
    return message;
  }
  return "Ocorreu um erro inesperado.";
}

function shouldSkipGlobalFeedbackForUrl(url?: string): boolean {
  return Boolean(url?.includes("/auth/login"));
}

export function buildDialogFromApiError(
  error: unknown,
): FeedbackDialogContent | null {
  if (!isAxiosError(error)) {
    return {
      title: "Erro",
      message: "Ocorreu um erro inesperado. Tente novamente.",
      alertType: "error",
    };
  }

  if (shouldSkipGlobalFeedbackForUrl(error.config?.url)) {
    return null;
  }

  const response = error.response;
  const data = response?.data;

  let statusCode = response?.status ?? 0;
  let detailMessage = "Ocorreu um erro ao processar a solicitação.";

  if (data && typeof data === "object") {
    if ("statusCode" in data && typeof data.statusCode === "number") {
      statusCode = data.statusCode;
    }
    if ("message" in data) {
      detailMessage = formatMessage(
        (data as { message: unknown }).message,
      );
    }
  }

  if (!response) {
    return {
      title: "Falha na conexão",
      message: "Não foi possível conectar ao servidor. Verifique sua conexão.",
      alertType: "error",
    };
  }

  const title =
    statusCode >= 500
      ? "Erro no servidor"
      : statusCode === 403
        ? "Acesso negado"
        : statusCode === 401
          ? "Não autorizado"
          : statusCode === 404
            ? "Não encontrado"
            : "Erro";

  return {
    title,
    message: "Ocorreu um erro ao processar a solicitação.",
    alertMessage: statusCode
      ? `[${statusCode}] ${detailMessage}`
      : detailMessage,
    alertType: "error",
  };
}

export function toDialogPropsFromApiError(
  error: unknown,
  onClose: DialogProps["onClose"],
): DialogProps | null {
  const content = buildDialogFromApiError(error);
  if (!content) return null;

  return {
    id: Date.now(),
    ...content,
    onClose,
  };
}
