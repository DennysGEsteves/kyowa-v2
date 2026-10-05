import { routes } from "@routes";
import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect(routes.dashboard.href);
}
