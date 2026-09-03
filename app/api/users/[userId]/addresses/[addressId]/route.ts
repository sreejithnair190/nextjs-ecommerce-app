import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ userId: string, addressId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { addressId } = await params;
    const body = await req.json();
    const { fullName, line1, line2, city, state, postalCode, country, phone, isDefault } = body;

    const address = await prisma.address.update({
      where: { id: addressId },
      data: {
        fullName,
        line1,
        line2,
        city,
        state,
        postalCode,
        country,
        phone,
        isDefault
      }
    });

    return NextResponse.json({ message: "Address updated successfully", address });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ userId: string, addressId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { addressId } = await params;
    
    await prisma.address.delete({
      where: { id: addressId }
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
