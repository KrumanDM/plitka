import Button from "../components/Button";
import s from "./Recommended.module.css";

const Recommended = (props: { handleClick: (value: string) => void }) => {
  return (
    <>
      <div>
        <h2 className={s.recommendedTitle}>Recommended</h2>
        <div className={s.recommendedFlex}>
          
        <Button onClickHandler={() => props.handleClick("")} value="" title="All Products" />
        <Button onClickHandler={() => props.handleClick("Nike")} value="Nike" title="Nike" />
        <Button onClickHandler={() => props.handleClick("Adidas")} value="Adidas" title="Adidas" />
        <Button onClickHandler={() => props.handleClick("Puma")} value="Puma" title="Puma" />
        <Button onClickHandler={() => props.handleClick("Vans")} value="Vans" title="Vans" />
        </div>
      </div>
    </>
  );
};

export default Recommended;