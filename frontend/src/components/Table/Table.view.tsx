/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "../Icons";
import { useLogic } from "./Table.logic";
import type { TableComponentType } from "./Table.props";

export default function Table(props: TableComponentType) {
  const { data, methods } = useLogic(props);

  return (
    <>
      {props.search && (
        <div className="flex flex-col items-center justify-end md:flex-row">
          <div className="w-full md:w-72">
            <div className="relative h-10 w-full min-w-[200px]">
              <div className="absolute right-3 top-2/4 grid size-5 -translate-y-2/4 place-items-center text-gray-500">
                <SearchIcon />
              </div>
              <input
                value={data.search}
                className="peer size-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-100"
                placeholder=" "
                onChange={methods.handleSearch}
              />
              <label className="pointer-events-none absolute -top-1.5 left-0 flex size-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-gray-200 before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-r after:border-t after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                Procurar
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-hidden py-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {props.columns.map((column) => (
                <th
                  key={column.title}
                  className="border-y border-gray-100 bg-gray-300 p-4"
                >
                  <p className="block font-sans text-sm font-normal leading-none text-gray-900 antialiased opacity-70">
                    {column.title}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.tableItems.map((item: any, i: number) => {
              return (
                <tr key={i}>
                  {props.columns.map((column, x) => {
                    const cell =
                      (column.render ? column.render(item) : undefined) ||
                      item[column.accessorKey];

                    return (
                      <td
                        key={`${i}_${x}`}
                        className="border-b border-gray-200 p-2"
                      >
                        <div className="flex items-center gap-3">
                          {typeof cell === "string" ? (
                            <p className="block font-sans text-sm font-normal leading-normal text-gray-900 antialiased">
                              {cell}
                            </p>
                          ) : (
                            cell
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {props.pagination && (
        <div className="m-4 flex items-center justify-end gap-8">
          <button
            disabled={data.pagination.disablePreviousPageBtn}
            className="rounded-md border border-slate-300 p-2.5 text-center text-sm text-slate-600 shadow-sm transition-all hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg focus:border-slate-800 focus:bg-slate-800 focus:text-white active:border-slate-800 active:bg-slate-800 active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => methods.onPreviousPage()}
          >
            <ArrowLeftIcon />
          </button>

          <p className="text-slate-600">
            Page{" "}
            <strong className="text-slate-800">{data.pagination.page}</strong>{" "}
            of&nbsp;
            <strong className="text-slate-800">
              {data.pagination.totalPages}
            </strong>
          </p>

          <button
            disabled={data.pagination.disableNextPageBtn}
            className="rounded-md border border-slate-300 p-2.5 text-center text-sm text-slate-600 shadow-sm transition-all hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg focus:border-slate-800 focus:bg-slate-800 focus:text-white active:border-slate-800 active:bg-slate-800 active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => methods.onNextPage()}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </>
  );
}
