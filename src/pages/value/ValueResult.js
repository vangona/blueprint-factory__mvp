import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";
import NextBtn from 'components/btn/NextBtn';
import Loading from 'components/loading/Loading';
import { defaultContainer } from 'css/styleConstants';
import ValueReminder from 'components/value/ValueReminder';
import PrevBtn from 'components/btn/PrevBtn';
import NeedForValue from 'components/value/NeedForValue';
import DoingForValue from 'components/value/DoingForValue';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  font-family: SsurroundAir;
  line-height: 160%;
  gap: 10px;
`;

const SubmitBtn = styled.button`
  padding: 10px 20px;
  background-color: white;
  color: var(--main-blue);
  border-radius: 20px;
`;

const ValueResult = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isLoading, SetIsLoading] = useState(true);
  const [valueArr, setValueArr] = useState([]);
  const [needArr, setNeedArr] = useState([]);
  const [doingArr, setDoingArr] = useState([]);

  const PAGE_LENGTH = 3;

  const onSubmit = () => {
    const targetObjArr = [];

    valueArr.forEach(value => {
      const id = uuidv4();
      const valueObj = {
        id,
        name : value,
        description : '',
        needs : '',
        innerDesire : '',
        deadline : '',
        prize : '',
        type : 'value',
        modified_dttm : '',
        registered_dttm : Date.now(),
        cancel_reason : '',
        difficulty : '',
        complished_feeling : '',
        complished_reason : '',
      }

      targetObjArr.push(valueObj);
    });

    needArr.forEach(need => {
      const id = uuidv4();
      const needObj = {
        id,
        name : need,
        description : '',
        needs : '',
        innerDesire : '',
        deadline : '',
        prize : '',
        type : 'incomplete',
        modified_dttm : '',
        registered_dttm : Date.now(),
        cancel_reason : '',
        difficulty : '',
        complished_feeling : '',
        complished_reason : '',
      }

      targetObjArr.push(needObj);
    });

    doingArr.forEach(doing => {
      const id = uuidv4();
      const doingObj = {
        id,
        name : doing,
        description : '',
        needs : '',
        innerDesire : '',
        deadline : '',
        prize : '',
        type : 'incomplete',
        modified_dttm : '',
        registered_dttm : Date.now(),
        cancel_reason : '',
        difficulty : '',
        complished_feeling : '',
        complished_reason : '',
      }

      targetObjArr.push(doingObj);
    });

    localStorage.setItem('blueprint-factory_target', JSON.stringify(targetObjArr));
    navigate('/blueprint');
  }

  const onClickNext = () => {
    setPage(page + 1);
  }

  const onClickPrev = () => {
    setPage(page - 1);
  }

  useEffect(() => {
    setTimeout(() => {
      SetIsLoading(false);
    });
  }, [isLoading]);

  return (
    <>
      {isLoading 
        ? <Loading />
        :       
        <Container>
          { page === 0 && 
            <ValueReminder valueArr={valueArr} setValueArr={setValueArr} /> 
          }
          { page === 1 &&
            <NeedForValue valueArr={valueArr} setValueArr={setValueArr} needArr={needArr} setNeedArr={setNeedArr} />
          }
          { page === 2 && 
            <DoingForValue valueArr={valueArr} setValueArr={setValueArr} needArr={needArr} setNeedArr={setNeedArr} doingArr={doingArr} setDoingArr={setDoingArr} />
          }

          { page === PAGE_LENGTH - 1 && 
            <SubmitBtn onClick={onSubmit}>청사진 그리기</SubmitBtn> 
          }
          
          { page > 0 && <PrevBtn onClick={onClickPrev} /> }
          { page < PAGE_LENGTH - 1 && <NextBtn onClick={onClickNext} /> }
        </Container>
      }
    </>
  );
};

export default ValueResult;