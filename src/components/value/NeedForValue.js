import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BoldedContent from 'components/common/BoldedContent';
import { defaultContainer } from 'css/styleConstants';
import ValueInput from './common/ValueInput';
import AddBtn from 'components/btn/AddBtn';
import ValueList from './common/ValueList';
import RightChevron from 'components/btn/RightChevron';
import LeftChevron from 'components/btn/LeftChevron';
import DeepAddBtn from 'components/btn/DeepAddBtn';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  font-family: SsurroundAir;
  line-height: 160%;
  gap: 20px;
  word-break: keep-all;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 80vw;
`;

const ValueTitle = styled.h1``;

const ValueContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ValueContext = styled.div`
  white-space: pre-line;
  max-width: 80vw;
`;

const ValueQuestion = styled.h1`
  max-width: 80vw;
  white-space: pre-line;
`;

const WriteBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const NeedForValue = ({ valueArr, setValueArr, needArr, setNeedArr }) => {
  const [wordPage, setWordPage] = useState(0);
  const [need, setNeed] = useState('');

  const onClickRight = () => {
    setWordPage(wordPage + 1);
  }

  const onClickLeft = () => {
    setWordPage(wordPage - 1);
  }

  return (
    <Container>
      <ValueContainer>
        <ValueTitle>
          가치관
        </ValueTitle>
        <ValueContent>
          <LeftChevron 
            onClick={wordPage > 0 ? onClickLeft : null} 
            style={{ 'size' : '1.2rem', 
            'color' : wordPage > 0 
              ? 'var(--main-blue)' 
              : 'transparent' }} 
          /> 
          <BoldedContent content={ wordPage < valueArr.length 
          ? valueArr[wordPage]
          : null } />
          <RightChevron 
            onClick={wordPage < valueArr.length - 1 ? onClickRight : null} 
            style={{ 'size' : '1.2rem', 
            'color' : wordPage < valueArr.length - 1
              ? 'var(--main-blue)' 
              : 'transparent' }} 
          />
        </ValueContent> 
      </ValueContainer>

      <ValueContext>
        이제 다시 당신에게로 돌아와볼까요?
      </ValueContext>
      <ValueQuestion>
        <BoldedContent content={valueArr[wordPage]} />을(를) 위해 <BoldedContent content='당신에게 필요한 것' />은 무엇이신가요?
      </ValueQuestion>
      <ValueQuestion>
        모르시겠다면, 다음 단계로 넘어가보셔도 좋습니다.
      </ValueQuestion>

      <WriteBox>
        <ValueInput value={need} setValue={setNeed} />
        <DeepAddBtn value={need} setValue={setNeed} arr={needArr} setArr={setNeedArr} index={wordPage} size='small' />
      </WriteBox>

      <ValueList arr={needArr} setArr={setNeedArr} />
    </Container>
  );
};

export default NeedForValue;