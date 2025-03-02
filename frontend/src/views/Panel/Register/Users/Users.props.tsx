/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EditIcon } from "@/components/Icons";
import type { Store } from "@/types";
import { RoleTranslated, type User } from "@/types";
import type { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type TableColumnsType = {
  setModalUser: Dispatch<SetStateAction<User | undefined>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  stores: Store[];
};

export const GET_USERS_REFETCH_TAG = "GET_USERS";

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
        return <span className="">{RoleTranslated[user.role]}</span>;
      },
    },
    {
      accessorKey: "store",
      title: "Loja",
      render: (user: User) => {
        const store = props.stores.find((item) => user.storeId === item.mid);
        return <span className="">{store?.name}</span>;
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
              props.setModalUser(user);
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
