export const imageCache: { [key: string]: Buffer } = {};
export const pdfCache: { [key: string]: Buffer } = {};

export const cleanupCache = () => {
  // Elimina todos los elementos en imageCache
  for (const key in imageCache) {
    if (imageCache.hasOwnProperty(key)) {
      delete imageCache[key];
    }
  }

  // Elimina todos los elementos en pdfCache
  for (const key in pdfCache) {
    if (pdfCache.hasOwnProperty(key)) {
      delete pdfCache[key];
    }
  }
};
