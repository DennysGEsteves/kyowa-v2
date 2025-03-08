/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EditIcon } from "@/components/Icons";
import type { User } from "@/types";
import { type Architect } from "@/types";
import type { Dispatch, SetStateAction } from "react";

type TableColumnsType = {
  setModalArchitect: Dispatch<SetStateAction<Architect | undefined>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  managers: User[];
};

export const GET_ARCHITECTS_REFETCH_TAG = "GET_ARCHITECTS";

export const tableColumns = (props: TableColumnsType) => {
  return [
    {
      accessorKey: "name",
      title: "Name",
    },
    {
      accessorKey: "email",
      title: "Email",
    },
    {
      accessorKey: "address",
      title: "Endereço",
    },
    {
      accessorKey: "phone",
      title: "Telefone",
    },
    {
      accessorKey: "cpf",
      title: "CPF",
    },
    {
      accessorKey: "seller",
      title: "Vendedor",
      render: (architect: Architect) => {
        return architect.seller ? architect.seller.name : "";
      },
    },
    {
      accessorKey: "Edit",
      title: "Editar",
      render: (architect: Architect) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.setModalArchitect(architect);
              props.setOpenModal(true);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];
};
