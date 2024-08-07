import prisma from '../../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';

// POST /api/registerStock
// Required fields in body: name
// Required fields in body: category
// Required fields in body: num
// Required fields in body: expired_at
export default async function handle(req, res) {
    const { name, category, num, expired_at } = req.body;
    const uniqueId = uuidv4();
    await prisma.stored_food.create({
        data: {
        id: uniqueId,
        category: category,
        num: num,
        expired_at: new Date(expired_at)
        },
    });
    const result = await prisma.stored_pair.create({
        data: {
            name: name,
            stored_id: uniqueId
        }
    });
    res.json(result);
  }
  