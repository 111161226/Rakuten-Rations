// // components/Item.js
// import { useState } from "react";
// import { Box, Text, Input, Flex, Spacer, Button, useDisclosure } from "@chakra-ui/react";

import { Box, Text, Input, Flex, Spacer, Image, Button, useDisclosure} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onRemoveClick = () => {
    handleRemove(index);
    onClose();
  };

  let imageUrl: string;
  let show_name: string;
  if (category == "water") {
    imageUrl = "categoryImages/petbottle_water_full.png";
    show_name = "水";
  } else if (category == "rice") {
    imageUrl = "categoryImages/pack_gohan_renji.png";
    show_name = "パックご飯";
  } else if (category == "bread") {
    imageUrl = "categoryImages/pan_bread_set.png";
    show_name = "パン";
  } else if (category == "canning") {
    imageUrl = "categoryImages/food_kandume.png";
    show_name = "缶詰";
  } else if (category == "retort") {
    imageUrl = "categoryImages/retort_food.png";
    show_name = "レトルト食品";
  } else {
    imageUrl = "categoryImages/food_energy_bar.png";
    show_name = "栄養補助食品";
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mb="4">
      <Flex>
        <Image src={imageUrl} alt="カテゴリ画像" boxSize="100px" mr={4} />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            {show_name}
          </Text>
          <Text color="gray.500">賞味期限: {expirationDate}</Text>
        </Box>
        <Spacer />
        <Flex alignItems="center">
          <Text fontSize="md" mr={2}>個数:</Text>
          <Input
            type="number"
            value={quantity !== null ? quantity : ""}
            onChange={onQuantityChange}
            width="80px"
            mr={2}
          />
          <Button colorScheme="red" onClick={onOpen}>
            削除
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            本当に削除しますか？
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onRemoveClick}>
              削除
            </Button>
            <Button onClick={onClose} ml={3}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Item;
