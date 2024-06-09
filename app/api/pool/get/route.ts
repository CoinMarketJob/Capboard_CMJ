import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const transactions = await prisma.transaction.findMany({
        where: {
          poolId: {
            not: null,
          },
        },
        include: {pool : true,}
      });

    return NextResponse.json(transactions);
}
