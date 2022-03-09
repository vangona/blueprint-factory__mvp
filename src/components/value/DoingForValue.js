import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BoldedContent from 'components/common/BoldedContent';
import { defaultContainer } from 'css/styleConstants';
import ValueInput from './common/ValueInput';
import AddBtn from 'components/btn/AddBtn';
import ValueList from './common/ValueList';

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
  const [doing, setDoing] = useState('');

  return (
    <Container>
      <ValueContainer>
        {valueArr.map((value, index) => 
          <ValueContent key={index}>
            <BoldedContent content={value} />
          </ValueContent>
        )}
      </ValueContainer>

      <ValueContainer>
        {needArr.map((need, index) => 
          <ValueContent key={index}>
            <BoldedContent content={need} />
          </ValueContent>
        )}
      </ValueContainer>

      <ValueContext>
        위의 것들을 위해 하고 있는 일이 있으신가요?
      </ValueContext>
      <ValueTitle>
        앞 단계에서 빼먹은 게 있다면 다시 다녀오셔도 괜찮습니다.
      </ValueTitle>

      <WriteBox>
        <ValueInput value={doing} setValue={setDoing} />
        <AddBtn value={doing} setValue={setDoing} arr={doingArr} setArr={setDoingArr} size='small' />
      </WriteBox>

      <ValueList arr={doingArr} setArr={setDoingArr} />
    </Container>
  );
};

export default DoingForValue;