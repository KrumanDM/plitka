import react from "react";
import s from "./Main.module.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../assets/images/photo4.jpg";
import img2 from "../assets/images/photo1.jpg";
import img3 from "../assets/images/photo2.jpg";

export const Main = () => {
  return (
    <div className={s.mainContainer}>
      <SimpleSlider />
    </div>
  );
};
export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={s.sliderContainer}>
      <Slider {...settings}>
        <div>
          <a
            href={
              "https://www.instagram.com/plitka_dest.crew?igsh=MXA2cTd0ejdvdzFlaA=="
            }
          >
            <img src={img1} alt=""></img>
          </a>
        </div>
        <div>
          <a
            href={
              "https://www.instagram.com/plitka_dest.crew?igsh=MXA2cTd0ejdvdzFlaA=="
            }
          >
            <img src={img2} alt=""></img>
          </a>
        </div>
        <div>
          <a
            href={
              "https://www.instagram.com/plitka_dest.crew?igsh=MXA2cTd0ejdvdzFlaA=="
            }
          >
            <img src={img1} alt=""></img>
          </a>
        </div>
      </Slider>
    </div>
  );
}
