"use client";
import { useState } from "react";
import {
  Center,
  Select,
  Skeleton,
  Tabs,
  Title as Heading,
} from "@mantine/core";
import SalesWithOrders from "./SalesWithOrders";
import { ISale, getSales } from "../../supabase/sales";
import { useQuery } from "@tanstack/react-query";
import {
  ALL_CATEGORIES,
  PRODUCT_CATEGORIES,
  SALES_INTERVAL,
} from "../utils/constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import InventoryChart from "./InventoryChart";
import { IProduct, getProducts } from "../../supabase/products";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const tabs = {
  sales: {
    label: "Sales and Orders",
    value: "sales",
  },
  inventory: {
    label: "Inventory Stock",
    value: "inventory",
  },
};

export default function Dashboard() {
  const [data, setData] = useState<ISale[]>([]);
  const [productsData, setproductsData] = useState<IProduct[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(tabs.sales.value);
  const [selectedInterval, setSelectedInterval] = useState(
    SALES_INTERVAL.month
  );
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const { data: sales } = useQuery({
    queryKey: ["salesChartData"],
    queryFn: () => getSales(),
    onSuccess(data) {
      data && setData(data);
    },
  });

  const { data: products, isFetching } = useQuery({
    queryKey: ["productsChartData"],
    queryFn: () => getProducts(),
    onSuccess(data) {
      data && setproductsData(data);
    },
  });

  const handleFilter = (value: string) => {
    if (!sales?.length || !products?.length) return;
    let filteredData = sales;
    let filteredDataProduct = products;
    setSelectedCategory(value);
    if (value && value !== ALL_CATEGORIES) {
      filteredData = sales?.filter((item) => item.product.category === value);
      filteredDataProduct = products?.filter((item) => item.category === value);
    }
    setData(filteredData);
    setproductsData(filteredDataProduct);
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List
        grow
        style={{ maxWidth: 300, margin: "auto" }}
        styles={{ list: { fontWeight: 600, fontSize: 24 } }}
      >
        {Object.values(tabs)?.map((key) => (
          <Tabs.Tab value={key.value}>{key.label}</Tabs.Tab>
        ))}
      </Tabs.List>

      <Center m={"md"}>
        {activeTab === tabs.sales.value && (
          <Select
            data={Object.values(SALES_INTERVAL)}
            placeholder="Change Time Frame"
            value={selectedInterval || null}
            onChange={(value) => setSelectedInterval(value as SALES_INTERVAL)}
          />
        )}

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
      <Tabs.Panel value={`${tabs.inventory.value}`}>
        {isFetching && !productsData.length ? (
          <Skeleton w={"100%"} height={100} mt={"sm"} />
        ) : !productsData.length ? (
          <Heading order={3}>No Product Data Found</Heading>
        ) : (
          <InventoryChart products={productsData} />
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
