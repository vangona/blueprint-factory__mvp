import React from "react";
import styled from "styled-components";
import { defaultContainer } from "css/styleConstants";

const Container = styled.div`
  ${defaultContainer};
  position: absolute;
  top: 0;
  justify-content: center;
  height: 100vh;
  z-index: 10;
  gap: 15px;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 28px;
  font-family: Ssurround;
  text-align: center;
  line-height: 55px;
`;

const Explain = styled.div`
  font-family: SsurroundAir;
  font-size: 15px;
  color: var(--main-blue);
  line-height: 25px;
  text-align: center;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const CloudBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TargetName = styled.div`
  color: black;
  font-family: Ssurround;
`;

const Noitce = styled.div`
  font-family: SsurroundAir;
`;

const Label = styled.label`
  width: auto;
  word-break: keep-all;
`;

const Input = styled.input`
  font-family: SsurroundAir;
  background-color: #eeeeee;
  border-radius: 30px;
  height: 45px;
  padding: 20px;
  box-sizing: border-box;
`;

const RoutineBox = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-family: SsurroundAir;
`;

const SubmitBlockBtn = styled.div`
  position: fixed;
  bottom: 20px;
  z-index: 99;
  background-color: white;
  border: none;
  width: 200px;
  height: 50px;
`;

const PrivateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: SsurroundAir;
  gap: 5px;
`;

const CheckBox = styled.input``;

const PrivateLabel = styled.label``;

function RoutinePeriod({
  getPeriod,
  getFrequency,
  period,
  frequency,
  need,
  getIsPrivate,
  isPrivate,
}) {
  const onChange = (e) => {
    const name = e.target.getAttribute("name");
    if (name === "period") {
      getPeriod(e.target.value);
    }
    if (name === "frequency") {
      getFrequency(e.target.value);
    }
    if (name === "isPrivate") {
      getIsPrivate(e.target.checked);
    }
  };

  return (
    <>
      <Container>
        <Title>???????????? ??????????????????.</Title>
        <Explain>
          ex) <Bold>1??????</Bold>??? <Bold>3???</Bold> <Bold>??????</Bold>
        </Explain>
        <CloudBox>
          <TargetName>
            {period && `${period}???`} {frequency} {need}
          </TargetName>
        </CloudBox>
        <RoutineBox>
          <Label>??????</Label>
          <Input
            name="period"
            value={period}
            type="text"
            onChange={onChange}
            placeholder="????????? ?????? ??????????"
          />
        </RoutineBox>
        <RoutineBox>
          <Label>?????? ???</Label>
          <Input
            name="frequency"
            value={frequency}
            type="text"
            onChange={onChange}
            placeholder={
              period ? `${period}??? ??? ??? ??????????` : "??? ????????? ??????????"
            }
          />
        </RoutineBox>
        <PrivateBox>
          <CheckBox
            name="isPrivate"
            id="is-private"
            type="checkbox"
            checked={isPrivate}
            onChange={onChange}
          />
          <PrivateLabel htmlFor="is-private">
            ??? ????????? ????????? ?????????.
          </PrivateLabel>
        </PrivateBox>
      </Container>
      {!frequency | !period && <SubmitBlockBtn />}
    </>
  );
}

export default RoutinePeriod;
