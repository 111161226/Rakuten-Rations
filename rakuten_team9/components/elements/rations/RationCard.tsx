// カテゴリ，量，賞味期限のデータを受け取って，ダッシュボードに掲載する備蓄食の各情報を表示するコンポーネント
import React from "react";
import { Box, Image, Text, Flex, Progress } from "@chakra-ui/react";

interface FoodStockCardProps {
  category?:
    | "水"
    | "パックご飯"
    | "パン"
    | "缶詰"
    | "レトルト食品"
    | "栄養補助食品";
  quantity?: number;
  index?: number;
  expirationDate?: string;
}

const calculateRemainingTime = (expirationDate: string): number => {
  const now = new Date();
  const expDate = new Date(expirationDate);
  const timeDiff = expDate.getTime() - now.getTime();
  const daysRemaining = Math.max(
    Math.ceil(timeDiff / (1000 * 60 * 60 * 24)),
    0
  );
  return daysRemaining;
};
// 3年後の日付を取得する
const getThreeYearsLater = (): string => {
  const now = new Date();
  now.setFullYear(now.getFullYear() + 2);
  return now.toISOString();
};

export default function FoodStockCard({
  category = "水",
  quantity = 50,
  expirationDate = getThreeYearsLater(),
}: FoodStockCardProps): JSX.Element {
  const now = new Date();
  const expDate = new Date(expirationDate);
  const remainingDays = calculateRemainingTime(expirationDate);
  //   表示するカテゴリ画像の決定
  let imageUrl: string;
  if (category == "水") {
    imageUrl = "categoryImages/petbottle_water_full.png";
  } else if (category == "パックご飯") {
    imageUrl = "categoryImages/pack_gohan_renji.png";
  } else if (category == "パン") {
    imageUrl = "categoryImages/pan_bread_set.png";
  } else if (category == "缶詰") {
    imageUrl = "categoryImages/food_kandume.png";
  } else if (category == "レトルト食品") {
    imageUrl = "categoryImages/retort_food.png";
  } else {
    imageUrl = "categoryImages/food_energy_bar.png";
  }
  // 定義する期間（単位は日）
  const twoYearsInDays = 2 * 365;
  const oneYearInDays = 365;
  const sixMonthsInDays = 182;
  const threeMonthsInDays = 91;

  // 賞味期限に応じた表示内容
  let displayText: string;
  let progressColor: string = "green";
  if (remainingDays > twoYearsInDays) {
    displayText = "2年以上";
  } else if (remainingDays > oneYearInDays) {
    displayText = "1年以上";
  } else if (remainingDays > sixMonthsInDays) {
    displayText = "半年以上";
  } else if (remainingDays > threeMonthsInDays) {
    displayText = "3ヶ月以上";
    progressColor = "yellow";
  } else {
    displayText = `${remainingDays} 日`;
    progressColor = "red";
  }
  // 賞味期限の猶予が2年以上ある場合は進行状況バーを最大にする
  const progressValue =
    remainingDays > oneYearInDays
      ? 100
      : Math.max((remainingDays * 100) / oneYearInDays, 0); // 2年未満の場合は残り日数に基づく

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mx={"5px"}
      width="380px"
    >
      <Flex align="center" mb={4}>
        <Image src={imageUrl} alt="カテゴリ画像" boxSize="100px" mr={4} />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            個数: {quantity}
          </Text>
          <Text fontSize="lg">
            賞味期限: {new Date(expirationDate).toLocaleDateString()}
          </Text>
        </Box>
      </Flex>
      <Box>
        <Text mb={2}>残り時間:{displayText}</Text>
        <Progress
          value={progressValue}
          colorScheme={progressColor}
          size="sm"
          hasStripe
          isAnimated
        />
      </Box>
    </Box>
  );
}
