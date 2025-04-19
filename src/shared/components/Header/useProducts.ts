// useProducts.ts
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface Product {
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
}

const fetchProducts = async (query: string): Promise<Product[]> => {
    const results = await Promise.allSettled([
        fetch('http://localhost:5001/api/products/decks'),
        fetch('http://localhost:5001/api/products/trucks'),
        fetch('http://localhost:5001/api/products/complites'),
      ]);
      const data = await Promise.all(results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value.json();
        } else {
          throw new Error(result.reason);
        }
      }));

  // Объединяем массивы в один массив
  const flatData = data.flat();

  // Преобразуем данные в нужный формат
  const formattedData = flatData.map((product: any) => ({
    img: product.img,
    title: product.title,
    star: product.star,
    reviews: product.reviews,
    prevPrice: product.prevPrice,
    newPrice: product.newPrice,
    company: product.company,
    color: product.color,
    category: product.category,
    size: product.size,
    year: product.year,
  }));

  return formattedData;
};

const useProducts = (query: string) => {
  const { data, error, isLoading } = useQuery(
    ['products', query],
    () => fetchProducts(query),
    {
      staleTime: 10000, // 10 секунд
    }
  );

  return { data, error, isLoading };
};

export default useProducts;