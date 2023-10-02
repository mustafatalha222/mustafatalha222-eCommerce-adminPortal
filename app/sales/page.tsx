"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Center,
  Flex,
  Group,
  Select,
  Skeleton,
  Table,
  Title,
} from "@mantine/core";
import { BiSort } from "react-icons/bi";
import { ISale, getSales } from "../../supabase/sales";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_CATEGORIES, TIME_FRAME } from "../utils/constants";
import { getNestedValue } from "../utils/helperFunctions";

const initialFilters = {
  timeframe: "",
  category: "",
};

const SaleTable = () => {
  const { data: sales, isFetching } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
  });
  const [data, setData] = useState<ISale[]>([]);
  const [selectedFilters, setselectedFilters] = useState(initialFilters);

  useEffect(() => {
    sales?.length && setData(sales);
  }, [sales]);

  const handleFilter = () => {
    if (!sales?.length) return;
    const { category, timeframe } = selectedFilters;
    let filteredData = sales;
    if (category) {
      filteredData = sales?.filter(
        (item) => item.product.category === category
      );
    }

    switch (timeframe) {
      case "Today":
        const today = new Date();
        filteredData = data.filter((item) => {
          const createdAtDate = new Date(item.created_at);
          return (
            createdAtDate.getDate() === today.getDate() &&
            createdAtDate.getMonth() === today.getMonth() &&
            createdAtDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      case "This Week":
        const now = new Date();
        const startOfWeek = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay()
        );
        const endOfWeek = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + (6 - now.getDay())
        );

        filteredData = data.filter((item) => {
          const createdAtDate = new Date(item.created_at);
          return createdAtDate >= startOfWeek && createdAtDate <= endOfWeek;
        });
        break;
      case "This Month":
        const thisMonth = new Date();
        thisMonth.setDate(1);

        filteredData = data.filter((item) => {
          const createdAtDate = new Date(item.created_at);
          return (
            createdAtDate.getMonth() === thisMonth.getMonth() &&
            createdAtDate.getFullYear() === thisMonth.getFullYear()
          );
        });
        break;
      case "This Year":
        const thisYear = new Date();
        thisYear.setMonth(0, 1);

        filteredData = data.filter((item) => {
          const createdAtDate = new Date(item.created_at);
          return createdAtDate.getFullYear() === thisYear.getFullYear();
        });
        break;
      default:
        filteredData = filteredData;
    }
    setData(filteredData);
  };

  const handleSort = (column: keyof ISale | string) => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = getNestedValue(a, column.toString());
      const bValue = getNestedValue(b, column.toString());

      return aValue < bValue ? -1 : 1;
    });
    setData(sortedData);
  };

  const TableRowSort = useCallback(
    (name: string, key: keyof ISale | string) => {
      return (
        <Table.Th>
          {name}{" "}
          <BiSort
            onClick={() => handleSort(key)}
            size={12}
            style={{ cursor: "pointer" }}
          />
        </Table.Th>
      );
    },
    [data]
  );

  const resetTable = () => {
    setData(sales || []);
    setselectedFilters(initialFilters);
  };

  return (
    <>
      <Flex justify={"end"} mt={"xs"}>
        <Group gap="xs">
          <Select
            data={PRODUCT_CATEGORIES}
            placeholder="Filter by Category"
            value={selectedFilters.category || null}
            onChange={(value) =>
              setselectedFilters({ ...selectedFilters, category: value || "" })
            }
          />

          <Select
            data={TIME_FRAME}
            placeholder="Filter by TimeFrame"
            value={selectedFilters.timeframe || null}
            onChange={(value) =>
              setselectedFilters({ ...selectedFilters, timeframe: value || "" })
            }
          />

          <Button onClick={handleFilter}>Apply Filter</Button>
          <Button onClick={resetTable}>Reset</Button>
        </Group>
      </Flex>

      <Table mt={"lg"}>
        <Table.Thead>
          <Table.Tr>
            {TableRowSort("Product", "product.name")}
            {TableRowSort("Price", "product.price")}
            {TableRowSort("Category", "product.category")}
            {TableRowSort("Customer", "customer.name")}
            {TableRowSort("Quantity", "quantity")}
            {TableRowSort("Total Price", "total_price")}
            {TableRowSort("Date", "created_at")}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data?.map((sale) => (
            <Table.Tr key={sale.id}>
              <Table.Td>{sale.product.name}</Table.Td>
              <Table.Td>{sale.product.price}</Table.Td>
              <Table.Td>{sale.product.category}</Table.Td>
              <Table.Td>{sale.customer.name}</Table.Td>
              <Table.Td>{sale.quantity}</Table.Td>
              <Table.Td>{sale.total_price}</Table.Td>
              <Table.Td>{new Date(sale.created_at).toUTCString()}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {!data.length && (
        <>
          {isFetching ? (
            <Skeleton w={"100%"} height={50} mt={"sm"} />
          ) : (
            <Center mt={"sm"}>
              <Title order={4}>No Sale Found</Title>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default SaleTable;
