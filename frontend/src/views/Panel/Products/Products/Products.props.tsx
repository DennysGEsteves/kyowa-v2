/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { type Product } from "@/@types";
import { EditIcon } from "@/components/Icons";

type TableColumnsType = {
  goToUpsert: (product: Product) => void;
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
              props.goToUpsert(product);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];
};
