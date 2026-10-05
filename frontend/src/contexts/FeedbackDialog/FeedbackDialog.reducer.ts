import {
  FeedbackDialogActions,
  FeedbackDialogProps,
} from "./FeedbackDialog.props";

export function FeedbackDialogReducer(
  state: FeedbackDialogProps[],
  action: FeedbackDialogActions,
): FeedbackDialogProps[] {
  switch (action.type) {
    case "ADD_DIALOG":
      return [...state, action.payload];
    case "REM_DIALOG":
      return state.filter((dialog) => dialog.id !== action.payload);
    case "CLOSE_ALL":
      return [];
    default:
      throw new Error();
  }
}
