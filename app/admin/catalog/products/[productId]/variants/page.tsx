import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { VariantsClient } from "./variants-client";

export default async function VariantsPage({ 
  params,
}: { 
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <VariantsClient product={product} />
    </div>
  );
}
