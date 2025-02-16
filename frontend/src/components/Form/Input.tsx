import type { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type FormInputProps = {
  label: string;
  error?: FieldError | undefined;
};

const FormInput = ({ label, ...props }: FormInputProps) => {
  return (
    <>
      <div className="mt-6 w-full md:flex md:items-center">
        <div className="md:min-w-28">
          <label
            className="mb-1 block pr-4 font-bold text-white md:mb-0 md:text-left"
            htmlFor={label}
          >
            {label}
          </label>
        </div>
        <div className="md:w-80">
          <input
            className={twMerge(
              "w-full appearance-none rounded border-2 border-gray-200  px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none",
              props.error ? "border-red-500 bg-red-50" : "",
            )}
            id={label}
            {...props}
          />
        </div>
        {props.error && (
          <div className="md:w-28">
            <p className="ml-5 text-sm text-red-400">* obrigatório</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FormInput;
