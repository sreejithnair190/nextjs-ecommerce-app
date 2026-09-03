import { AdminsClient } from "./admins-client";
import { auth } from "@/lib/auth";

export default async function AdminsPage() {
  const session = await auth();
  const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";

  return <AdminsClient isSuperAdmin={isSuperAdmin} />;
}
