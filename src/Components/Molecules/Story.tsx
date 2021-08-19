import React from "react";

import "./Story.scss";
import { Story as IStory } from "../../Types/Types";

interface Props {
  story: IStory;
}

const Story: React.FC<Props> = ({ story }) => {
  return (
    <div
      className="story"
      style={{
        backgroundImage: `url(${story.backgroundSrc})`,
      }}
    >
      <p className="story__text">{story.text}</p>
    </div>
  );
};

export default Story;
