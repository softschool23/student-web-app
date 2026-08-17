export const getProxiedPdfImageUrl = (imageUrl: string): string =>
  `/api/pdf-image?url=${encodeURIComponent(imageUrl)}`;
