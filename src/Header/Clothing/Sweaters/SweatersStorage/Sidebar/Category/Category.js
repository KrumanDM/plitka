import React, { useState } from "react";
import "./Category.css";
import Input from "../../components/Input.tsx";

export const Category = ({ handleChange }) => {
 const [checked, setChecked] = useState(true);

 const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setChecked(true);
    handleChange(event);
 };

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChecked(false);
    handleChange(event);
 };

 return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input
            onChange={handleRadioChange}
            type="radio"
            value=""
            name="test"
            checked={checked}
          />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleInputChange}
          value="sneakers"
          title="Sneakers"
          name="test"
        />
        <Input
          handleChange={handleInputChange}
          value="flats"
          title="Flats"
          name="test"
        />
        <Input
          handleChange={handleInputChange}
          value="sandals"
          title="Sandals"
          name="test"
        />
        <Input
          handleChange={handleInputChange}
          value="heels"
          title="Heels"
          name="test"
        />
      </div>
    </div>
 );
};

