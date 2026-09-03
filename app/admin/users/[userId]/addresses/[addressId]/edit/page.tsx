import { AddressForm } from "../../address-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditAddressPage({ params }: { params: Promise<{ userId: string, addressId: string }> }) {
  const { userId, addressId } = await params;
  const address = await prisma.address.findUnique({
    where: { id: addressId }
  });

  if (!address) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Address</h1>
      <AddressForm userId={userId} initialData={address} />
    </div>
  );
}
