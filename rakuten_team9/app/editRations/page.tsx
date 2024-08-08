// "use client";
// import Item from "@/components/elements/rations/RationItem";
// import { useState } from "react";
// import { Box, Button, useDisclosure} from "@chakra-ui/react";
// import { Spacer, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, NumberInput, NumberInputField  } from "@chakra-ui/react";

"use client";
import Item from "@/components/elements/rations/RationItem";
import { useState } from "react";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import {
  Spacer,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "@/components/layouts/Head";

export default function Home() {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const [items, setItems] = useState([
    { category: "缶詰", expirationDate: "2025-12-31", initialQuantity: 10 },
    { category: "パン", expirationDate: "2024-06-15", initialQuantity: 5 },
  ]);

  const [newItem, setNewItem] = useState({
    category: "",
    expirationDate: "",
    initialQuantity: 0,
  });

  const handleQuantityChange = (index: number, value: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, initialQuantity: value } : item
    ); //変更したいindexと一致した場合にinitialQuantityを変更
    setItems(updatedItems); //items更新
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleRemove = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index); //indexと合わない要素だけを残す
    setItems(updatedItems);
  };

  const handleAddClose = () => {
    setNewItem({
      category: "",
      expirationDate: "",
      initialQuantity: 0,
    });
    onAddClose();
  };

  const handleSubmit = () => {
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItem({
      category: "",
      expirationDate: "",
      initialQuantity: 0,
    });
    onAddClose();
  };

  const handleConfirm = () => {
    console.log(items);
    onConfirmClose();
  };

  const getCategoryUnit = (category: string) => {
    switch (category) {
      case "水":
        return "本 (2L)";
      case "缶詰":
        return "個 (4号缶)";
      case "レトルト食品":
        return "食";
      case "パックご飯":
        return "個 (200g)";
      case "パン":
        return "個 (100g)";
      case "栄養補助食品":
        return "個";
      default:
        return "";
    }
  };

  return (
    <>
      <Head />
      <Box p="4">
        {items.map((item, index) => (
          <Item
            key={index}
            category={item.category}
            expirationDate={item.expirationDate}
            quantity={item.initialQuantity}
            handleQuantityChange={handleQuantityChange}
            handleRemove={handleRemove}
            index={index}
          />
        ))}

        <Flex mb={4}>
          <Button onClick={onAddOpen} mr={2}>
            備蓄食を追加
          </Button>
          <Spacer />
          <Button onClick={onConfirmOpen}>確定</Button>
        </Flex>
        <Flex justify="center" mt={4}>
          <Link href="/">
            <Button mt={4}>一覧へ</Button>
          </Link>
        </Flex>

        <Modal isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>新しいデータ</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="category" mb={4}>
                <FormLabel>カテゴリ</FormLabel>
                <Select
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  placeholder="カテゴリを選ぶ"
                >
                  <option value="水">水</option>
                  <option value="缶詰">缶詰</option>
                  <option value="レトルト食品">レトルト食品</option>
                  <option value="パックご飯">パックご飯</option>
                  <option value="パン">パン</option>
                  <option value="栄養補助食品">栄養補助食品</option>
                </Select>
              </FormControl>
              <FormControl id="quantity" mb={4}>
                <FormLabel>個数</FormLabel>
                <Flex alignItems="center">
                  <Input
                    type="number"
                    name="initialQuantity"
                    value={newItem.initialQuantity}
                    onChange={handleInputChange}
                    width="80px"
                  />
                  <Text ml={2}>{getCategoryUnit(newItem.category)}</Text>
                </Flex>
              </FormControl>
              <FormControl id="expirationDate" mb={4}>
                <FormLabel>賞味期限</FormLabel>
                <Input
                  type="date"
                  name="expirationDate"
                  value={newItem.expirationDate}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                追加
              </Button>
              <Button onClick={handleAddClose}>キャンセル</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>確認</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>本当に確定しますか？</Text>
              <UnorderedList>
                {items.map((item, index) => (
                  <ListItem key={index}>
                    {item.category}({item.initialQuantity}) 賞味期限:{" "}
                    {item.expirationDate}
                  </ListItem>
                ))}
              </UnorderedList>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleConfirm}>
                確定
              </Button>
              <Button onClick={onConfirmClose} ml={3}>
                キャンセル
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
