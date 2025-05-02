import { ChangeEvent, useEffect, useState } from "react";
import s from "./Socks.module.css";
import Navigation from "../../../shared/components/ProductsComponents/Nav";
import { useMediaQuery } from "react-responsive";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  setSortLabel,
  sortByNewest,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  sortByTitleAZ,
  sortByTitleZA,
} from "../../../shared/api/sortSlice";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../Footer/Footer";
import { FiltrationType} from "../../../shared/config/types";
import SelectColors from "../../../shared/components/SelectColors/SelectColors";
import SelectSizes from "../../../shared/components/SelectSize/SelectSizes";
import SelectBrand from "../../../shared/components/SelectBrand/SelectBrand";
import Card from "../../../shared/components/ProductsComponents/Card";
import { Header } from "../../../shared/components/Header/Header";
import { useAppDispatch } from "../../../shared/config/hooks";
import Products from "../../../shared/components/ProductsComponents/Products/Products";
import { useDecksData } from "pages/Skate/Decks/useDecks";

function Socks() {
  const { data: decks, isLoading, isError, error } = useDecksData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Получите функцию navigate
  const sortedProducts = useSelector(
    (state: RootState) => state.sort.sortedProducts
  );
  
  useEffect(() => {
    setProducts(decks || []);
  }, [decks]);

  useEffect(() => {
    setProducts(sortedProducts as FiltrationType[]);
  }, [sortedProducts]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    dispatch(setSortLabel(value));

    if (value === "По убыванию цены") {
      dispatch(sortByPriceHighToLow(decks));
    } else if (value === "По возрастанию цены") {
      dispatch(sortByPriceLowToHigh(decks));
    } else if (value === "От A до Z") {
      dispatch(sortByTitleAZ(decks));
    } else if (value === "От Z до A") {
      dispatch(sortByTitleZA(decks));
    } else if (value === "По новинкам") {
      dispatch(sortByNewest(decks));
    }
  };
  // Инициализация состояния
 const [products, setProducts] = useState<FiltrationType[]>([]);

  useEffect(() => {
    if (decks) {
      setProducts(decks);
    }
  }, [decks]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const activeSizes = useSelector((state: RootState) => state.size.activeSizes);
  const activeBrands = useSelector(
    (state: RootState) => state.brand.activeBrands
  );
  const label = useSelector((state: RootState) => state.sort.label);
  const [selectedColor, setSelectedColor] = useState("");
  const [cardCount, setCardCount] = useState(0); //показывает количество товаров
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [query, setQuery] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleColorChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const color = event.target.value;
    setSelectedColor(color); 
  };
  // Создаются уникальные неповторяющиеся цвета с помощью new Set
  const uniqueColors = Array.from(
    new Set(decks?.map((product: FiltrationType) => product.color) || [])
  ).sort();
  
  const uniqueSizes = Array.from(
    new Set(decks?.map((product: FiltrationType) => product.size) || [])
  ).sort();
  
  const uniqueBrands = Array.from(
    new Set(decks?.map((product: FiltrationType) => product.company) || [])
  ).sort();
  const handleSearch = (query: string) => {
    // Найдите продукт по заголовку
    const foundProduct = products.find(
      (product) => product.title.toLowerCase() === query.toLowerCase()
    );

    // Если продукт найден, переходите на его страницу
    if (foundProduct) {
      navigate(
        `/card/${foundProduct.title}/${
          foundProduct.newPrice
        }/${encodeURIComponent(foundProduct.img)}/${foundProduct.company}/${
          foundProduct.color
        }/${foundProduct.size}`
      );
    } else {
      alert("Продукт не найден"); // Уведомление о том, что продукт не найден
    }
  };

  function filteredData(
    products: FiltrationType[],
    selected: string | null,
    query: string,
    selectedColor: string // Добавляем параметр для выбранного цвета
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

    // Фильтрация по цвету
    if (selectedColor) {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === selectedColor
      );
    }

    if (activeSizes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        activeSizes.includes(product.size)
      );
    }
    if (activeBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        activeBrands.includes(product.company)
      );
    }

    return filteredProducts.map(
      ({
        img,
        title,
        prevPrice,
        newPrice,
        size,
        company,
        color,
      }) => (
        <Card
          key={`${title}-${newPrice}-${img}`}
          img={img}
          title={title}
          prevPrice={prevPrice}
          newPrice={newPrice}
          size={size}
          company={company}
          color={color}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query, selectedColor);

  useEffect(() => {
    if (result) {
      setCardCount(result.length);
    }
  }, [result]);

  return (
    <>
      <Header />

      <div className={s.sweatersContainer}>
        {isMobile ? (
          <>
            <div className={s.mobileCards}>
              <div className={s.parametersContainer}>
                <div className={s.sizeContainer}>
                  <SelectSizes sizes={uniqueSizes} />
                </div>
                <SelectColors
                  colors={uniqueColors}
                  handleChange={handleColorChange}
                />
                <div className={s.sizeContainer}>
                  <SelectBrand brands={uniqueBrands} />
                </div>
              </div>
              <div className={s.numberAndNavigation}>
                <div className={s.sortContainer}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ width: "130px" }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Сортировка
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={label}
                        label="Сортировка"
                        onChange={handleSelectChange}
                      >
                        <MenuItem value="По убыванию цены">
                          По убыванию цены
                        </MenuItem>
                        <MenuItem value="По возрастанию цены">
                          По возрастанию цены
                        </MenuItem>
                        <MenuItem value="От A до Z">От A до Z</MenuItem>
                        <MenuItem value="От Z до A">От Z до A</MenuItem>
                        <MenuItem value="По новинкам">По новинкам</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <Navigation
                  query={query}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className={s.cardCount}>{cardCount} товаров</div>
              <Products result={result} />
            </div>
          </>
        ) : (
          <div className={s.menuContainer}>
            <div className={s.parametersContainer}>
              <div className={s.sizeContainer}>
                <SelectSizes sizes={uniqueSizes} />
              </div>
              <SelectColors colors={uniqueColors} handleChange={handleColorChange} />
              <div className={s.sizeContainer}>
                <SelectBrand brands={uniqueBrands} />
              </div>
              <div className={s.sortContainer}>
                <Box>
                  <FormControl sx={{ width: "132px" }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      Сортировка
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={label}
                      label="Сортировка"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="По убыванию цены">
                        По убыванию цены
                      </MenuItem>
                      <MenuItem value="По возрастанию цены">
                        По возрастанию цены
                      </MenuItem>
                      <MenuItem value="От A до Z">От A до Z</MenuItem>
                      <MenuItem value="От Z до A">От Z до A</MenuItem>
                      <MenuItem value="По новинкам">По новинкам</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div>
              <div className={s.countAndNavigation}>
                <p className={s.cardCount}>{cardCount} товаров</p>
                <Navigation
                  query={query}
                  handleInputChange={handleInputChange}
                />
              </div>
              <Products result={result} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Socks;
