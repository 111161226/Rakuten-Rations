import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/registerOrganization
// Required fields in body: name
export default async function handler(req: NextRequest, res: NextResponse) {
  try {
    const name  = "test2";

    // get stored food sorted by expired_at
    const StoredFoods = await prisma.stored_food.findMany({
      where: {
        org_name: name
      },
      orderBy: {
        expired_at: 'asc'
      }
    });

    // custom data strcuture
    const Customized : any[] = []
    let i = 0;
    StoredFoods.forEach(food => {
        const custom = {
            "id": food.id,
            "category": food.category,
            "quantity": food.num,
            "index": i,
            "expirationDate": food.expired_at.toString()
        }
        Customized.push(custom)
        i++;
    });

    // 取得したデータをレスポンスとして返す
    return NextResponse.json(Customized, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}