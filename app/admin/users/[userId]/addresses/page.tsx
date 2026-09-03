import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AddressesClient } from "./addresses-client";

export default async function AddressesPage({ 
  params,
}: { 
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <AddressesClient user={user} />
    </div>
  );
}
