export const isImageUrl = (str: string): boolean => {
  if (str.startsWith("http://") || str.startsWith("https://")) {
    return true;
  }

  return false;
};

export function getNestedValue<T>(obj: T, key: string): any {
  return key.split(".").reduce((acc, k) => (acc as any)?.[k], obj);
}
