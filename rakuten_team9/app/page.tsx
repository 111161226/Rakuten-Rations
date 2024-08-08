"use client";
import AdequacyCard from "@/components/elements/rations/AdequacyCard";
import RationCard from "@/components/elements/rations/RationCard";
import Header from "@/components/layouts/Header";

export default function Page() {
  return (
    <>
      <Header />
      <AdequacyCard />
      <RationCard />
      <RationCard />
      <RationCard />
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
