export type FormInputProps = {
  label: string;
};

const FormInput = ({ label, ...props }: FormInputProps) => {
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
      <div className="md:w-full">
        <input
          className="w-full appearance-none rounded border-2 border-gray-200  px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          id={label}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormInput;
