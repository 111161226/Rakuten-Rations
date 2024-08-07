import prisma from '../../../lib/prisma';

// PUT /api/updateStock
// Required fields in body: id
// Required fields in body: num
export default async function handle(req, res) {
    const { id, num } = req.body;
    const result = await prisma.stored_food.update({
        where: { id: id },
        data: { num: num },
    });
    res.json(result);
}
  