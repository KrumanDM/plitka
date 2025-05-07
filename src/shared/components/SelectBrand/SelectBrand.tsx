import { FC, useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Checkbox, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../store/store";
import { setActiveBrands } from './brandSlice';

type BrandsPropsType = {
  brands: string[];
}

const SelectBrand: FC<BrandsPropsType> = ({ brands }) => {
  const dispatch = useDispatch();
  const activeBrands = useSelector((state: RootState) => state.brand.activeBrands) as string[];
  const handleBrandChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setActiveBrands(
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  //Функция будет вызвана при размонтировании компонента и обнулит состояние выбранных брендов
  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    return () => {
      setIsMounted(false);
      dispatch(setActiveBrands([]));
    };
  }, [dispatch]); 
  
  return (
    <FormControl sx={{ width: '100px' }} size="small">
      <InputLabel id="brand-label">Бренд</InputLabel>
      <Select<string[]>
        labelId="brand-label"
        id="brand-select"
        multiple
        value={activeBrands}
        label="Бренд"
        onChange={handleBrandChange}
        renderValue={(selected) => selected.join(', ')}
      >
        
        {brands.map((brand) => (
          <MenuItem key={brand} value={brand}>
            <Checkbox checked={activeBrands.includes(brand)} />
            <ListItemText primary={brand} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBrand;