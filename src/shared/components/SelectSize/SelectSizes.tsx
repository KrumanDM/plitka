import { FC } from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Checkbox, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSizes } from "../../../store/sizeSlice";
import { RootState } from "../../../store/store";

type SizePropsType = {
  sizes: string[];
}

const SelectSizes: FC<SizePropsType> = ({ sizes }) => {
  const dispatch = useDispatch();
  const activeSizes = useSelector((state: RootState) => state.size.activeSizes) as string[];
  const handleSizeChange = (event: SelectChangeEvent<string[]>, child: React.ReactNode) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setActiveSizes(
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  return (
    <FormControl sx={{ width: '100px' }} size="small">
      <InputLabel id="size-label">Размер</InputLabel>
      <Select<string[]>
        labelId="size-label"
        id="size-select"
        multiple
        value={activeSizes}
        label="Размер"
        onChange={handleSizeChange}
        renderValue={(selected) => selected.join(', ')}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            <Checkbox checked={activeSizes.includes(size)} />
            <ListItemText primary={size} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSizes;