import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Unauthorized: Super Admin required" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, email, password } = body;

    const dataToUpdate: any = { name, email };
    if (password) {
      dataToUpdate.passwordHash = password; // Need real hashing in prod
    }

    const admin = await prisma.user.update({
      where: { id },
      data: dataToUpdate
    });

    return NextResponse.json({ message: "Admin updated successfully", admin });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Unauthorized: Super Admin required" }, { status: 401 });
    }

    const { id } = await params;
    
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Admin deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
