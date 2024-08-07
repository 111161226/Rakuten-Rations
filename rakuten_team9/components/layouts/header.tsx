import React from "react";
import {
  Flex,
  IconButton,
  Text,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom"; // react-router-dom を使用する場合

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
          _hover={{ backgroundColor: "teal.600" }}
          ref={btnRef}
          onClick={onOpen}
        />
        <Text fontSize="xl" fontWeight="bold">
          楽天rations
        </Text>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ナビゲーション</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="bold">
                楽天rations
              </Text>
              <Divider />
              <ChakraLink as={Link} to="/page1" onClick={onClose}>
                ページ1
              </ChakraLink>
              <ChakraLink as={Link} to="/page2" onClick={onClose}>
                ページ2
              </ChakraLink>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="blue">保存</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
