// // components/Item.js
// import { useState } from "react";
// import { Box, Text, Input, Flex, Spacer, Button, useDisclosure } from "@chakra-ui/react";


//   const Item = ({ category, expirationDate, quantity, handleQuantityChange, index }: any) => {
//     const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       handleQuantityChange(index, Number(e.target.value));
//     };
//   return (
//     <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mb="4">
//       <Flex>
//         <Box>
//           <Text fontSize="xl" fontWeight="bold">
//             {category}
//           </Text>
//           <Text color="gray.500">賞味期限: {expirationDate}</Text>
//         </Box>
//         <Spacer />
//         <Box textAlign="right">
//           <Text fontSize="md">個数:</Text>
//           <Input
//             type="number"
//             value={quantity}
//             onChange={onQuantityChange}
//             width="80px"
//           />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default Item;

import { Box, Text, Input, Flex, Spacer } from "@chakra-ui/react";

type ItemProps = {
  category: string;
  expirationDate: string;
  quantity: number;
  handleQuantityChange: (index: number, value: number) => void;
  index: number;
};

const Item = ({ category, expirationDate, quantity, handleQuantityChange, index }: ItemProps) => {
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQuantityChange(index, Number(e.target.value));
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
            value={quantity !== null ? quantity : ""}
            onChange={onQuantityChange}
            width="80px"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Item;
