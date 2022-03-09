import { defaultBtnAction } from 'css/styleConstants';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

const sizeStyles = css`
  ${(props) =>
    props.size === "large" &&
    css`
      width: 3rem;
      height: 3rem;
      font-size: 2.15rem;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 2.25rem;
      height: 2.25rem;
      font-size: 1.6rem;
    `}

    ${(props) =>
    props.size === "small" &&
    css`
      width: 1.75rem;
      height: 1.75rem;
      font-size: 1.25rem;
    `}
`;

const Button = styled.button`
  border: none;
  border-radius: 50%;
  background-color: var(--main-blue);
  color: var(--main-white);
  justify-content: center;
  align-items: center;

  ${defaultBtnAction};
  ${sizeStyles};
`;

const DeepAddBtn = ({ value, arr, setValue, setArr, size, index }) => {
  const onClick = () => {
    if (value) {
      const addedArr = [...arr];
      addedArr.push(value);
      setArr(addedArr);
      setValue('');  
    }
  }

  useEffect(() => {
  }, [])

  return (
    <Button onClick={onClick} size={size}>
      +
    </Button>
  );
};

export default DeepAddBtn;