/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { User } from "@/@types";
import { type Store } from "@/@types";
import { EditIcon } from "@/components/Icons";

type TableColumnsType = {
  goToUpsert: (store: Store) => void;
  managers: User[];
};

export const searchKeys = ["name", "email"];

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
      accessorKey: "managerId",
      title: "Gerente",
      render: (store: Store) => {
        const user = props.managers.find(
          (item) => store.managerId === item.mid,
        );
        return <span className="">{user?.name}</span>;
      },
    },
    {
      accessorKey: "Edit",
      title: "Editar",
      render: (store: Store) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.goToUpsert(store);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];
};
