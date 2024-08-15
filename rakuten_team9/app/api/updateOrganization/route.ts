import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// PUT /api/updateOrganization
// Required fields in body: id
// Required fields in body: num
export const PUT = async (req: NextRequest, res: NextResponse) => {
    try{
        const params = req.nextUrl.searchParams
        const name = params.get("name")
        const employeeCount = params.get("employeeCount")
        const femaleRatio = params.get("femaleRatio")
        const result = await prisma.organization.update({
            where: { name: String(name) },
            data: { 
                num: Number(employeeCount),
                woman_ratio: Number(femaleRatio) 
            },
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