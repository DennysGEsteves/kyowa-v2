/* eslint-disable react/display-name */
import { Modal } from "flowbite-react";
import { type ReactNode } from "react";

export type ModalProps = {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

export const FormModal = ({ children, onClose, isOpen }: ModalProps) => {
  return (
    <Modal
      show={isOpen}
      size="lg"
      onClose={onClose}
      theme={{
        content: {
          base: "shadow-2xl shadow-black/50",
        },
      }}
    >
      {children}
    </Modal>
  );
};

FormModal.Header = ({ children, onClose }: ModalProps) => {
  return (
    <div className="flex items-start justify-between rounded-t border-b bg-gray-700 p-5 dark:border-gray-600">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        {children}
      </h3>
      <button
        aria-label="Close"
        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        type="button"
        onClick={onClose}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

FormModal.Body = ({ children }: { children: ReactNode }) => {
  return <div className="bg-gray-700 px-6 pb-6">{children}</div>;
};

FormModal.Footer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center space-x-3 rounded-b border-t border-gray-200 bg-gray-700 p-6 dark:border-gray-600">
      <div className="flex w-full justify-center gap-4">{children}</div>
    </div>
  );
};

export default FormModal;
