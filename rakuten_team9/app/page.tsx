"use client";

import { useEffect, useState } from "react";
import AdequacyCard from "@/components/elements/rations/AdequacyCard";
import RationCard from "@/components/elements/rations/RationCard";
import Header from "@/components/layouts/Head";
import {
  Box,
  Button,
  Grid,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useDisclosure,
  Image,
  Text,
} from "@chakra-ui/react";

interface FoodStockCardProps {
  category?:
    | "water"
    | "rice"
    | "bread"
    | "canning"
    | "retort"
    | "supplement";
  quantity?: number;
  index: number;
  expirationDate?: string;
}

interface ApiData {
  adequacy: number;
  details: string[];
  rationCards: FoodStockCardProps[];
}

export default function Page() {
  const [recommendData, setRecommendData] = useState<any[]>([]);
  const [adequacy, setAdequacy] = useState<ApiData[]>([]);
  const [cards, setCards] = useState<FoodStockCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("api/gettest", {cache: 'no-store',});
        if (!response1.ok) {
          throw new Error("Network response was not ok");
        }
        const cardResult = await response1.json();
        setCards(cardResult);

         const response2 = await fetch("api/test", {cache: 'no-store',});
         if (!response2.ok) {
           throw new Error("Network response was not ok");
         }
         const adequacyResult = await response2.json();
         console.log(adequacyResult);
         setAdequacy(adequacyResult);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchRecommendData = async (index: number) => {
    const category = cards[index].category;
    let target: string;
    if (category == "water") {
      target = "水2L";
    } else if (category == "rice") {
      target = "パックご飯";
    } else if (category == "bread") {
      target = "保存パン";
    } else if (category == "canning") {
      target = "災害時用缶詰";
    } else if (category == "retort") {
      target = "レトルト食品";
    } else {
      target = "災害用栄養補助食品";
    }
    const RAKUTEN_API = "1081304271712371137";
    const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${RAKUTEN_API}&keyword=${target}`;

    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      const randomItem = result.Items[0];
      setRecommendData([randomItem]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      onOpen();
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cards && !adequacy) return null;

  return (
    <>
      <Header />
      <Box>
        {/* <Tabs
          variant="enclosed"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={1}
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxW="800px"
          mx="auto"
          mt={"30px"}
        > */}
        {/* /* <TabList>
            <Tab>3ヶ月後</Tab>
            <Tab>半年後</Tab>
            <Tab>1年後</Tab>
            <Tab>2年後</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdequacyCard adequacy={20} />
            </TabPanel>
            <TabPanel>
              <AdequacyCard adequacy={20} />
            </TabPanel>
            <TabPanel>
              <AdequacyCard adequacy={40} />
            </TabPanel>
            <TabPanel>
              <AdequacyCard adequacy={60} />
            </TabPanel>
          </TabPanels>
        </Tabs>  */ }
        { <Tabs
          variant="enclosed"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxW="800px"
          mx="auto"
          mt={"30px"}
        >
          <TabList>
            <Tab>3ヶ月後</Tab>
            <Tab>半年後</Tab>
            <Tab>1年後</Tab>
            <Tab>2年後</Tab>
          </TabList>
          <TabPanels>
            {adequacy &&
              adequacy.map((item, index) => (
                <TabPanel key={index}>
                  <AdequacyCard adequacy={item.adequacy} details={item.details} />
                </TabPanel>
              ))}
          </TabPanels>
        </Tabs> }
        <Box display="flex" justifyContent="center" p={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5} maxW="800px">
            {cards &&
              cards.map((card) => (
                <button
                  onClick={() => fetchRecommendData(card.index)}
                  key={card.index}
                >
                  <RationCard {...card} />
                </button>
              ))}
          </Grid>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>モーダルのタイトル</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {recommendData && (
              <VStack spacing={4}>
                {recommendData.map((item, index) => (
                  <Box key={index} w="100%">
                    <Image
                      src={item.Item.mediumImageUrls[0].imageUrl}
                      alt={item.Item.itemName}
                      w="100%"
                      mb={2}
                    />
                    <Text fontWeight="bold" textAlign="center">
                      {item.Item.itemName}
                    </Text>
                    <Link href={item.Item.itemUrl} color="blue.500" isExternal>
                      商品ページへ
                    </Link>
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
