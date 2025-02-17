import React from 'react';
import Slider from 'react-slick';
import s from './Slider.module.css'


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
      
        <img src='https://place.tv/wp-content/uploads/2016/10/msm-wallpaper-027_1920x1200.jpg?x17105' alt='slide-1' />
      </div>
      <div style={{ marginRight: 0 }}>
        <img src='https://www.teahub.io/photos/full/217-2178040_thrasher-skateboarding-black-and-white.jpg' alt='slide-2' />
      </div>
      <div style={{ marginRight: 0 }}>
        <img src='https://images2.alphacoders.com/255/255812.jpg' alt='slide-3' />
      </div>
    </Slider>
    <div className={s.hello}></div>
    </div>
  );
}