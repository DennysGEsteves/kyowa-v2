import React, { useReducer } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FeedbackDialogReducer } from "../FeedbackDialog.reducer";

const Template = ({ onClose }: { onClose: () => void }) => {
  const [state, dispatch] = useReducer(FeedbackDialogReducer, []);

  return (
    <div>
      {state.map((dialog) => (
        <button
          onClick={() =>
            dispatch({
              type: "REM_DIALOG",
              payload: dialog.id,
            })
          }
          key={dialog.id}
        >
          {dialog.message}
        </button>
      ))}

      <button
        onClick={() =>
          dispatch({
            type: "ADD_DIALOG",
            payload: {
              id: state.length + 1,
              message: `testing-${state.length + 1}`,
              onClose,
            },
          })
        }
      >
        Submit
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "CLOSE_ALL",
            payload: undefined,
          })
        }
      >
        Clear
      </button>
    </div>
  );
};

describe("Dialog Context", () => {
  it("Should add a new dialog", () => {
    render(<Template onClose={() => {}} />);

    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText("testing-1")).toBeInTheDocument();
  });

  it("Should remove a dialog", () => {
    render(<Template onClose={() => {}} />);

    fireEvent.click(screen.getByText(/Submit/i));
    fireEvent.click(screen.getByText("testing-1"));

    expect(screen.queryByText("testing-1")).toBeNull();
  });

  it("Should remove all dialogs", () => {
    render(<Template onClose={() => {}} />);

    fireEvent.click(screen.getByText(/Submit/i));
    fireEvent.click(screen.getByText(/Submit/i));
    fireEvent.click(screen.getByText(/Clear/i));

    expect(screen.queryByText("testing-1")).toBeNull();
    expect(screen.queryByText("testing-2")).toBeNull();
  });
});
