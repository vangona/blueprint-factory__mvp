import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BoldedContent from 'components/common/BoldedContent';
import { defaultContainer } from 'css/styleConstants';
import ValueInput from './common/ValueInput';
import ValueList from './common/ValueList';
import LeftChevron from 'components/btn/LeftChevron';
import RightChevron from 'components/btn/RightChevron';
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
  max-width: 80vw;
`;

const ValueContent = styled.div``;

const ValueContext = styled.div`
  white-space: pre-line;
  max-width: 80vw;
`;

const ValueTitle = styled.h1`
  max-width: 80vw;
  white-space: pre-line;
`;

const WriteBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const DoingForValue = ({ valueArr, setValueArr, needArr, setNeedArr, doingArr, setDoingArr }) => {
  const [wordPage, setWordPage] = useState(0);
  const [doing, setDoing] = useState('');

  const onClickRight = () => {
    setWordPage(wordPage + 1);
  }

  const onClickLeft = () => {
    setWordPage(wordPage - 1);
  }

  useEffect(() => {
    if (!Array.isArray(doingArr[0])) {
      setDoingArr(Array.from({ length: valueArr.length }, () => []));
    }
  }, []);

  return (
    <Container>
      <ValueContainer>
        <ValueContent>
        <LeftChevron 
            onClick={wordPage > 0 ? onClickLeft : null} 
            style={{ 'size' : '1.2rem', 
            'color' : wordPage > 0 
              ? 'var(--main-blue)' 
              : 'transparent' }} 
          /> 
          <BoldedContent content={valueArr[wordPage]} />
          <RightChevron 
            onClick={wordPage < valueArr.length - 1 ? onClickRight : null} 
            style={{ 'size' : '1.2rem', 
            'color' : wordPage < valueArr.length - 1
              ? 'var(--main-blue)' 
              : 'transparent' }} 
          />
        </ValueContent>
      </ValueContainer>

      <ValueContainer>
        {needArr[wordPage].map((need, index) =>   
          <ValueContent key={index}>
            <BoldedContent content={need} />
          </ValueContent>
        )}
      </ValueContainer>

      <ValueContext>
        {valueArr[wordPage]}을(를) 위해 하고 있는 일이 있으신가요?
      </ValueContext>
      <ValueTitle>
        앞 단계에서 빼먹은 게 있다면 다시 다녀오셔도 괜찮습니다.
      </ValueTitle>

      <WriteBox>
        <ValueInput value={doing} setValue={setDoing} />
        <DeepAddBtn value={doing} setValue={setDoing} arr={doingArr} setArr={setDoingArr} index={wordPage} size='small' />
      </WriteBox>

      <ValueList arr={Array.isArray(doingArr[0]) 
        ? doingArr[wordPage]
        : doingArr
      } setArr={setDoingArr} />
    </Container>
  );
};

export default DoingForValue;