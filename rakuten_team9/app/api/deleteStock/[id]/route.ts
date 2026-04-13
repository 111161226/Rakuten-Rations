import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Next.js 15では params は Promise になります
type Params = Promise<{ id: string }>;

export const DELETE = async (
  req: NextRequest, 
  { params }: { params: Params } // 第2引数の型をPromiseに変更
) => {
  // 第3引数の res: NextResponse は削除（Route Handlerでは使用しません）

  try {
    // params を await して id を取得
    const { id } = await params;

    const post = await prisma.stored_food.delete({
      where: { id: id },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};