// // components/Item.js
// import { useState } from "react";
// import { Box, Text, Input, Flex, Spacer, Button, useDisclosure } from "@chakra-ui/react";

import { Box, Text, Input, Flex, Spacer, Image, Button} from "@chakra-ui/react";

type ItemProps = {
  category: string;
  expirationDate: string;
  quantity: number;
  handleQuantityChange: (index: number, value: number) => void;
  handleRemove: (index: number) => void;
  index: number;
};

const Item = ({ category, expirationDate, quantity, handleQuantityChange, handleRemove, index }: ItemProps) => {
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQuantityChange(index, Number(e.target.value));
  };
  const onRemoveClick = () => {
    handleRemove(index);
  };

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

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mb="4">
      <Flex>
        <Image src={imageUrl} alt="カテゴリ画像" boxSize="100px" mr={4} />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            {category}
          </Text>
          <Text color="gray.500">賞味期限: {expirationDate}</Text>
        </Box>
        <Spacer />
        <Box textAlign="right" mr={4}>
          <Text fontSize="md">個数:</Text>
          <Input
            type="number"
            value={quantity !== null ? quantity : ""}
            onChange={onQuantityChange}
            width="80px"
          />
        </Box>
        <Button colorScheme="red" onClick={onRemoveClick} mt={2}>
          削除
        </Button>
      </Flex>
    </Box>
  );
};

export default Item;
