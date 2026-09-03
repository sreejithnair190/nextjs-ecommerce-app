import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ productId: string, variantId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { variantId } = await params;
    const body = await req.json();
    const { sku, size, color, price, stock, imageUrl, isActive } = body;

    const variant = await prisma.productVariant.update({
      where: { id: variantId },
      data: {
        sku,
        size,
        color,
        price,
        stock,
        imageUrl,
        isActive,
      }
    });

    return NextResponse.json({ message: "Variant updated successfully", variant });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ productId: string, variantId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { variantId } = await params;
    
    await prisma.productVariant.delete({
      where: { id: variantId }
    });

    return NextResponse.json({ message: "Variant deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
