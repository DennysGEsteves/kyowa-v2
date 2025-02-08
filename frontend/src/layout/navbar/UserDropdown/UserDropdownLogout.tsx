import { destroySession } from "@/services/Session/Session";
import { redirect } from "next/navigation";
import type { FC } from "react";

// Função Server Action
async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/login");
}

// Server Component que usa a Server Action
const Logout: FC = () => {
  return (
    <li>
      <form action={logoutAction}>
        <button className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white">
          Sair
        </button>
      </form>
    </li>
  );
};

export default Logout;
