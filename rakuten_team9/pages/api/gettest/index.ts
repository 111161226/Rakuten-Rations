import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET /api/registerOrganization
// Required fields in body: name
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const name  = req.body;

    // get stored food sorted by expired_at
    const StoredFoods = await prisma.stored_food.findMany({
      where: {
        org_name: name
      },
      orderBy: {
        expired_at: 'asc'
      }
    });

    // 取得したデータをレスポンスとして返す
    res.status(200).json(StoredFoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
}