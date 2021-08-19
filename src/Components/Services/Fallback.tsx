import React from "react";

import Title from "../Atoms/Title";
import ContentWrapper from "../Molecules/ContentWrapper";
import Loading from "../Molecules/Loading";

const Fallback: React.FC = () => {
  return (
    <ContentWrapper>
      <div style={{ textAlign: "center" }}>
        <Title>Processing...</Title>
        <Loading />
      </div>
    </ContentWrapper>
  );
};

export default Fallback;
