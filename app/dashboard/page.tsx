"use client";
import { useState, useEffect } from "react";
import { Center, Select, Tabs } from "@mantine/core";
import SalesWithOrders from "./SalesWithOrders";
import { ISale, getSales } from "../../supabase/sales";
import { useQuery } from "@tanstack/react-query";
import {
  ALL_CATEGORIES,
  PRODUCT_CATEGORIES,
  SALES_INTERVAL,
} from "../utils/constants";

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
  const [data, setData] = useState<ISale[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(tabs.sales.value);
  const [selectedInterval, setSelectedInterval] = useState(
    SALES_INTERVAL.month
  );
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const { data: sales } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
  });

  useEffect(() => {
    sales?.length && setData(sales);
  }, [sales]);

  const handleFilter = (value: string) => {
    if (!sales?.length) return;
    let filteredData = sales;
    setSelectedCategory(value);
    if (value && value !== ALL_CATEGORIES) {
      filteredData = sales?.filter((item) => item.product.category === value);
    }
    setData(filteredData);
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List grow>
        {Object.values(tabs)?.map((key) => (
          <Tabs.Tab value={key.value}>{key.label}</Tabs.Tab>
        ))}
      </Tabs.List>

      <Center m={"md"}>
        <Select
          data={Object.values(SALES_INTERVAL)}
          placeholder="Change Time Frame"
          value={selectedInterval || null}
          onChange={(value) => setSelectedInterval(value as SALES_INTERVAL)}
        />

        <Select
          ml={"xs"}
          data={[ALL_CATEGORIES, ...PRODUCT_CATEGORIES]}
          placeholder="Product Categories"
          value={selectedCategory || null}
          onChange={(value) => handleFilter(value || "")}
        />
      </Center>
      <Tabs.Panel value={`${tabs.sales.value}`}>
        <SalesWithOrders salesData={data || []} interval={selectedInterval} />
      </Tabs.Panel>
      <Tabs.Panel value={`${tabs.inventory.value}`}>Second panel</Tabs.Panel>
    </Tabs>
  );
}
