import { decode } from "base64-arraybuffer";
import { supabase } from ".";
import { SUPERBASE_BUCKET } from "../app/utils/constants";

export type IProduct = {
  id: string;
  name: string;
  description: string;
  inventory: number;
  price: number;
  category: string;
  imageUrl: string;
};
const TABLE_NAME = "products";
export type IProductCreate = Omit<IProduct, "id">;

export const getProducts = async (): Promise<IProduct[]> => {
  const { data } = await supabase.from(TABLE_NAME).select();
  return data!;
};

export const uploadProductImage = async (file: string, filename: string) => {
  const { data: path } = await supabase.storage
    .from(SUPERBASE_BUCKET.BUCKET_NAME)
    .upload(
      `${SUPERBASE_BUCKET.PRODUCT_FOLDER}/${filename}_${Date.now()}.png`,
      decode(file.split("base64,")[1]),
      {
        contentType: "image/png",
      }
    );
  const {
    data: { publicUrl },
  } = await supabase.storage
    .from(SUPERBASE_BUCKET.BUCKET_NAME)
    .getPublicUrl(path!.path);
  return publicUrl;
};

export const addProduct = async (product: IProductCreate) => {
  let { imageUrl, name } = product;
  if (product.imageUrl) {
    product.imageUrl = await uploadProductImage(imageUrl, name);
  }
  const { data } = await supabase.from(TABLE_NAME).insert(product).single();
  return data;
};

export const updateProduct = async (id: string, product: IProductCreate) => {
  let { imageUrl, name } = product;
  if (product.imageUrl && !isImageUrl(product.imageUrl)) {
    product.imageUrl = await uploadProductImage(imageUrl, name);
  }
  const { data } = await supabase.from(TABLE_NAME).update(product).eq("id", id);
  return data;
};
