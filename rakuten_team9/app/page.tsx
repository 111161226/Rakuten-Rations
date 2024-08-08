"use client";
import AdequacyCard from "@/components/elements/rations/AdequacyCard";
import RationCard from "@/components/elements/rations/RationCard";
import Head from "@/components/layouts/Head";
import {
  Box,
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head />
      <Box>
        <AdequacyCard />
        <Box display="flex" justifyContent="center" p={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} maxW="800px">
            <button onClick={onOpen}>
              <RationCard />
            </button>
            <RationCard />
            <RationCard />
          </Grid>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>モーダルのタイトル</ModalHeader>
          <ModalCloseButton />
          <ModalBody>モーダルのコンテンツがここに入ります。</ModalBody>

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

// import { useEffect, useState } from "react";
// import AdequacyCard from "@/components/elements/rations/AdequacyCard";
// import RationCard from "@/components/elements/rations/RationCard";
// import Header from "@/components/layouts/Header";

// interface FoodStockCardProps {
//   category?:
//     | "水"
//     | "パックご飯"
//     | "パン"
//     | "缶詰"
//     | "レトルト食品"
//     | "栄養補助食品";
//   quantity?: number;
//   index: number;
//   expirationDate?: string;
// }

// interface ApiData {
//   adequacy: number;
//   details: string[];
//   rationCards: FoodStockCardProps[];
// }

// export default function Page() {
//   const [data, setData] = useState<ApiData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://api.example.com/data");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result: ApiData = await response.json();
//         setData(result);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   if (!data) return null; // データがまだない場合

//   return (
//     <>
//       <Header />
//       <AdequacyCard adequacy={data.adequacy} details={data.details} />
//       <div className="grid grid-cols-2 gap-4 p-4">
//         {data.rationCards.map((card, index) => (
//           <RationCard key={index} {...card} />
//         ))}
//       </div>
//     </>
//   );
// }
