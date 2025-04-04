import type { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type FormInputProps = {
  label: string;
  error?: FieldError | undefined;
  type?: string;
};

const FormInput = ({ label, type, ...props }: FormInputProps) => {
  return (
    <div className="flex w-full flex-col items-start">
      <label className=" text-sm font-bold text-gray-700" htmlFor={label}>
        {label}
      </label>
      <div className="flex w-full gap-4">
        <input
          className={twMerge(
            "w-full appearance-none rounded-md border border-gray-300 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none",
            props.error ? "border-red-500 bg-red-50" : "",
          )}
          id={label}
          type={type || "text"}
          {...props}
        />
        <p className="w-1/4 self-center text-sm text-red-500">
          {props.error && <>* obrigatório</>}
        </p>
      </div>
    </div>
  );
};

export { FormInput };
