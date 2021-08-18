import React from "react";
import { useTranslation } from "react-i18next";

import "./Home.scss";
import ContentWrapper from "../Molecules/ContentWrapper";
import StoriesCarousel from "../Organisms/StoriesCarousel";
import TrackingRequestForm from "../Organisms/TrackingRequestForm";
import { getStories } from "../../Services/StoriesService";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ContentWrapper>
      <div className="home-content">
        <TrackingRequestForm />
        <StoriesCarousel
          stories={getStories(t)}
          containerClass="show-before-tablet"
        />
      </div>
    </ContentWrapper>
  );
};

export default Home;
