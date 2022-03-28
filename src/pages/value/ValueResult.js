import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  min-height: 300px;
`;

const SubmitBtn = styled.button`
  padding: 10px 20px;
  background-color: white;
  color: var(--main-blue);
  border-radius: 20px;
`;

const ValueResult = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [isLoading, SetIsLoading] = useState(true);
  const [localstorageArr, setLocalstorageArr] = useState([]);
  const [valueArr, setValueArr] = useState([]);
  const [needArr, setNeedArr] = useState([]);
  const [doingArr, setDoingArr] = useState([]);

  const PAGE_LENGTH = 3;

  const targetObjArr = [];
  const saveValueArr = () => {
    valueArr.forEach((value, index) => {
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
        parents : [],
        modified_dttm : '',
        registered_dttm : Date.now(),
        cancel_reason : '',
        difficulty : '',
        complished_feeling : '',
        complished_reason : '',
      }

      saveNeedArr(index, id);
      saveDoingArr(index, id);
      targetObjArr.push(valueObj);
    });
  }

  const saveNeedArr = (index, parentId) => {
    needArr[index].forEach(need => {
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
        parents : [parentId],
        modified_dttm : '',
        registered_dttm : Date.now(),
        cancel_reason : '',
        difficulty : '',
        complished_feeling : '',
        complished_reason : '',
      }

      targetObjArr.push(needObj);
    });
  }

  const saveDoingArr = (index, parentId) => {
    doingArr[index].forEach(doing => {
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
        parents : [parentId],
        modified_dttm : '',
        registered_dttm : Date.now(),
        cancel_reason : '',
        difficulty : '',
        complished_feeling : '',
        complished_reason : '',
      }

      targetObjArr.push(doingObj);
    });
  }

  const onSubmit = () => {
    saveValueArr();
    localStorage.setItem('blueprint-factory_target', JSON.stringify(targetObjArr));

    const updatedArr = localstorageArr.filter(answer => answer.id != id);

    const saveObj = {
      id,
      valueArr,
      needArr,
      doingArr
    }

    updatedArr.push(saveObj);

    localStorage.setItem('blueprint-factory_value', JSON.stringify(updatedArr));

    navigate('/blueprint')
  }

  const onClickNext = () => {
    setPage(page + 1);
  }

  const onClickReturn = () => {
    navigate(`/value/question/${id}`)
  }

  const onClickPrev = () => {
    setPage(page - 1);
  }

  const getAnswers = () => {
    if (localStorage.getItem('blueprint-factory_value')) {
      const data = JSON.parse(localStorage.getItem('blueprint-factory_value'));
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          setValueArr(data[i].valueArr);
          setNeedArr(data[i].needArr);
          setDoingArr(data[i].doingArr);
        }
      }
      setLocalstorageArr(data);
    }
  }

  useEffect(() => {
    getAnswers();
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
            <ValueReminder id={id} valueArr={valueArr} setValueArr={setValueArr} /> 
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
          
          <PrevBtn onClick={page > 0 ? onClickPrev : onClickReturn} />
          { page < PAGE_LENGTH - 1 && <NextBtn onClick={onClickNext} /> }
        </Container>
      }
    </>
  );
};

export default ValueResult;