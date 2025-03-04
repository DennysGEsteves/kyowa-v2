export type RequestErrorDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  json?: object;
};

export type RequestErrorDialogActions =
  | { type: "OPEN_DIALOG"; payload: RequestErrorDialogProps }
  | { type: "CLOSE_DIALOG"; payload: RequestErrorDialogProps };
