import { adminRoutes } from "@/routes/adminRoutes";
import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect(adminRoutes.dashboard.href);
}
