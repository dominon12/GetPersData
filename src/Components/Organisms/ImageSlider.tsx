import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./ImageSlider.scss";
import { SliderImage } from "../../Types/Types";

interface Props {
  images: SliderImage[];
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const renderImages = () =>
    images.map((image) => (
      <img className="image-slider__image" src={image.src} alt={image.alt} />
    ));

  const sliderResponsiveOptions = {
    default: {
      breakpoint: { max: Infinity, min: -Infinity },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={sliderResponsiveOptions}
      transitionDuration={100}
      autoPlaySpeed={5000}
      containerClass="image-slider"
      itemClass="image-slider__item"
      swipeable
      draggable
      autoPlay
      keyBoardControl
    >
      {images.length ? renderImages() : "No images were passed"}
    </Carousel>
  );
};

export default ImageSlider;
