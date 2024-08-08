import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

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
        <CircularProgress value={adequacy} color="green.400" size="150px">
          <CircularProgressLabel>{adequacy}%</CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Flex>
  );
}
