import { useQuery } from "react-query";


export type ProductType = {
  img: string;
  title: string;
  star: string;
  reviews: string;
  prevPrice: string;
  newPrice: string;
  company: string;
  color: string;
  category: string;
  size: string;
  year: string;
};

// Function to fetch data
const fetchDecksData = async (): Promise<ProductType[]> => {
  const response = await fetch('http://localhost:5001/api/products/decks');
  if (!response.ok) {
    throw new Error('Failed to fetch decks data');
  }
  return response.json();
};

// Custom hook for data fetching
export const useDecksData = () => {
  return useQuery(['decks'], fetchDecksData, {
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 3, // Retry failed requests 3 times
  });
};
