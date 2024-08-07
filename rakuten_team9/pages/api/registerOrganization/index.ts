import prisma from '../../../lib/prisma';

// POST /api/registerOrganization
// Required fields in body: name
// Required fields in body: num
// Required fields in body: woman_ration
export default async function handle(req, res) {
    const { name, num, woman_ration } = req.body;
    const result = await prisma.organization.create({
        data: {
            name: name,
            num: num,
            woman_ration: woman_ration
        },
    });
    res.json(result);
  }
  