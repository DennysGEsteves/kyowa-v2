/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import { Table } from "@/components/Table";
import UpsertUserModal from "./UpsertUserModal/UpsertUserModal.view";
import { useLogic } from "./Users.logic";
import { tableColumns } from "./Users.props";

const RegisterUsersView = () => {
  const { data, methods } = useLogic();

  return (
    <>
      <div className="relative flex size-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased">
                Members list
              </h5>
              <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                See information about all members
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                className="flex select-none items-center gap-3 rounded-lg bg-amber-600 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:bg-amber-800 hover:shadow-lg focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => methods.setOpenModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  strokeWidth="2"
                  className="size-4"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                </svg>
                Adicionar usuário
              </button>
            </div>
          </div>
        </div>
        <Table columns={tableColumns} data={data.users} search />
      </div>
      <UpsertUserModal
        openModal={data.openModal}
        setOpenModal={methods.setOpenModal}
      />
    </>
  );
};

export default RegisterUsersView;
