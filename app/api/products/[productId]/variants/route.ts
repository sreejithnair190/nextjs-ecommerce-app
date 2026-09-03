import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await params;
    const body = await req.json();
    const { sku, size, color, price, stock, imageUrl, isActive } = body;

    const variant = await prisma.productVariant.create({
      data: {
        productId,
        sku,
        size,
        color,
        price,
        stock,
        imageUrl,
        isActive,
      }
    });

    return NextResponse.json({ message: "Variant created successfully", variant }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await params;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 10;
    const search = searchParams.get("search") || "";

    const whereClause = {
      productId,
      ...(search
        ? {
            OR: [
              { sku: { contains: search, mode: "insensitive" as const } },
              { size: { contains: search, mode: "insensitive" as const } },
              { color: { contains: search, mode: "insensitive" as const } },
            ]
          }
        : {}),
    };

    const total = await prisma.productVariant.count({ where: whereClause });
    const data = await prisma.productVariant.findMany({
      where: whereClause,
      include: {
        product: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json({ data, total });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
