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

const NeedForValue = ({ valueArr, setValueArr, needArr, setNeedArr }) => {
  const [need, setNeed] = useState('');

  return (
    <Container>
      <ValueContainer>
        {valueArr.map((value, index) => 
          <ValueContent key={index}>
            <BoldedContent content={value} />
          </ValueContent>
        )}
      </ValueContainer>

      <ValueContext>
        이제 다시 당신에게로 돌아와볼까요?
      </ValueContext>
      <ValueTitle>
        위의 것들을 위해 <BoldedContent content='필요한 것' />은 무엇이신가요?
      </ValueTitle>
      <ValueTitle>
        모르시겠다면, 다음 단계로 넘어가보셔도 좋습니다.
      </ValueTitle>

      <WriteBox>
        <ValueInput value={need} setValue={setNeed} />
        <AddBtn value={need} setValue={setNeed} arr={needArr} setArr={setNeedArr} size='small' />
      </WriteBox>

      <ValueList arr={needArr} setArr={setNeedArr} />
    </Container>
  );
};

export default NeedForValue;