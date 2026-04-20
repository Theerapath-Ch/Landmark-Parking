import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest,
   { params }: { params: Promise<{ getParkingId: string }> }) {
   try {
      const { getParkingId } = await params
      //console.log(getParkingId);
      const data = await prisma.parking.findUnique({
         where: {
            id: getParkingId
         },
         include: {
            receipt: {
               select: {
                  id: true,
                  price:true
               }
            }
         }
      })
      
      if (!data) {
         return NextResponse.json(
            { success: false, message: 'Not found' },
            { status: 404 }
         )
      }
      return NextResponse.json({
         success: true,
         data: data,
         status: 200
      })

   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { success: false, message: 'Internal Server Error' },
         { status: 500 }
      )
   }
}