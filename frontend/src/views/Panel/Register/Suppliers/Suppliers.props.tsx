/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EditIcon } from "@/components/Icons";
import type { Supplier, User } from "@/@types";
import type { Dispatch, SetStateAction } from "react";

type TableColumnsType = {
  setModalSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
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
      accessorKey: "Edit",
      title: "Editar",
      render: (supplier: Supplier) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.setModalSupplier(supplier);
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
