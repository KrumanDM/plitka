
import react, { ChangeEvent, FC } from "react";

type InputPropsType = {
  handleChange: (event:ChangeEvent<HTMLInputElement>) => void,
  value: string,
  title: string,
  name: string,
  color: string,
}


const Input: FC<InputPropsType> =({ handleChange, value, title, name, color }) => {
  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="radio" value={value} name={name} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default Input;
