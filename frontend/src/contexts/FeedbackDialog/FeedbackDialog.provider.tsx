"use client";

import { Fetch } from "@utils";
import {
  createContext,
  useLayoutEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { toDialogPropsFromApiError } from "./build-dialog-from-api-error";
import { FeedbackDialogActions } from "./FeedbackDialog.props";
import { FeedbackDialogReducer } from "./FeedbackDialog.reducer";
import Dialog from "./component/Dialog";
import { DialogProps } from "./component/Dialog.props";

export const FeedbackDialogContext = createContext<{
  state: DialogProps[];
  dispatch: Dispatch<FeedbackDialogActions>;
}>({ state: [], dispatch: () => undefined });

export function FeedbackDialogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(FeedbackDialogReducer, []);

  useLayoutEffect(() => {
    function onClose(id: string | number) {
      dispatch({ type: "REM_DIALOG", payload: id });
    }

    const interceptorId = Fetch.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const payload = toDialogPropsFromApiError(error, onClose);
        if (payload) {
          dispatch({ type: "ADD_DIALOG", payload });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      Fetch.instance.interceptors.response.eject(interceptorId);
    };
  }, []);

  return (
    <FeedbackDialogContext.Provider value={{ state, dispatch }}>
      {children}
      <Dialog dialogs={state} />
    </FeedbackDialogContext.Provider>
  );
}
