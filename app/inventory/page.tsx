"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Button,
  Flex,
  Group,
  Input,
  Select,
  Table,
} from "@mantine/core";
import { PRODUCT_CATEGORIES } from "../utils/constants";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import RegisterProduct from "./RegisterProduct";
import { BiEditAlt, BiSort } from "react-icons/bi";
import { IProduct, getProducts } from "../../supabase/products";
import { useQuery } from "@tanstack/react-query";

const ProductTable = () => {
  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  const [data, setData] = useState<IProduct[]>([]);
  const [value, setValue] = useDebouncedState("", 400);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [activeProduct, setactiveProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    products?.length && setData(products);
  }, [products]);

  useEffect(() => {
    handleFilter();
  }, [value, products]);

  const handleSort = (column: keyof IProduct) => {
    const sortedData = [...data].sort((a, b) => {
      return a[column] < b[column] ? -1 : 1;
    });
    setData(sortedData);
  };

  const handleFilter = () => {
    if (!products?.length) return;
    let filteredData = products;
    if (selectedCategory) {
      filteredData = products?.filter(
        (item) => item.category === selectedCategory
      );
    }
    if (value) {
      filteredData = filteredData?.filter((item) => {
        const lowercaseTerm = value.toLowerCase();
        return (
          item.name.toLowerCase().includes(lowercaseTerm) ||
          item.category.toLowerCase().includes(lowercaseTerm) ||
          item.description.toString().includes(lowercaseTerm)
        );
      });
    }

    setData(filteredData);
  };

  const resetTable = () => {
    setData(products || []);
    setSelectedCategory("");
  };

  const TableRowSort = useCallback(
    (name: string, key: keyof IProduct) => {
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

  const handleEdit = (e: IProduct) => {
    setactiveProduct(e);
    open();
  };

  return (
    <>
      <Button onClick={open}>Register Product</Button>
      {opened && (
        <RegisterProduct
          opened={opened}
          refetch={refetch}
          open={open}
          close={close}
          activeProduct={activeProduct}
          setactiveProduct={setactiveProduct}
        />
      )}

      <Flex justify={"space-between"} gap="lg" mt={"xs"}>
        <Input
          placeholder="Search by all Name, Category and description"
          defaultValue={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          style={{ width: "400px" }}
          styles={{
            input: {
              borderRadius: 20,
            },
          }}
        />
        <Group gap="xs">
          <Select
            data={PRODUCT_CATEGORIES}
            placeholder="Filter by category"
            value={selectedCategory || null}
            onChange={(value) => setSelectedCategory(value || "")}
          />

          <Button onClick={handleFilter}>Apply Filter</Button>
          <Button onClick={resetTable}>Reset</Button>
        </Group>
      </Flex>

      <Table mt={"lg"}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Image</Table.Th>
            {TableRowSort("Name", "name")}
            {TableRowSort("Description", "description")}
            {TableRowSort("Inventory", "inventory")}
            {TableRowSort("Price", "price")}
            {TableRowSort("Category", "category")}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <Avatar variant="filled" radius="sm" src={product.imageUrl} />
              </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>{product.description}</Table.Td>
              <Table.Td>{product.inventory}</Table.Td>
              <Table.Td>₩{product.price}</Table.Td>
              <Table.Td>{product.category}</Table.Td>
              <Table.Td>
                <BiEditAlt
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleEdit(product);
                  }}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default ProductTable;
