import { useContext } from "react";
import { RequestErrorDialogContext } from "./RequestErrorDialog.provider";

export const useRequesErrorDialog = () => {
  const { dialogProps, setDialogProps } = useContext(RequestErrorDialogContext);

  function closeDialog() {
    setDialogProps({
      open: false,
    });
  }

  function openDialog(message: string, json?: object) {
    setDialogProps({
      open: true,
      title: "Ops! Ocorreu um erro!",
      message,
      json,
    });
  }

  return {
    openDialog,
    closeDialog,
    dialogProps,
  };
};
