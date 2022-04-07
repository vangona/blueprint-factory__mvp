import React, { useEffect, useState } from 'react';
import { defaultBtnAction, defaultContainer } from 'css/styleConstants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainGuide } from 'assets/db/value/guideDB';
import NextBtn from 'components/btn/NextBtn';
import PrevBtn from 'components/btn/PrevBtn';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
`;

const GuideImg = styled.img`
  width: 80vw;
  height: 80vw;
`;

const Comment = styled.div`
  text-align: center;
  white-space: pre-line;
  line-height: 160%;
  font-family: SsurroundAir;
`;

const FindValueBtn = styled.button`
  font-family: Ssurround;
  padding: 10px 20px;
  background-color: white;
  color: var(--main-blue);
  border-radius: 20px;
  bottom: 10vh;
  ${defaultBtnAction};
`;

const GuideMain = () => {
  const [GuideImgSrc, setGuideImgSrc] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const onClickFinder = () => {
    navigate('/guide/value');
  }

  const onClickDevider = () => {
    navigate('/');
  }

  const onClickNext = () => {
    setPage(page + 1);
  }

  const onClickPrev = () => {
    setPage(page - 1);
  }
  
  useEffect(() => {
    setPage(0);
    setGuideImgSrc(mainGuide[0].imgSrc);
  }, []);

  return (
    <Container>
      <GuideImg src={GuideImgSrc} alt='' />
      <Comment>
        {mainGuide[page].comment}
      </Comment>
      {page !== 0 && <PrevBtn onClick={onClickPrev} />}
      {page < mainGuide.length - 1 && <NextBtn onClick={onClickNext} />}
      {page === mainGuide.length - 1 && 
      <>
        <FindValueBtn onClick={onClickFinder} >
          잊었던 목표 찾으러가기
        </FindValueBtn>
        <FindValueBtn onClick={onClickDevider} >
          가지고 있는 목표 나누러가기
        </FindValueBtn>
      </>
      }
    </Container>
  );
};

export default GuideMain;