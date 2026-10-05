import { DialogProps } from "./component/Dialog.props";

export type FeedbackDialogProps = DialogProps;

export type FeedbackDialogActions =
  | { type: "ADD_DIALOG"; payload: DialogProps }
  | { type: "REM_DIALOG"; payload: string | number }
  | { type: "CLOSE_ALL"; payload: undefined };
