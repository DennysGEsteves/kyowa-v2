/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { Client } from "@/@types";
import { EditIcon } from "@/components/Icons";

type TableColumnsType = {
  goToUpsert: (client: Client) => void;
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
      render: (client: Client) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.goToUpsert(client);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];
};
