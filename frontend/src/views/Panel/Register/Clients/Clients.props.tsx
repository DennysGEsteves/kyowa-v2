/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EditIcon } from "@/components/Icons";
import type { Client, User } from "@/types";
import type { Dispatch, SetStateAction } from "react";

type TableColumnsType = {
  setModalClient: Dispatch<SetStateAction<Client | undefined>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  managers: User[];
};

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
      accessorKey: "architect",
      title: "Arquiteto",
      render: (client: Client) => {
        return client.architect ? client.architect.name : "";
      },
    },
    {
      accessorKey: "Edit",
      title: "Editar",
      render: (architect: Client) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.setModalClient(architect);
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
