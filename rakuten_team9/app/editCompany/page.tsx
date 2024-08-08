"use client";
import Item from "@/components/elements/rations/RationItem";
import { useState } from "react";
import { Box, Text, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import Header from "@/components/layouts/Header";

export default function Home() {
  const [employeeCount, setEmployeeCount] = useState("");
  const [femaleRatio, setFemaleRatio] = useState("");

  const handleSave = () => {
    // 保存ロジックをここに追加
    console.log("社員数:", employeeCount, "女性比率:", femaleRatio);
  };

  return (
    <>
    <Header/>
    <Box p="6" textAlign="center">
      <Text fontSize="4xl" mb="8">会社情報</Text>
      <Box maxWidth="500px" margin="auto">
        <FormControl mb="4">
          <FormLabel>社員数</FormLabel>
          <Input
            type="number"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(e.target.value)}
            placeholder="社員数を入力"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>女性比率 (%)</FormLabel>
          <Input
            type="number"
            value={femaleRatio}
            onChange={(e) => setFemaleRatio(e.target.value)}
            placeholder="女性比率を入力"
          />
        </FormControl>
        <Button onClick={handleSave}>保存</Button>
      </Box>
      <Link href="/">
        <Button mt={4}>一覧へ</Button>
      </Link>
    </Box>
    </>
  );
}
