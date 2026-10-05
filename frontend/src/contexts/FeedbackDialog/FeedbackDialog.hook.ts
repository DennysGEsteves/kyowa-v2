import { useContext } from "react";
import { toDialogPropsFromApiError } from "./build-dialog-from-api-error";
import { FeedbackDialogContext } from "./FeedbackDialog.provider";

export function useFeedbackDialog() {
  const { state, dispatch } = useContext(FeedbackDialogContext);

  function clearAll() {
    dispatch({
      type: "CLOSE_ALL",
      payload: undefined,
    });
  }

  function onClose(id: string | number) {
    dispatch({ type: "REM_DIALOG", payload: id });
  }

  function requestError(error: unknown) {
    const payload = toDialogPropsFromApiError(error, onClose);
    if (payload) {
      dispatch({ type: "ADD_DIALOG", payload });
    }
  }

  return {
    requestError,
    clearAll,
    onClose,
    queue: state,
  };
}
