import React from 'react';
import styled from 'styled-components';
import {FaChevronRight} from 'react-icons/fa';
import { defaultBtnAction } from 'css/styleConstants';

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: var(--main-blue);
  ${defaultBtnAction};
`;

const RightChevron = ({ onClick, style }) => {
  return (
    <Button onClick={onClick}>
      <FaChevronRight style={style} />
    </Button>
  );
};

export default RightChevron;