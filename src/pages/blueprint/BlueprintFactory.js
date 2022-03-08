import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TermChoice from "components/factory/TermChoice";
import Loading from "components/loading/Loading";
import { defaultContainer, defaultTitle } from "css/styleConstants";
import { dbService } from "fBase";
import LongtermFactory from "components/factory/LongtermFactory";
import ShorttermFactory from "components/factory/ShorttermFactory";
import PlanFactory from "components/factory/PlanFactory";
import RoutineFactory from "components/factory/RoutineFactory";

const Container = styled.div`
  ${defaultContainer}
  justify-content: flex-start;
  padding-top: 50px;
  z-index: 10;
`;

const Title = styled.div`
  ${defaultTitle};
  margin-top: 30px;
  z-index: 9;
  font-family: Ssurround;
`;

function BlueprintFactory({ userObj }) {
  const { id, type } = useParams();
  const [typeName, setTypeName] = useState("");
  const [parent, setParent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getParent = async () => {
    if (id) {
      await dbService
        .collection("targets")
        .where("id", "==", id)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((el) => el.data());
          setParent(...data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      const initParent = {
        name: "new",
        id: "new",
        deadline: "",
      };
      setParent(initParent);
      setIsLoading(false);
    }
  };

  const getTypeName = () => {
    if (type === "targets") {
      setTypeName("어떤 목표를 만들어볼까요?");
    }
    if (type === "plan") {
      setTypeName("계획 세우기");
    }
    if (type === "routine") {
      setTypeName("루틴 만들기");
    }
  };

  useEffect(() => {
    getTypeName();
    getParent();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Title>{typeName || "뀨"}</Title>
          {(type === "targets") | (type === "incomplete") && (
            <TermChoice userObj={userObj} parent={parent || undefined} />
          )}
          {type === "longterm" && (
            <LongtermFactory userObj={userObj} parent={parent || undefined} />
          )}
          {type === "shortterm" && (
            <ShorttermFactory userObj={userObj} parent={parent || undefined} />
          )}
          {type === "plan" && (
            <PlanFactory userObj={userObj} parent={parent || undefined} />
          )}
          {type === "routine" && (
            <RoutineFactory userObj={userObj} parent={parent || undefined} />
          )}
        </Container>
      )}
    </>
  );
}

export default BlueprintFactory;
