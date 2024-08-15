import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// DELETE /api/deleteStock/{id}
// Required fields in body: id
export const DELETE = async (req: NextRequest, {params}: {params: {id: string}}, res: NextResponse) => {
    if (req.method === 'DELETE') {
      try {
        const id = params.id;
        const post = await prisma.stored_food.delete({
          where: { id: id },
        });
        return NextResponse.json(post, {status: 200});
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
      } finally {
        await prisma.$disconnect();
      }
    }
    
    /*
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
    */
    return NextResponse.json(`The HTTP ${req.method} method is not supported at this route.`, {status: 404});
}

export const revalidate = 0;