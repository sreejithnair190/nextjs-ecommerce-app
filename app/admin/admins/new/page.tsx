import { AdminForm } from "../admin-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewAdminPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/admin/admins");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Admin</h1>
      <AdminForm />
    </div>
  );
}
