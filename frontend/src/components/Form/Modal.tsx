/* eslint-disable react/display-name */
import { Modal } from "flowbite-react";
import { type ReactNode } from "react";
import { CloseXIcon, TrashIcon } from "../Icons";

export type ModalProps = {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: VoidFunction;
  onDelete?: VoidFunction;
};

export const FormModal = ({ children, onClose, isOpen }: ModalProps) => {
  return (
    <Modal show={isOpen} size="2xl" onClose={onClose}>
      {children}
    </Modal>
  );
};

FormModal.Header = ({ children, onClose, onDelete }: ModalProps) => {
  return (
    <div className="flex items-start justify-between rounded-t border-b bg-gray-700 p-5 dark:border-gray-600">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        {children}
      </h3>
      <div>
        {onDelete && (
          <button
            aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"
            onClick={onDelete}
          >
            <TrashIcon />
          </button>
        )}
        <button
          aria-label="Close"
          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          type="button"
          onClick={onClose}
        >
          <CloseXIcon />
        </button>
      </div>
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
