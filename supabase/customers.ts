import { supabase } from ".";

export type ICustomer = {
  id: string;
  name: string;
  email: string;
  address: string;
  zipcode: string;
};
const TABLE_NAME = "customers";
export type ICustomerCreate = Omit<ICustomer, "id">;

export const getCustomers = async (): Promise<ICustomer[]> => {
  const { data } = await supabase.from(TABLE_NAME).select();
  return data!;
};
