"use client";
import { useState } from "react";
import { Center, Select, Tabs, Title } from "@mantine/core";
import { TotalSale } from "./TotalSale";
import { getSales } from "../../supabase/sales";
import { useQuery } from "@tanstack/react-query";
import { SALES_INTERVAL } from "../utils/constants";

const tabs = {
  sales: {
    label: "Total Sale",
    value: "sales",
  },
  inventory: {
    label: "Inventory",
    value: "inventory",
  },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string | null>(tabs.sales.value);
  const [selectedInterval, setSelectedInterval] = useState(
    SALES_INTERVAL.month
  );

  const { data: sales } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
  });

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List grow>
        {Object.values(tabs)?.map((key) => (
          <Tabs.Tab value={key.value}>{key.label}</Tabs.Tab>
        ))}
      </Tabs.List>

      <Center m={"md"}>
        <Title order={6} pr={10}>
          Change Time Interval
        </Title>
        <Select
          data={Object.values(SALES_INTERVAL)}
          placeholder="Sales view"
          value={selectedInterval || null}
          onChange={(value) => setSelectedInterval(value as SALES_INTERVAL)}
        />
      </Center>
      <Tabs.Panel value={`${tabs.sales.value}`}>
        <TotalSale salesData={sales || []} interval={selectedInterval} />
      </Tabs.Panel>
      <Tabs.Panel value={`${tabs.inventory.value}`}>Second panel</Tabs.Panel>
    </Tabs>
  );
}
