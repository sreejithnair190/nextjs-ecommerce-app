import { VariantForm } from "../variant-form";

export default async function NewVariantPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Variant</h1>
      <VariantForm productId={productId} />
    </div>
  );
}
