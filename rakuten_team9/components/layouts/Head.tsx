import React from "react";
import {
  Flex,
  IconButton,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        width="100%"
        padding="4"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="teal.500"
        color="white"
      >
        <IconButton
          aria-label="Menu"
          icon={<ArrowRightIcon />}
          variant="outline"
          colorScheme="whiteAlpha"
          border="none"
          onClick={onOpen}
          _hover={{ backgroundColor: "teal.600" }}
        />
        <Text fontSize="3xl" fontWeight="bold">
          楽天Rations
        </Text>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>楽天Rations</DrawerHeader>
          <DrawerBody>
            <Link href="/">
              <Button w="100%" mt={4}>
                ダッシュボード
              </Button>
            </Link>
            <Link href="/editRations">
              <Button w="100%" mt={4}>
                備蓄食の編集
              </Button>
            </Link>

            <Link href="/editCompany">
              <Button w="100%" mt={4}>
                会社情報の追加
              </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
