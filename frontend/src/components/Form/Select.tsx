import type { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type FormSelectProps = {
  label: string;
  error?: FieldError | undefined;
  options: {
    value: string;
    label: string;
  }[];
};

const FormSelect = ({ label, options, ...props }: FormSelectProps) => {
  return (
    <div className="flex w-full flex-col items-start">
      <label className="text-sm font-bold text-gray-700" htmlFor={label}>
        {label}
      </label>
      <div className="flex w-full gap-4">
        <select
          className={twMerge(
            "rounded-mdpx-4 w-full appearance-none rounded-md border border-gray-300 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none",
            props.error ? "border border-red-500 bg-red-50" : "",
          )}
          id={label}
          {...props}
        >
          <option value=""></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="w-1/4 self-center text-sm text-red-500">
          {props.error && <>* obrigatório</>}
        </p>
      </div>
    </div>
  );
};

export { FormSelect };
