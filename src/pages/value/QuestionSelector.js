import valueDB from 'assets/db/value/valueDB';
import { defaultBtnAction, defaultContainer } from 'css/styleConstants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  font-family: SsurroundAir;
  color: var(--main-blue);
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const QuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const QuestionItem = styled.li`
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 10px;
  width: 60vw;
  max-width: 300px;
  ${defaultBtnAction};
`;

const QuestionSelector = () => {
  const navigate = useNavigate();
  
  const onClick = (index) => {
    navigate(`/value/question/${index}`);
  }

  return (
    <Container>
      <Title>
        맘에 드는 질문을 골라주세요.
      </Title>
      <QuestionList>
        {valueDB.map((value, index) => 
          <QuestionItem key={index} onClick={() => {onClick(index)}} >
            {value.title}
          </QuestionItem>
        )}
      </QuestionList>
    </Container>
  );
};

export default QuestionSelector;