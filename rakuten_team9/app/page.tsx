"use client";
import AdequacyCard from "@/components/elements/rations/AdequacyCard";
import RationCard from "@/components/elements/rations/RationCard";
import Header from "@/components/layouts/Header";

export default function Page() {
  return (
    <>
      <Header />
      <RationCard />
      <AdequacyCard />
    </>
  );
}
