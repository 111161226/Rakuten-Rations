import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET /api/registerOrganization
// Required fields in body: name
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const Customized = []
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
    res.status(200).json(Customized);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
}