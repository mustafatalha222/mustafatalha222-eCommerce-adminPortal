export const PRODUCT_CATEGORIES = ["Electronics", "Clothing", "Home & Kitchen"];
export const ALL_CATEGORIES = "All Categories";
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

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export enum SALES_INTERVAL {
  day = "day",
  month = "month",
  year = "year",
  week = "week",
}
export const SUPERBASE_BUCKET = {
  BUCKET_NAME: process.env.NEXT_PUBLIC_SUPABASE_BUCKET!,
  PRODUCT_FOLDER: "productImages",
};
