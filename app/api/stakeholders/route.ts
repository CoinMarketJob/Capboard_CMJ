import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    type,
    name,
    lastName,
    contactEmail,
    group,
    address,
    optionalLineOfAddress,
    postalCode,
    cityName,
    country,
    identifier,
    customIdentifier,
    phone,
    birthdate,
    nationality,
    civilStatus,
    customDetail,
    notes,
  } = body; // Modal'dan gelen verileri al

  const stakeholder = await prisma.stakeholders.create({
    data: {
      type,
      name,
      lastName,
      contactEmail,
      group,
      address,
      optionalLineOfAddress,
      postalCode,
      cityName,
      country,
      identifier,
      customIdentifier,
      phone,
      birthdate,
      nationality,
      civilStatus,
      customDetail,
      notes,
    },
  });

  return NextResponse.json(stakeholder);
}
