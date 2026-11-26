const API_URL = "https://dummyjson.com/c/ab1e-2103-45a0-adcb";

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.products)) {
      throw new Error("Invalid products data received from API");
    }
    return data.products;
  } catch (error) {
    console.error("Products API Error:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};