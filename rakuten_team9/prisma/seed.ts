import { Organization} from '@prisma/client';
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
  },
];

const doSeed = async () => {
  const posts = [];
  for (const post of postData) {
    const createPosts = prisma.organization.create({
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