import { VariantForm } from "../../variant-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditVariantPage({ params }: { params: Promise<{ productId: string, variantId: string }> }) {
  const { productId, variantId } = await params;
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId }
  });

  if (!variant) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Variant</h1>
      <VariantForm productId={productId} initialData={variant} />
    </div>
  );
}
