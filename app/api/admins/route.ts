import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Unauthorized: Super Admin required" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, password } = body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password || "placeholder_hash", // Need real hashing in prod
        role: "ADMIN"
      }
    });

    return NextResponse.json({ message: "Admin created successfully", admin }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 10;
    const search = searchParams.get("search") || "";

    const whereClause = {
      role: { in: ["ADMIN", "SUPER_ADMIN"] as any[] },
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } }
            ]
          }
        : {}),
    };

    const total = await prisma.user.count({ where: whereClause });
    const data = await prisma.user.findMany({
      where: whereClause,
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json({ data, total });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
