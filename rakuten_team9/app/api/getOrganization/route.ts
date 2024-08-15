import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';


// GET /api/registerOrganization
// Required fields in body: name
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const name  = "test2";

    // get stored food sorted by expired_at
    const StoredFoods = await prisma.organization.findMany({
      where: {
        name: name
      }
    });

    // 取得したデータをレスポンスとして返す
    return NextResponse.json(StoredFoods, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export const revalidate = 0;