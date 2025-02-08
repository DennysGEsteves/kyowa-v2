export type FormInputProps = {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
};

const FormSelect = ({ label, options, ...props }: FormInputProps) => {
  return (
    <div className="mt-6 w-full md:flex md:items-center">
      <div className="md:min-w-28">
        <label
          className="mb-1 block pr-4 font-bold text-white md:mb-0 md:text-left"
          htmlFor={label}
        >
          {label}
        </label>
      </div>
      <div className="w-full">
        <select
          className="w-full appearance-none rounded border-2 border-gray-200  px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          id={label}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
