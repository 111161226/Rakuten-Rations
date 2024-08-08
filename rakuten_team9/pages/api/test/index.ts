import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 今日の日付を取得
    const today = new Date();
    // 現在から1年後の日付を取得
    const oneYearFromNow = new Date(today);
    oneYearFromNow.setFullYear(today.getFullYear() + 1);

    // 'test2'という会社に関連する備蓄食品を取得し、1年以内に期限が切れるものを除外
    const usableStoredFoods = await prisma.stored_food.findMany({
      where: {
        expired_at: {
          gt: oneYearFromNow,
        },
        org_name: "test2"
      },
      include: {
        org: {
          select: { num: true },
        },
      },
    });

    // 取得したデータをレスポンスとして返す
    res.status(200).json(usableStoredFoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
}
