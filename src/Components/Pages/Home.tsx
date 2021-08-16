import React from "react";

import "./Home.scss";
import ContentWrapper from "../Molecules/ContentWrapper";
import ImageSlider from "../Organisms/ImageSlider";
import TrackingRequestForm from "../Organisms/TrackingRequestForm";
import { SliderImage } from "../../Types/Types";

const Home: React.FC = () => {
  // TODO: change stock photos to photo instruction with explanations
  const sliderImages: SliderImage[] = [
    {
      src: "https://enriqueruiz.es/wp-content/2019/09/tracking-web-mautic.png",
      alt: "Step #1",
    },
    {
      src: "https://static.matomo.org/wp-content/uploads/2020/02/campaign-tracking-web-ready-1.png",
      alt: "Step #2",
    },
    {
      src: "https://cdn.cliqz.com/wp-content/uploads/2020/04/cliqz_corona_app_1600X1000-uai-1440x900.jpg",
      alt: "Step #3",
    },
  ];

  return (
    <ContentWrapper>
      <div className="home-content">
        <TrackingRequestForm />
        <ImageSlider images={sliderImages} />
      </div>
    </ContentWrapper>
  );
};

export default Home;
