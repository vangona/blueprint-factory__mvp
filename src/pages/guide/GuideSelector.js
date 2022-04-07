import { defaultBtn, defaultBtnAction, defaultContainer, defaultTitle } from 'css/styleConstants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  gap: 10px;
`;

const Title = styled.h1`
  ${defaultTitle};
`;

const Button = styled.button`
  ${defaultBtn};
  ${defaultBtnAction};
  width: 30vw;
`;

const GuideSelector = () => {
  const navigate = useNavigate();

  const onClickFinder = () => {
    navigate('/guide/value');
  }

  const onClickDevider = () => {
    navigate('/');
  }

  return (
    <Container>
      <Title>목표를 어쩌실래요?</Title>
      <Button onClick={onClickFinder}>목표 찾기</Button>
      <Button onClick={onClickDevider}>목표 나누기</Button>
    </Container>
  );
};

export default GuideSelector;