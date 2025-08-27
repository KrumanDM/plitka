import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import s from "./Decks.module.css";
import Navigation from 'shared/components/ProductsComponents/Nav';
import Products from "shared/components/ProductsComponents/Products/Products";
import Card from "shared/components/ProductsComponents/Card";
import { Header } from "shared/components/Header/Header";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "shared/config/hooks";
import {
  setSortLabel,
  sortByNewest,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  sortByTitleAZ,
  sortByTitleZA,
} from "shared/api/sortSlice";
import { Footer } from "shared/components/Footer/Footer";
import { FiltrationType } from "shared/config/types";
import SelectColors from "shared/components/SelectColors/SelectColors";
import SelectSizes from "shared/components/SelectSize/SelectSizes";
import SelectBrand from "shared/components/SelectBrand/SelectBrand";
import { useDecksData } from "pages/Skate/Decks/useDecks";
import { useMediaQuery } from "react-responsive";

function Decks() {
  const { data: decks } = useDecksData();
  const dispatch = useAppDispatch();
  const sortedProducts = useSelector((state: RootState) => state.sort.sortedProducts);

  const [products, setProducts] = useState<FiltrationType[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [query, setQuery] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const activeSizes = useSelector((state: RootState) => state.size.activeSizes);
  const activeBrands = useSelector((state: RootState) => state.brand.activeBrands);
  const label = useSelector((state: RootState) => state.sort.label);

  useEffect(() => {
    if (decks) setProducts(decks);
  }, [decks]);

  useEffect(() => {
    if (sortedProducts.length) setProducts(sortedProducts as FiltrationType[]);
  }, [sortedProducts]);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    dispatch(setSortLabel(value));

    switch (value) {
      case "По убыванию цены": dispatch(sortByPriceHighToLow(decks)); break;
      case "По возрастанию цены": dispatch(sortByPriceLowToHigh(decks)); break;
      case "От A до Z": dispatch(sortByTitleAZ(decks)); break;
      case "От Z до A": dispatch(sortByTitleZA(decks)); break;
      case "По новинкам": dispatch(sortByNewest(decks)); break;
    }
  }, [dispatch, decks]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);
  const handleColorChange = useCallback((e: SelectChangeEvent<string>) => setSelectedColor(e.target.value), []);

  const uniqueColors = useMemo(() => Array.from(new Set(decks?.map(p => p.color) || [])).sort(), [decks]);
  const uniqueSizes = useMemo(() => Array.from(new Set(decks?.map(p => p.size) || [])).sort(), [decks]);
  const uniqueBrands = useMemo(() => Array.from(new Set(decks?.map(p => p.company) || [])).sort(), [decks]);

  const filteredProducts = useMemo(() => 
    products.filter(p => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (selectedColor && p.color !== selectedColor) return false;
      if (activeSizes.length > 0 && !activeSizes.includes(p.size)) return false;
      if (activeBrands.length > 0 && !activeBrands.includes(p.company)) return false;
      return true;
    }),
    [products, query, selectedColor, activeSizes, activeBrands]
  );

  const result = useMemo(() =>
    filteredProducts.map(p => (
      <Card key={`${p.title}-${p.newPrice}-${p.img}`} {...p} />
    )),
    [filteredProducts]
  );

  const cardCount = result.length;

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
              <SelectColors colors={uniqueColors} />
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

export default Decks;
