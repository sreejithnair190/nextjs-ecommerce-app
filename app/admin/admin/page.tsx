import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    redirect("/profile");
  }

  return (
    <div className="min-h-[80vh] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {session.user.name || "Admin"}.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-primary">1,234</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-primary">856</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-primary">$45,231</p>
          </div>
        </div>
      </div>
    </div>
  );
}
