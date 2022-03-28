import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { RiArrowGoBackLine } from "react-icons/ri";
import { 
  IoMdArrowRoundBack, 
  IoMdArrowRoundForward 
} from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { defaultBtnAction, defaultContainer } from "css/styleConstants";
import BackgroundTopCloud from "components/background/BackgroundTopCloud";
import BackgroundBottomCloud from "components/background/BackgroundBottomCloud";
import LongtermParent from "components/factory/longterm/LongtermParent";
import LongtermName from "components/factory/longterm/LongtermName";
import LongtermDesire from "components/factory/longterm/LongtermDesire";
import LongtermNeed from "components/factory/longterm/LongtermNeed";
import LongtermDeadline from "components/factory/longterm/LongtermDeadline";
import LongtermCheck from "components/factory/longterm/LongtermCheck";
import LongtermSimple from "components/factory/longterm/LongtermSimple";
import updateTarget from "components/function/updateTarget";
import saveTarget from "components/function/saveTarget";
import addChild from "components/function/addChild";

const Container = styled.div`
  ${defaultContainer}
`;

const SimpleBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  transform: scaleY(-1);
  :hover {
    cursor: pointer;
  }
  :active {
    transform: scaleY(-1) scale(0.98);
  }
`;

const ReturnBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  transform: scaleY(-1);
  :hover {
    cursor: pointer;
  }
  :active {
    transform: scaleY(-1) scale(0.98);
  }
`;

const PageBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 50;
  background-color: #3f5dac;
  border: none;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  ${defaultBtnAction};
`;

const SubmitBtn = styled.input`
  display: flex;
  font-family: SSurroundAir;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  z-index: 10;
  background-color: #3f5dac;
  border: none;
  border-radius: 20px;
  width: auto;
  padding: 10px 15px;
  color: white;
  box-sizing: border-box;
  font-size: 20px;
  ${defaultBtnAction};
`;

function LongtermFactory({ userObj, parent }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [isSimple, setIsSimple] = useState(false);
  const [name, setName] = useState("");
  const [desire, setDesire] = useState("");
  const [explain, setExplain] = useState("");
  const [deadline, setDeadline] = useState("");
  const [need, setNeed] = useState("");
  const [needArr, setNeedArr] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isInComplete, setIsInComplete] = useState(false);

  const onSubmit = async (e) => {
    const targetId = uuidv4();
    const childIds = [];
    needArr.forEach(async (need) => {
      const childId = uuidv4();
      childIds.push(childId);
      await makeChild(need, childId, isInComplete ? parent.id : targetId);
    });

    const targetObj = {
      id : targetId,
      name : name,
      description : explain,
      needs : needArr,
      innerDesire : desire,
      deadline : deadline,
      prize : '',
      type : 'longterm',
      parents : [parent.id],
      modified_dttm : '',
      registered_dttm : Date.now(),
      cancel_reason : '',
      difficulty : '',
      complished_feeling : '',
      complished_reason : '',
    }

    if (isInComplete) {
      await updateTarget(parent.id, targetObj)            
        .then(() => {
          console.log("success");
          alert("큰 구름이 하나 만들어졌어요!");
          navigate("/blueprint");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await saveTarget(targetId, targetObj)
        .then(async () => {
          await addChild(parent.id, targetId)
            .then(() => {
              console.log("success");
              alert("큰 구름이 하나 만들어졌어요!");
              navigate("/blueprint");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }).catch((error) => {
          console.log(error.message);
        });
    }
  };

  const makeChild = async (need, childId, parentId) => {
    const childObj = {
      id : childId,
      name : need,
      description : '',
      needs : [],
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

    saveTarget(childId, childObj);
  };

  const onClickPlus = (value) => {
    if (value !== "") {
      const needArray = [...needArr];
      needArray.push(value);
      setNeed("");
      setNeedArr(needArray);
    }
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    const clickedIndex = e.target.parentNode.id;
    const filtered = needArr.filter(
      (el, index) => index !== parseInt(clickedIndex)
    );
    setNeedArr(filtered);
  };

  const onClickReturn = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onClickPrev = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  const onClickNext = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const getName = (value) => {
    setName(value);
  };

  const getDesire = (value) => {
    setDesire(value);
  };

  const getNeed = (value) => {
    setNeed(value);
  };

  const getDeadline = (value) => {
    setDeadline(value);
  };

  const getExplain = (value) => {
    setExplain(value);
  };

  const getIsPrivate = (value) => {
    setIsPrivate(value);
  };

  useEffect(() => {
    if (parent.type === "incomplete") {
      setIsInComplete(true);
      setName(parent.name);
      setPage(3);
    }
  }, []);

  return (
    <Container>
      <SimpleBtn onClick={() => setIsSimple(!isSimple)}>
        <FaExchangeAlt />
      </SimpleBtn>
      <ReturnBtn onClick={onClickReturn}>
        <RiArrowGoBackLine />
      </ReturnBtn>
      {isSimple ? (
        <LongtermSimple
          name={name}
          getName={getName}
          desire={desire}
          getDesire={getDesire}
          explain={explain}
          getExplain={getExplain}
          deadline={deadline}
          getDeadline={getDeadline}
          need={need}
          getNeed={getNeed}
          needArr={needArr}
          onClickPlus={onClickPlus}
          onClickDelete={onClickDelete}
          isPrivate={isPrivate}
          getIsPrivate={getIsPrivate}
          onSubmit={onSubmit}
        />
      ) : (
        <>
          {page === 1 && <BackgroundTopCloud />}
          {page > 1 && <BackgroundBottomCloud />}
          {page === 1 && <LongtermParent parent={parent} />}
          {page === 2 && (
            <LongtermName parent={parent} target={name} getTarget={getName} />
          )}
          {page === 3 && (
            <LongtermDesire
              getDesire={getDesire}
              desire={desire}
              target={name}
            />
          )}
          {page === 4 && (
            <LongtermNeed
              getNeed={getNeed}
              need={need}
              needArr={needArr}
              onClickPlus={onClickPlus}
              onClickDelete={onClickDelete}
              target={name}
            />
          )}
          {page === 5 && (
            <LongtermDeadline
              getDeadline={getDeadline}
              deadline={deadline}
              target={name}
            />
          )}
          {page === 6 && (
            <LongtermCheck
              getExplain={getExplain}
              explain={explain}
              name={name}
              desire={desire}
              needArr={needArr}
              deadline={deadline}
              getIsPrivate={getIsPrivate}
              isPrivate={isPrivate}
            />
          )}

          {page !== 1 && (
            <PageBtn onClick={onClickPrev} style={{ left: "20px" }}>
              <IoMdArrowRoundBack style={{ fill: "white" }} />
            </PageBtn>
          )}
          {page !== 6 && (
            <PageBtn onClick={onClickNext}>
              <IoMdArrowRoundForward style={{ fill: "white" }} />
            </PageBtn>
          )}
          {page === 6 && (
            <SubmitBtn
              type="submit"
              onClick={() => {
                window.confirm(`${name} 목표가 마음에 드시나요?`) && onSubmit();
              }}
              value="제출하기"
            />
          )}
        </>
      )}
    </Container>
  );
}

export default LongtermFactory;
