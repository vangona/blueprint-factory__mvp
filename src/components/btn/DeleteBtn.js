import { defaultBtnAction } from 'css/styleConstants';
import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';

const sizeStyles = css`
  ${(props) =>
    props.size === "large" &&
    css`
      height: 3rem;
      font-size: 2.15rem;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      height: 2.25rem;
      font-size: 1.6rem;
    `}

    ${(props) =>
    props.size === "small" &&
    css`
      height: 1.75rem;
      font-size: 1.25rem;
    `}
`;

const Button = styled.button`
  border: none;
  text-align: center;

  ${defaultBtnAction};
  ${sizeStyles};
`;

const DeleteBtn = ({ removeIndex, arr, setArr, size }) => {
  const onClick = () => {
    let deletedArr = arr.filter((_, index) => {
      return index !== removeIndex;
    });
    setArr(deletedArr);
  }

  return (
    <Button onClick={onClick} size={size}>
      <AiOutlineDelete />
    </Button>
  );
};

export default DeleteBtn;