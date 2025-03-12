/* eslint-disable @typescript-eslint/no-explicit-any */
import DatePicker from "react-datepicker";

const FormDatepicker = (props: any) => {
  return (
    <>
      <div className="mt-6 w-full md:flex md:items-center">
        <div className="md:min-w-36">
          <label
            className="mb-1 block w-40 pr-4 font-bold text-white md:mb-0 md:text-left"
            htmlFor={props.label}
          >
            {props.label}
          </label>
        </div>
        <div className="md:w-80">
          <DatePicker {...props} dateFormat={"dd/MM/yyyy"} showYearDropdown />
        </div>
      </div>
    </>
  );
};

export default FormDatepicker;
