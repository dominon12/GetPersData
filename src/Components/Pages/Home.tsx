import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

import "./Home.scss";
import ContentWrapper from "../Molecules/ContentWrapper";
import StoriesCarousel from "../Organisms/StoriesCarousel";
import TrackingRequestForm from "../Organisms/TrackingRequestForm";
import { getStories } from "../../Services/StoriesService";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("seo.home.title")}</title>
        <meta name="description" content={t("seo.home.description")} />
      </Helmet>
      <ContentWrapper>
        <div className="home-content">
          <TrackingRequestForm />
          <StoriesCarousel
            stories={getStories(t)}
            containerClass="show-before-tablet"
          />
        </div>
      </ContentWrapper>
    </>
  );
};

export default Home;
