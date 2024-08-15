import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/registerStock
// Required fields in body: name
// Required fields in body: category
// Required fields in body: num
// Required fields in body: expired_at
export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { name, category, num, expired_at } = await req.json();
        const rst = await prisma.stored_food.create({
            data: {
                category: category,
                num: num,
                expired_at: new Date(expired_at),
                org: { connect: { name: name}}
            },
        });
        const result = {
            id: rst.id,
            category: category,
            quantity: num,
            index: -1,
            expirationDate: expired_at
        }
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export const fetchCache = 'force-no-store';