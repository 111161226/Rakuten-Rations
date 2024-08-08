import {
  Flex,
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

// 明るい色を取得するためのユーティリティ関数
const getColorForAdequacy = (adequacy: number) => {
  // adequacyを0から100の範囲に制限
  adequacy = Math.max(0, Math.min(100, adequacy));
  const red = Math.round(255 * (1 - adequacy / 100)); // 赤成分を計算
  const green = Math.round(255 * (adequacy / 100)); // 緑成分を計算
  return `rgb(${red}, ${green}, 0)`; // 赤から緑へ色が変化
};

export default function AdequacyCard({
  adequacy = 40,
  details = ["パックご飯", "水", "レトルト食品"],
}) {
  return (
    <Flex>
      <Box flex="1" textAlign="left">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          備蓄食充実度
        </Text>
        {details.map((detail, index) => (
          <Text fontSize="lg" mb={2} key={index} ml={4}>
            {index + 1}. {detail}
          </Text>
        ))}
      </Box>
      <Box flex="1" textAlign="center">
        <CircularProgress
          value={adequacy}
          color={getColorForAdequacy(adequacy)}
          size="170px"
        >
          <CircularProgressLabel>{adequacy}%</CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Flex>
  );
}
