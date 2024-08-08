import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 今日の日付を取得
    const today = new Date();

    // 各期間の計算結果を格納するためのオブジェクト
    const results = {};

    // 期間ごとに日付を設定
    const periods = {
      '3か月後': new Date(today),
      '半年後': new Date(today),
      '1年後': new Date(today),
      '2年後': new Date(today),
    };
    periods['3か月後'].setMonth(today.getMonth() + 3);
    periods['半年後'].setMonth(today.getMonth() + 6);
    periods['1年後'].setFullYear(today.getFullYear() + 1);
    periods['2年後'].setFullYear(today.getFullYear() + 2);

    // 各期間ごとに処理を行う
    for (const [period, date] of Object.entries(periods)) {
      const usableStoredFoods = await prisma.stored_food.findMany({
        where: {
          expired_at: {
            gt: date,
          },
          org_name: "test2"
        },
        include: {
          org: {
            select: { num: true },
          },
        },
      });

      // 合計を計算するための変数
      let waterTotal = 0;
      let riceAndBreadTotal = 0;
      let canningAndRetortTotal = 0;
      let num = 0;

      // 取得したデータをループして合計を計算
      usableStoredFoods.forEach(food => {
        if (food.org) {
          num = food.org.num; // 会社の社員数 (num) を変数に格納
        }
        
        if (food.category === 'water') {
          waterTotal += food.num;
        } else if (food.category === 'rice' || food.category === 'bread') {
          riceAndBreadTotal += food.num;
        } else if (food.category === 'canning' || food.category === 'retort') {
          canningAndRetortTotal += food.num;
        }
      });

      // wrate, rrate, crateを計算
      let wrate = waterTotal * 2 / (num * 9);
      let rrate = riceAndBreadTotal / (num * 9);
      let crate = canningAndRetortTotal / (num * 9);

      // 1を超えている場合は1にする
      wrate = Math.min(wrate, 1);
      rrate = Math.min(rrate, 1);
      crate = Math.min(crate, 1);

      // 備蓄充足率を計算
      const fulfillmentRate = ((wrate + rrate + crate) / 3) * 100;

      // 不足している場合の備蓄量を計算
      let neededSupplies = '';

      if (wrate < 1) {
        const neededWater = (1 - wrate) * num * 4.5;
        neededSupplies += `${neededWater}本の水が必要です。`;
      }

      if (rrate < 1) {
        const neededRiceAndBread = (1 - rrate) * num * 9;
        neededSupplies += `${neededRiceAndBread}個の御飯パックかパンが必要です。`;
      }

      if (crate < 1) {
        const neededCanningAndRetort = (1 - crate) * num * 9;
        neededSupplies += `${neededCanningAndRetort}個の缶詰かレトルト食品が必要です。`;
      }

      // 結果をオブジェクトに格納
      results[period] = {
        fulfillmentRate,
        neededSupplies: neededSupplies || '備蓄は十分です。',
      };
    }

    // 結果をレスポンスとして返す
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
}
