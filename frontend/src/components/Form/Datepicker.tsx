/* eslint-disable @typescript-eslint/no-explicit-any */

import DatePicker from "react-datepicker";
import type { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type FormDatepickerProps = {
  label: string;
  error?: FieldError | undefined;
  selected: Date | null;
  onChange: (date: Date | null) => any;
};

const FormDatepicker = ({ label, error, ...props }: FormDatepickerProps) => {
  return (
    <div className="flex w-full flex-col items-start">
      <label className="text-sm font-bold text-gray-700" htmlFor={label}>
        {label}
      </label>
      <div className="flex w-full gap-4">
        <DatePicker
          dateFormat={"dd/MM/yyyy"}
          showYearDropdown
          selected={props.selected}
          onChange={(date: Date | null) => props.onChange(date)}
          wrapperClassName="w-full"
          customInput={
            <input
              className={twMerge(
                "w-full appearance-none rounded-md border border-gray-300 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none",
                error ? "border-red-500 bg-red-50" : "",
              )}
              id={label}
            />
          }
        />
        <p className="w-1/4 self-center text-sm text-red-500">
          {error && <>* obrigatório</>}
        </p>
      </div>
    </div>
  );
};

export { FormDatepicker };
