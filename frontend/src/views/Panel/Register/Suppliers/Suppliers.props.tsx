/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { Supplier, User } from "@/@types";
import { EditIcon } from "@/components/Icons";

type TableColumnsType = {
  managers: User[];
  goToUpsert: (supplier?: Supplier) => void;
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
      accessorKey: "Edit",
      title: "Editar",
      render: (supplier: Supplier) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.goToUpsert(supplier);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];
};
