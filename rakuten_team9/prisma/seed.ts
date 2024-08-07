import { Organization,Stored_pair,Stored_food} from '@prisma/client';
import prisma from '../lib/prisma';

// モデル投入用のデータ定義
const postData: Organization[] = [
  {
    name: 'test1',
    num: 100,
    woman_ration: 50
  },
  {
    name: 'test2',
    num: 200,
    woman_ration: 70
  },
  {
    name: 'test3',
    num: 300,
    woman_ration: 30
  }
];

const postData1: Stored_pair[] =[
  {
    name: 'test1',
    stored_id: '0001'
  },
  {
    name: 'test1',
    stored_id: '0002'
  },
  {
    name: 'test1',
    stored_id: '0003'
  },
   {
    name: 'test2',
    stored_id: '0004'
  },
  {
    name: 'test2',
    stored_id: '0005'
  },
  {
    name: 'test2',
    stored_id: '0006'
  },
  {
    name: 'test2',
    stored_id: '0007'
  },
  {
    name: 'test2',
    stored_id: '0008'
  },
  {
    name: 'test2',
    stored_id: '0009'
  },
  {
    name: 'test2',
    stored_id: '0010'
  }
] 

const postData2: Stored_food[] =[
  {
    id:'0001',
    category:'water',
    num:300,
    expired_at: new Date(2023, 8, 2)
  },
  { 
    id:'0002',
    category:'rice',
    num:300,
    expired_at: new Date(2024, 9, 2)
  },
  {
    id:'0003',
    category:'water',
    num:300,
    expired_at: new Date(2024, 11, 2)
  }, 
   {
    id:'0004',
    category:'water',
    num:300,
    expired_at: new Date(2024, 11, 2)
  },
  { 
    id:'0005',
    category:'rice',
    num:60,
    expired_at: new Date(2024, 9, 2)
  },
  {
    id:'0006',
    category:'retort',
    num:100,
    expired_at: new Date(2027, 3, 2)
  },
  { 
    id:'0007',
    category:'canning',
    num:250,
    expired_at: new Date(2024, 9, 2)
  },
  { 
    id:'0008',
    category:'bread',
    num:120,
    expired_at: new Date(2026, 3, 2)
  },
  { 
    id:'0009',
    category:'bread',
    num:90,
    expired_at: new Date(2024, 11, 2)
  },
  { 
    id:'0010',
    category:'supplement',
    num:300,
    expired_at: new Date(2027, 3, 2)
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
    const createPosts = prisma.stored_pair.create({
      data: post,
    });
    posts.push(createPosts);
  }

  for (const post of postData2) {
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