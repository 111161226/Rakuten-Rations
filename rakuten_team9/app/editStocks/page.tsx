"use client";
import Item from "@/components/elements/rations/RationItem";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box p="4">
      <Item category="缶詰" expirationDate="2025-12-31" initialQuantity={10} />
      <Item category="乾パン" expirationDate="2024-06-15" initialQuantity={5} />
    </Box>
  );
}
