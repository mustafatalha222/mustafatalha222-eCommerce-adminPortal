import { supabase } from ".";

export type IStore = {
  id: string;
  name: string;
  timings: string;
  address: string;
  description: string;
};
const TABLE_NAME = "stores";

export const getStores = async (): Promise<IStore[]> => {
  const { data } = await supabase.from(TABLE_NAME).select();
  return data!;
};
