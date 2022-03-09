import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import styled from "styled-components";
import { defaultBtnAction } from "../../css/styleConstants";

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 50;
  bottom: 1.2rem;
  right: 1.2rem;

  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  
  border: none;
  border-radius: 50%;

  background-color: var(--main-blue);
  ${defaultBtnAction};
`;

function NextBtn({ onClick, arg }) {
  return (
    <Btn onClick={() => onClick(arg)}>
      <IoMdArrowRoundForward style={{ fill: "white" }} />
    </Btn>
  );
}

export default NextBtn;
