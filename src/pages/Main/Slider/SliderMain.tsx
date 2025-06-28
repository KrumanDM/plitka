import React from 'react';
import Slider from 'react-slick';
import s from './Slider.module.css'
import mainPhoto1 from '../../../assets/images/mainPhoto1.webp'
import mainPhoto2 from '../../../assets/images/mainPhoto2.jpg'
import mainPhoto3 from '../../../assets/images/mainPhoto3.jpeg'


export const SliderMain = () =>{
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className={s.sliderContainer}>
    <Slider {...settings}>
      <div style={{ marginRight: 0 }}>
      
        <img src={mainPhoto1} alt='slide-1'/>
      </div>
      <div style={{ marginRight: 0 }}>
        <img src={mainPhoto2} alt='slide-2'/>
      </div>
      <div style={{ marginRight: 0 }}>
        <img src={mainPhoto3} alt='slide-3'/>
      </div>
    </Slider>
    <div className={s.hello}></div>
    </div>
  );
}