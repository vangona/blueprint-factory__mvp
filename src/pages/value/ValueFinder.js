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
`;

function ValueFinder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [valueArr, setValueArr] = useState(Array.from({ length : valueDB.length }, () => ''));

  const onClickResult = () => {
    const answerArr = [...valueArr];
    answerArr[id] = {
      'question' : valueDB[id].revealed,
      'answer' : value
    }

    localStorage.setItem('blueprint-factory_answer', JSON.stringify(answerArr));

    navigate(`/value/result/${id}`);
  }
  
  const onClickReturn = () => {
    navigate('/guide/value');
  }

  useEffect(() => {
    if (localStorage.getItem('blueprint-factory_answer')) {
      const answerArr = JSON.parse(localStorage.getItem('blueprint-factory_answer'));
      setValueArr([...answerArr]);
      if (answerArr[id]) {
        setValue(answerArr[id].answer);  
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
