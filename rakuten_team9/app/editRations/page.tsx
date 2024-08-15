// "use client";
// import Item from "@/components/elements/rations/RationItem";
// import { useState } from "react";
// import { Box, Button, useDisclosure} from "@chakra-ui/react";
// import { Spacer, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, NumberInput, NumberInputField  } from "@chakra-ui/react";

"use client";
import Item from "@/components/elements/rations/RationItem";
import type { ItemProps } from "@/components/elements/rations/RationItem";
import { useState, useEffect } from "react";
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
  const [items, setItems] = useState<ItemProps[]>([]);

  const [newItem, setNewItem] = useState({
    category: "",
    expirationDate: "",
    initialQuantity: 0,
  });

  const handleQuantityChange = async (index: number, value: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, quantity: value }: item
    ); //変更したいindexと一致した場合にinitialQuantityを変更
    setItems(updatedItems);
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

  const handleRemove = async (index: number) => {
    await fetch(`/api/deleteStock/${items[index].id}`, {
      method: 'DELETE'
    });
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

  const handleSubmit = async() => {
    const name = "test2";
    const category = newItem.category;
    const num = Number(newItem.initialQuantity);
    const expired_at = newItem.expirationDate;
    const body = {name, category, num, expired_at};
    await fetch("http://localhost:3000/api/registerStock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItem({
      category: "",
      expirationDate: "",
      initialQuantity: 0,
    });
    onAddClose();
  };

  const handleConfirm = async () => {
    console.log(items);
    for (const item of items) {
      const id = item.id;
      const num = item.quantity;
      const body = {id, num};
      await fetch("http://localhost:3000/api/updateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    };
    onConfirmClose();
  };

  const getCategoryUnit = (category: string) => {
    switch (category) {
      case "water":
        return "本 (2L)";
      case "canning":
        return "個 (4号缶)";
      case "retort":
        return "食";
      case "rice":
        return "個 (200g)";
      case "bread":
        return "個 (100g)";
      case "supplement":
        return "個";
      default:
        return "";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "water":
        return "水";
      case "canning":
        return "缶詰";
      case "retort":
        return "レトルト食品";
      case "rice":
        return "パックご飯";
      case "bread":
        return "パン";
      case "supplement":
        return "栄養補助食品";
      default:
        return category; // デフォルトで英語表記を使用
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/gettest');
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const items = await res.json();
        setItems(items);
      } catch (error: any) {
        console.log(error);
      } finally {
      }
      console.log(items);
    };
    fetchData();
  }, [items.length]);

  if (!items) return null;
  console.log(items);

  return (
    <>
      <Head />
      <Box p="4">
        {items.map((item, index) => (
          <Item
            key={index}
            category={item.category}
            expirationDate={item.expirationDate}
            quantity={item.quantity}
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
                  <option value="water">水</option>
                  <option value="canning">缶詰</option>
                  <option value="retort">レトルト食品</option>
                  <option value="rice">パックご飯</option>
                  <option value="bread">パン</option>
                  <option value="supplement">栄養補助食品</option>
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
                    {getCategoryLabel(item.category)}({item.quantity}) 賞味期限:{" "}
                    {new Date(item.expirationDate).toLocaleDateString()}
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
