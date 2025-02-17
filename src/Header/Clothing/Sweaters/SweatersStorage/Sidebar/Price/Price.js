import Input from "../../components/Input.tsx";
import "./Price.css";
import { useState } from "react";

const Price = ({ handleChange }) => {
 const [selectedPrice, setSelectedPrice] = useState("");

 const handleInputChange = (event) => {
   const { name, value } = event.target;
   setSelectedPrice(value);
   handleChange(event);
 };

 return (
   <>
     <div className="ml">
       <h2 className="sidebar-title price-title">Price</h2>

       <label className="sidebar-label-container">
         <input
           onChange={handleInputChange}
           type="radio"
           value=""
           name="test2"
           checked={selectedPrice === ""}
         />
         <span className="checkmark"></span>All
       </label>

       <Input
         handleChange={handleInputChange}
         value={50}
         title="$0-50"
         name="test2"
         checked={selectedPrice === "50"}
       />

       <Input
         handleChange={handleInputChange}
         value={100}
         title="$50-$100"
         name="test2"
         checked={selectedPrice === "100"}
       />

       <Input
         handleChange={handleInputChange}
         value={150}
         title="$100-$150"
         name="test2"
         checked={selectedPrice === "150"}
       />

       <Input
         handleChange={handleInputChange}
         value={200}
         title="Over $150"
         name="test2"
         checked={selectedPrice === "200"}
       />
     </div>
   </>
 );
};

export default Price;