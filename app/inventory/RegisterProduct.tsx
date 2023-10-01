import React, { memo } from "react";
import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Textarea,
  Select,
  Button,
  NumberInput,
  Flex,
} from "@mantine/core";
import ImageUpload from "../_components/ImageUpload";
import { PRODUCT_CATEGORIES } from "../utils/constants";
import {
  IProduct,
  IProductCreate,
  addProduct,
  updateProduct,
} from "../../supabase/products";
import { useMutation } from "@tanstack/react-query";

type IRegisterProduct = {
  refetch: () => void;
  opened: boolean;
  open: () => void;
  close: () => void;
  activeProduct: IProduct | null;
  setactiveProduct: (e: IProduct | null) => void;
};

const initialValues = {
  name: "",
  description: "",
  inventory: 0,
  price: 0.0,
  category: "",
  imageUrl: "",
};

function RegisterProduct({
  refetch,
  open,
  close,
  opened,
  activeProduct,
  setactiveProduct,
}: IRegisterProduct) {
  console.log("RegisterProduct", activeProduct);
  const form = useForm({
    initialValues: activeProduct || initialValues,
    validate: {
      name: (value) =>
        value.length < 2
          ? "Name required and must have at least 2 letters"
          : null,
      description: (value) =>
        value.length < 2
          ? "Description required and  must have at least 2 letters"
          : null,
      category: (value) => !value && "Category is required",
      price: (value) => typeof value !== "number" && "Price is required",
      inventory: (value) =>
        typeof value !== "number" && "Inventory is required",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: IProductCreate) => {
      const { id } = activeProduct || {};
      return id ? updateProduct(id, values) : addProduct(values);
    },
    onSuccess() {
      refetch();
      handleClose();
    },
  });

  const handleClose = () => {
    close();
    form.reset();
    setactiveProduct(null);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="Register Product"
        styles={{
          title: {
            fontSize: 20,
            fontWeight: 700,
          },
        }}
      >
        <form onSubmit={form.onSubmit((values) => mutate(values))}>
          <ImageUpload
            onReadSuccess={(b64) => form.setFieldValue("imageUrl", b64)}
            src={form.values.imageUrl || ""}
            alt="Product Image"
            style={{
              maxHeight: 170,
              maxWidth: 170,
              margin: "auto",
              minHeight: 170,
            }}
          />

          <TextInput
            mt={"xs"}
            withAsterisk
            label="Name"
            placeholder="Product Name"
            {...form.getInputProps("name")}
            maxLength={25}
          />
          <Textarea
            mt={"xs"}
            withAsterisk
            label="Description"
            placeholder="Product Description"
            {...form.getInputProps("description")}
            maxLength={200}
          />
          <Flex gap={"xs"} mt={"xs"}>
            <NumberInput
              label="Inventory"
              placeholder="Inventory"
              {...form.getInputProps("inventory")}
              allowDecimal={false}
              allowNegative={false}
              max={10000}
            />
            <NumberInput
              label="Price"
              placeholder="Price"
              {...form.getInputProps("price")}
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              max={100000}
            />
          </Flex>
          <Select
            mt={"xs"}
            label="Category"
            data={PRODUCT_CATEGORIES}
            placeholder="Select Category"
            {...form.getInputProps("category")}
          />

          <Button
            mt={"md"}
            fullWidth
            type="submit"
            variant="filled"
            color="blue"
            loading={isLoading}
          >
            {activeProduct ? "Update" : "Register"}
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default memo(RegisterProduct);
