"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function Page() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = (key: string) => {
    setSelectedKey(key);
    onOpen(); // モーダルを開く
  };

  return (
    <div>
      <h1>ボタンのキー取得例</h1>
      <Button onClick={() => handleButtonClick("button1")} key="button1">
        ボタン 1
      </Button>
      <Button onClick={() => handleButtonClick("button2")} key="button2">
        ボタン 2
      </Button>
      <Button onClick={() => handleButtonClick("button3")} key="button3">
        ボタン 3
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>選択されたボタンのキー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>選択されたボタンのキー: {selectedKey}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button variant="ghost">キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
