import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/registerOrganization
// Required fields in body: name
// Required fields in body: num
// Required fields in body: woman_ration
export default async function handle(req: NextRequest, res: NextResponse) {
    try {
        const { name, num, woman_ratio } = await req.json();
        const result = await prisma.organization.create({
            data: {
                name: name,
                num: num,
                woman_ratio: woman_ratio
            },
        });
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
  