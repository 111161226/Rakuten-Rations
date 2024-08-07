import prisma from '../../../lib/prisma';

// DELETE /api/deleteStock
// Required fields in body: id
export default async function handle(req, res) {
    const id = req.body;
    if (req.method === 'DELETE') {
        const post = await prisma.stored_food.delete({
          where: { id: id },
        });
        res.json(post);
    } else {
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}