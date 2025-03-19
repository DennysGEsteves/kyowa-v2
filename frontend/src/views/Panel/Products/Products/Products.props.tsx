/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EditIcon } from "@/components/Icons";
import { type Product } from "@/types";
import type { Dispatch, SetStateAction } from "react";

type TableColumnsType = {
  setModalProduct: Dispatch<SetStateAction<Product | undefined>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const tableColumns = (props: TableColumnsType) => {
  return [
    {
      accessorKey: "name",
      title: "Name",
    },
    {
      accessorKey: "Edit",
      title: "Editar",
      render: (product: Product) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.setModalProduct(product);
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
