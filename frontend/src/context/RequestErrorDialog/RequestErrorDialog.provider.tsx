"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";
import ReactJson from "react-json-view";
import type { RequestErrorDialogProps } from "./RequestErrorDialog.props";

interface RequestErrorDialogContextProps {
  dialogProps: RequestErrorDialogProps;
  setDialogProps: Dispatch<SetStateAction<RequestErrorDialogProps>>;
}

export const RequestErrorDialogContext =
  createContext<RequestErrorDialogContextProps>(
    {} as RequestErrorDialogContextProps,
  );

export function RequestErrorDialogProvider({
  children,
}: {
  children: ReactElement | ReactNode;
}) {
  const [dialogProps, setDialogProps] = useState<RequestErrorDialogProps>({
    open: false,
  });

  return (
    <RequestErrorDialogContext.Provider value={{ dialogProps, setDialogProps }}>
      {children}
      <Modal
        show={dialogProps.open}
        onClose={() => {
          setDialogProps({ open: false });
        }}
      >
        <ModalHeader className="text-white">{dialogProps.title}</ModalHeader>
        <ModalBody className="text-white">
          <p>{dialogProps.message}</p>
          {dialogProps.json && (
            <div className="bg-white">
              <ReactJson
                src={dialogProps.json}
                collapsed={false}
                displayDataTypes={false}
                quotesOnKeys={false}
                name={false}
                enableClipboard
              />
            </div>
          )}
        </ModalBody>
      </Modal>
    </RequestErrorDialogContext.Provider>
  );
}
