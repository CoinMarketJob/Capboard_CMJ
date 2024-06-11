import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {

  const stakeholder = await prisma.companyBasicInfo.findUnique({
    where: { id: 1 },
  });

  return NextResponse.json(stakeholder);
}
