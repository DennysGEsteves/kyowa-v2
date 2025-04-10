/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { Store } from "@/@types";
import { RoleTranslated, type User } from "@/@types";
import { EditIcon } from "@/components/Icons";
import { twMerge } from "tailwind-merge";

type TableColumnsType = {
  goToUpsert: (user: User) => void;
  stores: Store[];
};

export const searchKeys = ["name", "email"];

export const tableColumns = (props: TableColumnsType) => {
  return [
    {
      accessorKey: "id",
      title: "#",
    },
    {
      accessorKey: "name",
      title: "Name",
    },
    {
      accessorKey: "email",
      title: "Email",
    },
    {
      accessorKey: "phone",
      title: "Telefone",
    },
    {
      accessorKey: "role",
      title: "Nível",
      render: (user: User) => {
        return RoleTranslated[user.role];
      },
    },
    {
      accessorKey: "store",
      title: "Loja",
      render: (user: User) => {
        const store = props.stores.find((item) => user.storeId === item.mid);
        return store?.name;
      },
    },
    {
      accessorKey: "active",
      title: "Status",
      render: (user: User) => {
        return (
          <div className="w-max">
            <div
              className={twMerge(
                "relative grid select-none items-center whitespace-nowrap rounded-md px-2 py-1 font-sans text-xs font-bold uppercase ",
                user.active
                  ? "bg-green-500/20 text-green-900"
                  : "bg-red-500/20 text-red-900",
              )}
            >
              <span className="">{user.active ? "ATIVO" : "INATIVO"}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "Edit",
      title: "Editar",
      render: (user: User) => {
        return (
          <div
            className="w-max cursor-pointer opacity-40 hover:opacity-100"
            onClick={() => {
              props.goToUpsert(user);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];
};
