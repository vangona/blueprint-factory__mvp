import React from 'react';
import styled from 'styled-components';
import {FaChevronLeft} from 'react-icons/fa';
import { defaultBtnAction } from 'css/styleConstants';

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: var(--main-blue);
  ${defaultBtnAction};
`;

const LeftChevron = ({ onClick, style }) => {
  return (
    <Button onClick={onClick}>
      <FaChevronLeft style={style} />
    </Button>
  );
};

export default LeftChevron;