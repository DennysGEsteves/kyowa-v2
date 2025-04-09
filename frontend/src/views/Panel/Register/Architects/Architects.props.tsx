/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { User } from "@/@types";
import { type Architect } from "@/@types";
import { EditIcon } from "@/components/Icons";

type TableColumnsType = {
  managers: User[];
  goToUpsert: (architect?: Architect) => void;
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
              props.goToUpsert(architect);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];
};
