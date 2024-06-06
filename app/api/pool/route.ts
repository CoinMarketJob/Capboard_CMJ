import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    grantsAmount,
    amountUnit,
    date,
    shareClassId,
    documentId,
    note,
  } = body; // Modal'dan gelen verileri al

  const pool = await prisma.pool.create({
    data: {
      name: name,
      date: date,
      shareClassId: shareClassId,
      documentId: documentId,
      Note: note,
    },
  });

  const amount = await prisma.poolAmount.create({
    data: {
      grantsAmount: grantsAmount,
      amountUnit: amountUnit,
      date: date,
      poolId: pool.id,
    },
  });

  return NextResponse.json(pool);
}
