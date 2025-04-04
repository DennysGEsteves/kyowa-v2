import type { ControllerRenderProps } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FormCheckboxGroupProps = {
  label: string;
  field: ControllerRenderProps<any, any>;
  options: {
    name: string;
    id: string;
  }[];
};

const FormCheckboxGroup = ({
  label,
  options,
  field,
}: FormCheckboxGroupProps) => {
  return (
    <div className="flex w-full flex-col items-start">
      <label className=" text-sm font-bold text-gray-700" htmlFor={label}>
        {label}
      </label>
      <div className="mt-2 flex w-full gap-4">
        <fieldset className="flex flex-wrap gap-4">
          {options.map((option) => (
            <div key={option.id} className="mb-4 flex items-center">
              <input
                checked={field.value?.includes(option.id)}
                id={option.id}
                type="checkbox"
                value={option.id}
                name={option.id}
                className="size-4 rounded-sm border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                onChange={(e) => {
                  const value = e.target.value;
                  if (e.target.checked) {
                    // Adiciona o valor ao array se marcado
                    field.onChange([...(field.value || []), value]);
                  } else {
                    // Remove o valor do array se desmarcado
                    field.onChange(
                      (field.value || []).filter(
                        (item: string) => item !== value,
                      ),
                    );
                  }
                }}
              />
              <label
                htmlFor={option.id}
                className="ms-1 text-sm font-medium text-gray-900"
              >
                {option.name}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export { FormCheckboxGroup };
