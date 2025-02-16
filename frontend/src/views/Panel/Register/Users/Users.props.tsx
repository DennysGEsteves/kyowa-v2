/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EditIcon } from "@/components/Icons";
import type { User } from "@/types/user";
import type { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type TableColumnsType = {
  setModalUser: Dispatch<SetStateAction<User | undefined>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
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
      accessorKey: "role",
      title: "Nível",
    },
    {
      accessorKey: "store",
      title: "Loja",
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
              <span className="">{user.status}</span>
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
