import { AddressForm } from "../address-form";

export default async function NewAddressPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Address</h1>
      <AddressForm userId={userId} />
    </div>
  );
}
