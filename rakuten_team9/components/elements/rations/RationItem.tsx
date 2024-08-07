// components/Item.js
import { useState } from "react";
import { Box, Text, Input, Flex, Spacer, Button } from "@chakra-ui/react";

type ItemProps = {
  category: string;
  expirationDate: string;
  initialQuantity: number;
};

const Item = ({ category, expirationDate, initialQuantity }: ItemProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.value);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mb="4">
      <Flex>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            {category}
          </Text>
          <Text color="gray.500">賞味期限: {expirationDate}</Text>
        </Box>
        <Spacer />
        <Box textAlign="right">
          <Text fontSize="md">個数:</Text>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            width="80px"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Item;

function plusOne(itemQuantity: number) {
  return 22;
}
