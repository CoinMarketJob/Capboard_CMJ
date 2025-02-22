import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        date,
        shares,
        stakeholder,
        internalNote,
        floor,
        discount,
        Cap,
        MaturityDate,
        nonCompounding,
        StartDate,
    } = body;


    const transaction = await prisma.transaction.create({
        data: {
            type: "ConvertibleLoan",
            date: new Date(date),
            stakeholderId: parseInt(stakeholder, 10),
            totalPayment: parseInt(shares, 10),
            floor: parseInt(floor, 10),
            discount: parseInt(discount, 10),
            cap: parseInt(Cap, 10),
            maturityDate: new Date(MaturityDate),
            nonCompounding: parseInt(nonCompounding, 10),
            interestStartDate: new Date(StartDate),
            note: internalNote,
        },
    });

    const currentUser = await getCurrentUser();

    const log = await prisma.logRecord.create({
        data: {
            userId: currentUser?.id,
            type: "Create",
            page: "Transactions"
        }
    });


    return NextResponse.json(transaction);
}
