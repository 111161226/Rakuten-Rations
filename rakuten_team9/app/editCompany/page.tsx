"use client";
import Item from "@/components/elements/rations/RationItem";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "@/components/layouts/Head";

export default function Home() {
  const [employeeCount, setEmployeeCount] = useState("");
  const [femaleRatio, setFemaleRatio] = useState("");

  const handleSave = async () => {
    // 保存ロジックをここに追加
    console.log("社員数:", employeeCount, "女性比率:", femaleRatio);
    const name = "test2"
    const body = { name, employeeCount, femaleRatio};
    await fetch(`api/updateOrganization?name=${name}&employeeCount=${employeeCount}&femaleRatio=${femaleRatio}`, {
      method: 'PUT'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organization = await fetch('api/getOrganization', {cache: 'no-store'});
        if (!organization.ok) {
          throw new Error("Network response was not ok");
        }
        const org = await organization.json();
        setEmployeeCount(org[0].num);
        setFemaleRatio(org[0].woman_ratio);
      } catch (error: any) {
        console.log(error);
      } finally {
      }
      console.log("社員数:", employeeCount, "女性比率:", femaleRatio);
    };
    fetchData();
  }, []);

  if (!employeeCount && !femaleRatio) return null;

  return (
    <>
      <Head />
      <Box p="6" textAlign="center">
        <Text fontSize="4xl" mb="8">
          会社情報
        </Text>
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