import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s from './Main.module.css'
import { SliderMain } from "./Slider/SliderMain";


export const Main = () => {
  return (
    <div className={s.main}>
      <SliderMain/>
    </div>
  );
};
