import { useQuery } from "react-query";
import { Product } from "shared/config/types";


// Function to fetch data
const fetchComplitesData = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:5001/api/products/complites');
  if (!response.ok) {
    throw new Error('Failed to fetch complites data');
  }
  return response.json();
};

// Custom hook for data fetching
export const useComplitesData = () => {
  return useQuery(['complites'], fetchComplitesData, {
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 3, // Retry failed requests 3 times
  });
};