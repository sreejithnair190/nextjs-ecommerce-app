import { AdminForm } from "../../admin-form";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function EditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/admin/admins");
  }

  const adminUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!adminUser) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Admin</h1>
      <AdminForm initialData={adminUser} />
    </div>
  );
}
