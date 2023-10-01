function isImageUrl(str: string): boolean {
  if (str.startsWith("http://") || str.startsWith("https://")) {
    return true;
  }

  return false;
}
