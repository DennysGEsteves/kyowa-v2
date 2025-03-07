"use client";

import { Table } from "@/components";
import { PlusIcon } from "@/components/Icons";
import UpsertUserModal from "./UpsertUserModal/UpsertUserModal.view";
import { useLogic } from "./Users.logic";

const RegisterUsersView = () => {
  const { data, methods } = useLogic();

  return (
    <>
      <div className="relative flex size-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased">
                Lista de Usuários
              </h5>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                className="flex select-none items-center gap-3 rounded-lg bg-amber-600 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:bg-amber-800 hover:shadow-lg focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  methods.setModalUser(undefined);
                  methods.setOpenModal(true);
                }}
              >
                <PlusIcon />
                Adicionar usuário
              </button>
            </div>
          </div>
        </div>
        <Table {...data.tableData} />
      </div>
      <UpsertUserModal
        user={data.modalUser}
        openModal={data.openModal}
        setOpenModal={methods.setOpenModal}
      />
    </>
  );
};

export default RegisterUsersView;
