"use client";

import { PageTitle, Section, Table } from "@/components";
import { PlusIcon } from "@/components/Icons";
import { useLogic } from "./Architects.logic";

const RegisterArchitectsView = () => {
  const { data, methods } = useLogic();

  return (
    <>
      <PageTitle>Lista de clientes</PageTitle>
      <Section>
        <div className="p-6">
          <button
            className="flex select-none items-center gap-3 rounded-lg bg-amber-600 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:bg-amber-800 hover:shadow-lg focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => {
              methods.goToUpsert();
            }}
          >
            <PlusIcon />
            Adicionar cliente
          </button>
          <Table {...data.tableData} />
        </div>
      </Section>
    </>
  );
};

export default RegisterArchitectsView;
