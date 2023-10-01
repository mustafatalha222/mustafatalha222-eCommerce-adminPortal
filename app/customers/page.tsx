"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Center, Flex, Input, Skeleton, Table, Title } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { BiSort } from "react-icons/bi";
import { ICustomer, getCustomers } from "../../supabase/customers";
import { useQuery } from "@tanstack/react-query";

const CustomerTable = () => {
  const { data: customers, isFetching } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });
  const [data, setData] = useState<ICustomer[]>([]);
  const [value, setValue] = useDebouncedState("", 400);

  useEffect(() => {
    customers?.length && setData(customers);
  }, [customers]);

  useEffect(() => {
    handleFilter();
  }, [value, customers]);

  const handleSort = (column: keyof ICustomer) => {
    const sortedData = [...data].sort((a, b) => {
      return a[column] < b[column] ? -1 : 1;
    });
    setData(sortedData);
  };

  const handleFilter = () => {
    if (!customers?.length) return;
    let filteredData = customers;

    filteredData = filteredData?.filter((item) => {
      const lowercaseTerm = value.toLowerCase();
      return (
        item.name.toLowerCase().includes(lowercaseTerm) ||
        item.email.toLowerCase().includes(lowercaseTerm) ||
        item.address.toString().includes(lowercaseTerm) ||
        item.zipcode.toString().includes(lowercaseTerm)
      );
    });

    setData(filteredData);
  };

  const TableRowSort = useCallback(
    (name: string, key: keyof ICustomer) => {
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
          placeholder="Search by all Name, Email, zipCode and address"
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
            {TableRowSort("Email", "email")}
            {TableRowSort("Address", "address")}
            {TableRowSort("Zipcode", "zipcode")}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data?.map((customer) => (
            <Table.Tr key={customer.id}>
              <Table.Td>{customer.name}</Table.Td>
              <Table.Td>{customer.email}</Table.Td>
              <Table.Td>{customer.address}</Table.Td>
              <Table.Td>{customer.zipcode}</Table.Td>
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
              <Title order={4}>No Customer Found</Title>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default CustomerTable;
