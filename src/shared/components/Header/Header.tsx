import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Clothing } from "../../../pages/Clothing/ClothingButton";
import { Accessories } from "../../../pages/Accessories/AccessoriesButton";
import { Skate } from "../../../pages/Skate/SkateButton";
import s from "./Header.module.css";
import SearchForm from "../Search/SearchForm";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import useProducts from "./useProducts";
import Products from "../ProductsComponents/Products/Products";
import CardSearch from "../Search/CardSearch";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

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

export const Header = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useProducts(query);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [showResults, setShowResults] = useState(false);

  const searchFormRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, showResults]);

  useEffect(() => {
    if (openSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openSidebar]);

  const handleClickOutside = (event: MouseEvent) => {
    const isSearchFormOpen = isSearchOpen && searchFormRef.current;
    const isProductsOpen = showResults && productsRef.current;

    const isClickInsideSearchForm =
      isSearchFormOpen && searchFormRef.current.contains(event.target as Node);
    const isClickInsideProducts =
      isProductsOpen && productsRef.current.contains(event.target as Node);

    if (!isClickInsideSearchForm && !isClickInsideProducts) {
      handleCloseResults();
    }
  };

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setShowResults(!showResults);
  };

  const handleCloseResults = () => {
    if (showResults && isSearchOpen) {
      setShowResults(false);
      setIsSearchOpen(false);
    }
  };

  const handleProfileClick = (event: React.MouseEvent) => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      navigate("/user-profile");
      event.preventDefault();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
  };

  let prevQuery = "";
  let result: JSX.Element[] = [];

  const filteredData = (products: Product[], query: string) => {
    if (query === prevQuery) return result; // если запрос не изменился, возвращаем предыдущий результат

    prevQuery = query;

    if (!products || !products.length) return [];

    const lowercasedQuery = query.toLowerCase();

    const filteredProducts = products.filter((product) => {
      const title = product.title.toLowerCase();
      const queryWords = lowercasedQuery.split(" ");
      return queryWords.every((word) => title.includes(word));
    });

    result = filteredProducts.map(
      ({
        img,
        title,
        star,
        reviews,
        prevPrice,
        newPrice,
        size,
        company,
        color,
      }) => (
        <CardSearch
          key={`${title}-${newPrice}-${img}`}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
          size={size}
          company={company}
          color={color}
        />
      )
    );

    return result;
  };

  const filteredResult = data ? filteredData(data, query) : [];
  return (
    <div className={s.header}>
      <div className={s.headerContainer}>
        {isMobile ? (
          <>
            <MenuIcon className={s.burger} onClick={handleOpenMobileMenu} />
            {isMobileMenuOpen && (
              <Sidebar onClickOutside={() => setIsMobileMenuOpen(false)} />
            )}
          </>
        ) : (
          <div className={s.storeContainer}>
            <Clothing />
            <Accessories />
            <Skate />
          </div>
        )}

        <a className={s.logo} href="/plitka">
          Plitka
        </a>

        <div className={s.userContainer}>
          <div onClick={handleOpenSearch} className={s.searchContainer}>
            <SearchIcon />
          </div>
          <Link to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ArticleOutlinedIcon />
          </Link>
          <div className={s.profile}>
            <Link to="/profile" onClick={handleProfileClick}>
              <AccountCircleIcon />
            </Link>
          </div>
          <div className={s.busket}>
            <Link to="/busket">
              <ShoppingBasketOutlinedIcon />
            </Link>
          </div>
          <div className={s.result}>
            {isSearchOpen && (
              <div className={s.SearchFormContainer} ref={searchFormRef}>
                <SearchForm
                  query={query}
                  handleInputChange={handleInputChange}
                  handleOpenSearch={handleOpenSearch}
                  handleCloseResults={handleCloseResults}
                />
              </div>
            )}
            <div className={s.resultProducts} ref={productsRef}>
              {showResults &&
                query &&
                filteredResult &&
                filteredResult.length > 0 && (
                  <Products result={filteredResult} />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
