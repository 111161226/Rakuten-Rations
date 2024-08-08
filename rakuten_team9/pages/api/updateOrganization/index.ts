import prisma from '../../../lib/prisma';

// POST /api/updateOrganization
// Required fields in body: id
// Required fields in body: num
export default async function handle(req, res) {
    console.log(req.body);
    const { name, employeeCount, femaleRatio } = req.body;
    console.log(employeeCount);
    const result = await prisma.organization.update({
        where: { name: name },
        data: { 
            num: employeeCount,
            woman_ratio: Number(femaleRatio) 
        },
    });
    return res.json(result);
}