import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// PUT /api/updateStock
// Required fields in body: id
// Required fields in body: num
export const PUT = async (req: NextRequest) => {
    try{
        const params = req.nextUrl.searchParams;
        const id = params.get("id");
        const num = params.get("num")
        const result = await prisma.stored_food.update({
            where: { id: String(id) },
            data: { num: Number(num) },
        });
        return NextResponse.json(result, {status: 200, headers: {
            'Cache-Control': 'no-store',
            'CDN-Cache-Control': 'no-store',
            'Vercel-CDN-Cache-Control': 'no-store'
          }});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
      } finally {
        await prisma.$disconnect();
    }
}