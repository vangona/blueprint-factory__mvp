import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BoldedContent from 'components/common/BoldedContent';
import personaDB from 'assets/db/value/personaDB';
import { defaultContainer } from 'css/styleConstants';
import ValueList from './common/ValueList';
import AddBtn from 'components/btn/AddBtn';
import ValueInput from './common/ValueInput';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  font-family: SsurroundAir;
  line-height: 160%;
  gap: 20px;
  word-break: keep-all;
`;

const AnswerContainer = styled.div`
  max-width: 80vw;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnsweredQuestion = styled.div`
  white-space: pre-line;
  margin-right: 10px;
`;

const AnsweredContent = styled.div`
  font-family: Ssurround;
`;

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

const ValueReminder = ({ valueArr, setValueArr }) => {
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState([]);
  const [persona, setPersona] = useState('');

  const loadAnswer = () => {
    const savedArr = JSON.parse(localStorage.getItem('blueprint-factory_answer'));
    for (let i = 0; i < savedArr.length; i++) {
      if (savedArr[i].id === id) {
        setAnswer(savedArr[i]);
      }
    }
  }

  const loadPersona = () => {
    const randNum = Math.floor(Math.random() * personaDB.length);
    setPersona(personaDB[randNum]);
  }

  useEffect(() => {
    loadAnswer();
    loadPersona();
  }, []);

  return (
    <Container>
      <AnswerContainer>
        <AnswerBox>
          <AnsweredQuestion>
            {answer && answer.question}
          </AnsweredQuestion>
          <AnsweredContent>
            {answer && answer.answer}
          </AnsweredContent>
        </AnswerBox>
      </AnswerContainer>

      <ValueContext>
        위의 대답이 <BoldedContent content={persona.address} />에 사시는 {'\n'}
        <BoldedContent content={persona.name} />씨의 대답이라고 생각한다면
      </ValueContext>
      <ValueTitle>
        <BoldedContent content={persona.name} />씨가 <BoldedContent content='지금' /> 소중하게 생각하시는 것은 무엇일까요?
      </ValueTitle>

      <WriteBox>
        <ValueInput value={value} setValue={setValue} />
        <AddBtn value={value} arr={valueArr} setValue={setValue} setArr={setValueArr} size='small' />
      </WriteBox>

      <ValueList arr={valueArr} setArr={setValueArr} />
    </Container>
  );
};

export default ValueReminder;