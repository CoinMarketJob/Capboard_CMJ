import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name
  } = body; // Modal'dan gelen verileri al
  

  const auth = await prisma.documents.create({
    data: {
        DocumentName: name,
    }
  });

  
  const currentUser = await getCurrentUser();

  const log = await prisma.logRecord.create({
    data: {
      userId: currentUser?.id,
      type: "Create",
      page: "Documents"
    }
  });

  return NextResponse.json(auth);
}
