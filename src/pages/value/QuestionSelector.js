import valueDB from 'assets/db/value/valueDB';
import { defaultBtnAction, defaultContainer } from 'css/styleConstants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  ${defaultContainer};
  font-family: SsurroundAir;
  color: var(--main-blue);
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
  ${defaultBtnAction};
`;

const QuestionSelector = () => {
  const navigate = useNavigate();
  
  const onClick = (index) => {
    navigate(`/value/question/${index}`);
  }

  return (
    <Container>
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