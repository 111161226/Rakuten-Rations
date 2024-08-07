import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const Header = () => {
  return (
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
      />
      <Text fontSize="xl" fontWeight="bold">
        楽天rations
      </Text>
    </Flex>
  );
};

export default Header;
