import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-surface border border-border rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-foreground">My Profile</h1>
        
        <div className="space-y-4 mb-8">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Name</span>
            <span className="text-lg text-foreground">{session.user.name || "N/A"}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Email</span>
            <span className="text-lg text-foreground">{session.user.email}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Role</span>
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm w-fit font-medium">
              {session.user.role}
            </span>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="px-6 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-semibold rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
