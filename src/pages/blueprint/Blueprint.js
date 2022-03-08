import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from 'css/styleConstants';
import BlueprintMindmap from 'components/mindmap/BlueprintMindmap';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  align-items: center;
`;

const Blueprint = () => {
  return (
    <Container>
      <BlueprintMindmap />
    </Container>
  );
};

export default Blueprint;