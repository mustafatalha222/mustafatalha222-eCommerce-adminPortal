"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Center, Flex, Input, Skeleton, Table, Title } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { BiSort } from "react-icons/bi";
import { IStore, getStores } from "../../supabase/stores";
import { useQuery } from "@tanstack/react-query";

const StoreTable = () => {
  const { data: stores, isFetching } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getStores(),
  });
  const [data, setData] = useState<IStore[]>([]);
  const [value, setValue] = useDebouncedState("", 400);

  useEffect(() => {
    stores?.length && setData(stores);
  }, [stores]);

  useEffect(() => {
    handleFilter();
  }, [value, stores]);

  const handleSort = (column: keyof IStore) => {
    const sortedData = [...data].sort((a, b) => {
      return a[column] < b[column] ? -1 : 1;
    });
    setData(sortedData);
  };

  const handleFilter = () => {
    if (!stores?.length) return;
    let filteredData = stores;

    filteredData = filteredData?.filter((item) => {
      const lowercaseTerm = value.toLowerCase();
      return (
        item.name.toLowerCase().includes(lowercaseTerm) ||
        item.address.toString().includes(lowercaseTerm)
      );
    });

    setData(filteredData);
  };

  const TableRowSort = useCallback(
    (name: string, key: keyof IStore) => {
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

  return (
    <>
      <Flex justify={"center"} mt={"xs"}>
        <Input
          placeholder="Search by all Name and address"
          defaultValue={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          style={{ width: "400px" }}
          styles={{
            input: {
              borderRadius: 20,
            },
          }}
        />
      </Flex>

      <Table mt={"lg"}>
        <Table.Thead>
          <Table.Tr>
            {TableRowSort("Name", "name")}
            {TableRowSort("Timings", "timings")}
            {TableRowSort("Address", "address")}
            {TableRowSort("Description", "description")}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data?.map((customer) => (
            <Table.Tr key={customer.id}>
              <Table.Td>{customer.name}</Table.Td>
              <Table.Td>{customer.timings}</Table.Td>
              <Table.Td>{customer.address}</Table.Td>
              <Table.Td>{customer.description}</Table.Td>
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
              <Title order={4}>No Store Found</Title>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default StoreTable;
