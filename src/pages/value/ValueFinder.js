import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import valueDB from "assets/db/value/valueDB";
import { defaultContainer } from "css/styleConstants";
import NextBtn from "components/btn/NextBtn";
import PrevBtn from "components/btn/PrevBtn";
import ValueFactory from "components/factory/ValueFactory";

const Container = styled.div`
  ${defaultContainer};
  justify-content: flex-start;
`;

function ValueFinder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [valueArr, setValueArr] = useState([]);

  const onClickResult = () => {
    const answerArr = [...valueArr];
    const answerObj = {
      id,
      question : valueDB[id].revealed,
      answer : value
    }

    const updatedArr = answerArr.filter(answer => answer.id != id);

    updatedArr.push(answerObj);

    localStorage.setItem('blueprint-factory_answer', JSON.stringify(updatedArr));

    navigate(`/value/result/${id}`);
  }
  
  const onClickReturn = () => {
    navigate('/value/selector');
  }

  useEffect(() => {
    if (localStorage.getItem('blueprint-factory_answer')) {
      const answerArr = JSON.parse(localStorage.getItem('blueprint-factory_answer'));
      setValueArr([...answerArr]);
      for (let i = 0; i < answerArr.length; i++) {
        if (answerArr[i].id == id) {
          setValue(answerArr[i].answer);          
        }
      }
    }
  }, [])

  return (
    <Container>
      <ValueFactory id={id} value=
      {value} setValue={setValue} />
      <PrevBtn onClick={onClickReturn} />
      {value && 
        <NextBtn onClick={onClickResult} />
      }
    </Container>
  );
}

export default ValueFinder;
