export type DialogProps = {
  id: string | number;
  title?: string;
  message: string;
  alertMessage?: string;
  alertType?: "error" | "warning" | "info";
  onClose: (id: number | string) => void;
  showCloseIcon?: boolean;
  closeText?: string;
};

export type DialogsProps = {
  dialogs: DialogProps[];
};
