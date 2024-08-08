"use client";
import { useEffect, useState } from "react";
import AdequacyCard from "@/components/elements/rations/AdequacyCard";
import RationCard from "@/components/elements/rations/RationCard";
import Header from "@/components/layouts/Head";
import {
  Box,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

interface FoodStockCardProps {
  category?:
    | "水"
    | "パックご飯"
    | "パン"
    | "缶詰"
    | "レトルト食品"
    | "栄養補助食品";
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
  const [adequacy, setAdequacy] = useState<ApiData | null>(null);
  const [cards, setCards] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://localhost:3000/api/gettest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify("test2"),
        });
        if (!response1.ok) {
          throw new Error("Network response was not ok");
        }
        const cardResult = await response1.json();
        console.log(cardResult);
        setCards(cardResult);

        // const response2 = await fetch("https://api.example.com/data");
        // if (!response2.ok) {
        //   throw new Error("Network response was not ok");
        // }
        // const adequacyResult = await response2.json();
        // console.log(adequacyResult);
        // setAdequacy(adequacyResult);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!cards && !adequacy) return null; // データがまだない場合

  return (
    <>
      <Header />
      <Box>
        <Tabs
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
        </Tabs>
        {/* <Tabs
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
              adequacy.map((item) => (
                <TabPanel key={item.index}>
                  <AdequacyCard adequacy={item.adequacy} />
                </TabPanel>
              ))}
          </TabPanels>
        </Tabs> */}
        <Box display="flex" justifyContent="center" p={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5} maxW="800px">
            {cards &&
              cards.map((card) => <RationCard key={card.index} {...card} />)}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
