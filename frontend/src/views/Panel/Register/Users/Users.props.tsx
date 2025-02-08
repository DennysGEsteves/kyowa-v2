import type { TableColumnsType } from "@/components/Table/Table.props";
import type { User } from "@/types/user";
import { twMerge } from "tailwind-merge";

export const GET_USERS_REVALIDATE_TAG = "register-get-users";

export const tableColumns: TableColumnsType[] = [
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
    render: (item: User) => {
      return (
        <div key="dennys" className="w-max">
          <div
            className={twMerge(
              "relative grid select-none items-center whitespace-nowrap rounded-md px-2 py-1 font-sans text-xs font-bold uppercase ",
              item.active
                ? "bg-green-500/20 text-green-900"
                : "bg-red-500/20 text-red-900",
            )}
          >
            <span className="">{item.status}</span>
          </div>
        </div>
      );
    },
  },
];
