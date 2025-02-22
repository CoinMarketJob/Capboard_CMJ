import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, grantsAmount, date, shareClassId, documentId, note } = body;

  const classId = parseInt(shareClassId, 10);
  const pool = await prisma.pool.create({
    data: {
      poolName: name,
      date: date,
      shareClassId: classId,
      note: note,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      date: date,
      type: "PoolCreation",
      poolId: pool.id,
      amount: parseInt(grantsAmount, 10),
    },
  });

  const currentUser = await getCurrentUser();

  const log = await prisma.logRecord.create({
    data: {
      userId: currentUser?.id,
      type: "Create",
      page: "Pools"
    }
  });

  return NextResponse.json(transaction);
}
