import { Organization, Stored_food} from '@prisma/client';
import prisma from '../lib/prisma';

// モデル投入用のデータ定義
const postData: Organization[] = [
  {
    name: 'test1',
    num: 100,
    woman_ratio: 50
  },
  {
    name: 'test2',
    num: 200,
    woman_ratio: 70
  },
  {
    name: 'test3',
    num: 300,
    woman_ratio: 30
  }
];

const postData1: Stored_food[] =[
  {
    id:'0001',
    category:'water',
    num:300,
    expired_at: new Date(2023, 8, 2),
    org_name: 'test1'
  },
  { 
    id:'0002',
    category:'rice',
    num:300,
    expired_at: new Date(2024, 9, 2),
    org_name: 'test1'
  },
  {
    id:'0003',
    category:'water',
    num:300,
    expired_at: new Date(2024, 12, 2),
    org_name: 'test1'
  }, 
   {
    id:'0004',
    category:'water',
    num:300,
    expired_at: new Date(2025, 1, 2),
    org_name: 'test2'
  },
  { 
    id:'0005',
    category:'rice',
    num:60,
    expired_at: new Date(2024, 9, 2),
    org_name: 'test2'
  },
  {
    id:'0006',
    category:'retort',
    num:100,
    expired_at: new Date(2027, 3, 2),
    org_name: 'test2'
  },
  { 
    id:'0007',
    category:'canning',
    num:250,
    expired_at: new Date(2024, 1, 2),
    org_name: 'test2'
  },
  { 
    id:'0008',
    category:'bread',
    num:120,
    expired_at: new Date(2026, 3, 2),
    org_name: 'test2'
  },
  { 
    id:'0009',
    category:'bread',
    num:90,
    expired_at: new Date(2024, 12, 2),
    org_name: 'test2'
  },
  { 
    id:'0010',
    category:'supplement',
    num:300,
    expired_at: new Date(2027, 3, 2),
    org_name: 'test2'
  },
  { 
    id:'0011',
    category:'water',
    num:300,
    expired_at: new Date(2027, 3, 2),
    org_name: 'test2'
  },
  { 
    id:'0012',
    category:'rice',
    num:900,
    expired_at: new Date(2026, 3, 2),
    org_name: 'test2'
  }
]

const doSeed = async () => {
  const posts = [];
  for (const post of postData) {
    const createPosts = prisma.organization.create({
      data: post,
    });
    posts.push(createPosts);
  }

  for (const post of postData1) {
    const createPosts = prisma.stored_food.create({
      data: post,
    });
    posts.push(createPosts);
  }

  return await prisma.$transaction(posts);
};

const main = async () => {
  console.log(`Start seeding ...`);

  await doSeed();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });