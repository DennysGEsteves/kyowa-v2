import React from "react";
import { renderHook, actHook } from "utils/tests/testing-library";
import { FeedbackDialogProvider } from "../FeedbackDialog.provider";
import { useFeedbackDialog } from "../FeedbackDialog.hook";

describe("Dialog Hook", () => {
  it("should clear all dialogs from the queue", () => {
    const { result } = renderHook(() => useFeedbackDialog(), {
      wrapper: FeedbackDialogProvider,
    });

    actHook(() => {
      result.current.requestError("testing dialog");
      result.current.requestError("testing dialog 2");
      result.current.requestError("testing dialog 3");
      result.current.clearAll();
    });

    expect(result.current.queue.length).toBe(0);
  });

  it("should add and remove a dialog", async () => {
    const { result } = renderHook(() => useFeedbackDialog(), {
      wrapper: FeedbackDialogProvider,
    });

    actHook(() => {
      result.current.requestError("testing dialog");
    });

    expect(result.current.queue.length).toBe(1);

    actHook(() => {
      const { id } = result.current.queue[0];
      result.current.onClose(id);
    });

    expect(result.current.queue.length).toBe(0);
  });
});
