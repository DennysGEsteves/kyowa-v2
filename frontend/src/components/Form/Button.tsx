import type { FC } from "react";
import { twMerge } from "tailwind-merge";

export type FormSubmitBtnProps = {
  label?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

export const FormBtnSubmit: FC<FormSubmitBtnProps> = ({
  label,
  isLoading,
  ...props
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        "w-full rounded  px-4 py-2 font-bold text-white shadow hover:bg-amber-800 focus:outline-none",
        isLoading ? "pointer-events-none opacity-80" : "bg-amber-600",
      )}
      {...props}
    >
      {label}
    </button>
  );
};

export const FormBtnCancel: FC<FormSubmitBtnProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded border border-gray-600 bg-transparent px-4 py-2 font-bold text-white shadow hover:bg-gray-600 focus:outline-none"
      type="button"
    >
      Cancelar
    </button>
  );
};

export const FormBtnDanger: FC<FormSubmitBtnProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded border border-red-800 bg-red-600 px-4 py-2 font-bold text-white shadow hover:bg-red-800 focus:outline-none"
      type="button"
    >
      {label}
    </button>
  );
};

export const FormBtnAction: FC<FormSubmitBtnProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded border border-blue-800 bg-blue-600 px-4 py-2 font-bold text-white shadow hover:bg-blue-800 focus:outline-none"
      type="button"
    >
      {label}
    </button>
  );
};
