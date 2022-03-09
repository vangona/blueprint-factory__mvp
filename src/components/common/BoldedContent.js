import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  font-weight: bold;
`;

const BoldedContent = ({ content }) => {
  return (
    <Container>
      { content }
    </Container>
  );
};

export default BoldedContent;