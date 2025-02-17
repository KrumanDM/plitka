import { FC } from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from "../../../store/colorSlice";
import { RootState } from "../../../store/store";

type ColorPropsType = {
  colors: string[];
  handleChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

const SelectColors: FC<ColorPropsType> = ({ colors, handleChange }) => {
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.color.color);

  const handleColorChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    const selectedColor = event.target.value as string;
    dispatch(setColor(selectedColor));
    if (handleChange) {
      handleChange(event, child); // Вызываем handleChange, чтобы передать выбранный цвет в родительский компонент
    }
  };
  
  return (
    <FormControl sx={{ width: '100px' }} size="small">
      <InputLabel id="color-label">Цвет</InputLabel>
      <Select
        labelId="color-label"
        id="color-select"
        value={color}
        label="Colors"
        onChange={handleColorChange} // Обработчик onChange с двумя параметрами
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {colors.map((color) => (
          <MenuItem key={color} value={color}>
            {color}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectColors;