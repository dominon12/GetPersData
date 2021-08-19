import React from "react";
import * as reactSpinners from "react-spinners";

import "./Loading.scss";

const LOADERS = Object.values(reactSpinners);

const Loading: React.FC = () => {
  const RandomLoader: any = LOADERS[Math.floor(Math.random() * LOADERS.length)];

  return (
    <div className="loading">
      <RandomLoader color={"rgb(58, 82, 226)"} loading={true} />
    </div>
  );
};

export default Loading;
