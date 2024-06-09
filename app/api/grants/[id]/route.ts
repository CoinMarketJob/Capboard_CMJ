import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";

export async function DELETE(
   request: Request, {params} : {params: {id : string}}
) {
    const plansId = parseInt(params.id, 10);

    const classes = await prisma.grants.delete({
        where: {
            id: plansId
        }
    })
    return NextResponse.json(classes)
}