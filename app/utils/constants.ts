export const PRODUCT_CATEGORIES = ["Electronics", "Clothing", "Home & Kitchen"];
export const TIME_FRAME = ["Today", "This Week", "This Month", "This Year"];

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export enum SALES_INTERVAL {
  day = "day",
  month = "month",
  year = "year",
}
export const SUPERBASE_BUCKET = {
  BUCKET_NAME: process.env.NEXT_PUBLIC_SUPABASE_BUCKET!,
  PRODUCT_FOLDER: "productImages",
};
