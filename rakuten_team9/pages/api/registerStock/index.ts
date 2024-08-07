import prisma from '../../../lib/prisma';

// POST /api/registerStock
// Required fields in body: name
// Required fields in body: category
// Required fields in body: num
// Required fields in body: expired_at
export default async function handle(req, res) {
    const { name, category, num, expired_at } = req.body;
    const result = await prisma.stored_food.create({
        data: {
            category: category,
            num: num,
            expired_at: new Date(expired_at),
            org: { connect: { name: name}}
        },
    });
    res.json(result);
}
  