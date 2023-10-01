import { supabase } from ".";

export type ICustomerSale = {
  name: string;
};

export type IProductSale = {
  name: string;
  category: string;
  price: number;
};

export type ISale = {
  id: string;
  quantity: number;
  total_price: number;
  customer: ICustomerSale;
  product: IProductSale;
  created_at: string;
};
const TABLE_NAME = "sales";
export type ISaleCreate = Omit<ISale, "id">;

export const getSales = async (): Promise<ISale[]> => {
  const { data } = await supabase
    .from(TABLE_NAME)
    .select(`*, customer(name), product(name, category, price)`);
  return data!;
};
