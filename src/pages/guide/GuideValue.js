import React, { useState } from 'react';
import styled from 'styled-components';
import NextBtn from 'components/btn/NextBtn';
import { defaultContainer } from 'css/styleConstants';
import PrevBtn from 'components/btn/PrevBtn';
import { useNavigate } from 'react-router-dom';
import { valueGuide } from 'assets/db/value/guideDB';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
`;

const Comment = styled.div`
  font-family: SsurroundAir;
  width: 80%;
  word-break: keep-all;
  white-space: pre-line;
  line-height: 160%;
`;

const GuideValue = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const onClickNext = () => {
    setPage(page + 1);
  }

  const onClickPrev = () => {
    setPage(page - 1);
  }

  const onClickReturn = () => {
    navigate('/guide/main');
  }

  const onClickNavigate = () => {
    navigate('/value/finder');
  }

  return (
    <Container>
      <Comment>
        {valueGuide[page]}
      </Comment>
      {page > 0 
        ? <PrevBtn onClick={onClickPrev} /> 
        : <PrevBtn onClick={onClickReturn} />
      }
      {page < valueGuide.length - 1 
        ? <NextBtn onClick={onClickNext} /> 
        : <NextBtn onClick={onClickNavigate} />
      }
    </Container>
  );
};

export default GuideValue;