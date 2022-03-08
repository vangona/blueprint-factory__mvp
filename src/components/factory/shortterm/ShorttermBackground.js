import React from "react";
import styled from "styled-components";
import { defaultContainer } from "css/styleConstants";
import cloud from "assets/img/background/top-cloud.png";

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 9;
`;

const Cloud = styled.img`
  position: fixed;
  top: 0;
  width: 100%;
  max-height: 20%;
`;

function ShorttermBackground() {
  return (
    <Container>
      <Cloud src={cloud} />
    </Container>
  );
}

export default ShorttermBackground;
