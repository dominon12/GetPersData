import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./StoriesCarousel.scss";
import { Story as IStory } from "../../Types/Types";
import Story from "../Molecules/Story";

interface Props {
  stories: IStory[];
  containerClass?: string;
}

const StoriesCarousel: React.FC<Props> = ({ stories, containerClass }) => {
  const sliderResponsiveOptions = {
    default: {
      breakpoint: { max: Infinity, min: -Infinity },
      items: 1,
    },
  };

  const renderStories = () =>
    stories.map((story) => <Story key={story.id} story={story} />);

  return (
    <Carousel
      responsive={sliderResponsiveOptions}
      transitionDuration={500}
      autoPlaySpeed={5000}
      containerClass={`stories-carousel ${containerClass}`}
      itemClass="stories-carousel__item"
      swipeable
      draggable
      autoPlay
      keyBoardControl
      arrows={false}
    >
      {stories.length ? renderStories() : "No stories were passed"}
    </Carousel>
  );
};

export default StoriesCarousel;
