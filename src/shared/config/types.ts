export type Item = {
  img: string;
  title: string;
  prevPrice: string;
  newPrice: string;
  company: string;
  color: string;
  size: string;
}

export type CartState = {
  items: Item[];
}

export type Product = {
  category: string;
  color: string;
  company: string;
  newPrice: string;
  title: string;
  img: string;
  star: string;
  reviews: string;
  prevPrice: string;
  size: string;
  year: string;
};

export type FiltrationType = {
  category: string;
  color: string;
  company: string;
  newPrice: string;
  title: string;
  img: string;
  prevPrice: string;
  size: string;
  year: string;
};
