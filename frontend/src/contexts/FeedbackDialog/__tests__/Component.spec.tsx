import React from "react";
import { render } from "utils/tests/testing-library";
import { screen } from "@testing-library/react";
import Dialog from "../component/Dialog";

describe("Dialog component", () => {
  it("Should render all types of dialogs", () => {
    // given
    render(
      <Dialog
        dialogs={[
          {
            id: 1,
            message: "testing acknowledgement",
            onClose: jest.fn(),
          },
        ]}
      />,
    );

    // then
    expect(screen.getByText(/testing acknowledgement/i)).toBeInTheDocument();
  });
});
