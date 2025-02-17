import { useState } from "react";

import Navigation from "./SweatersStorage/Navigation/Nav";
import Products from "./SweatersStorage/Products/Products";
import products from "./SweatersStorage/db/data";
import Recommended from "./SweatersStorage/Recommended/Recommended";
import Sidebar from "./SweatersStorage/Sidebar/Sidebar";
import Card from "./SweatersStorage/components/Card";
import "./Sweaters.css";
import { Header } from "../../../shared/components/Header/Header";
import { useMediaQuery } from "react-responsive";

type Product = {
  category: string;
  color: string;
  company: string;
  newPrice: string;
  title: string;
  img: string;
  star: JSX.Element;
  reviews: string;
  prevPrice: string;
};

function Sweaters() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(
    products: Product[],
    selected: string | null,
    query: string
  ) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
    <Header />
    <div className="sweatersContainer">

      {isMobile ? (
          <>
          <div className="mobileCards">
            <Products result={result}/>
            <Recommended handleClick={handleClick} />
           </div>
          </>
        ) : (
          <div className="sweatersMenu">
          <div>
            <Sidebar handleChange={handleChange} />
          </div>
          <div>
            <Navigation query={query} handleInputChange={handleInputChange} />
            <Recommended handleClick={handleClick} />
            <Products result={result} />
          </div>
        </div>
        )}     
    </div>
    </>
  );
}

export default Sweaters;
