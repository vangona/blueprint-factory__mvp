import React, { useEffect, useState } from "react";
import cytoscape from "cytoscape";

import dagre from "cytoscape-dagre";
import domNode from "cytoscape-dom-node";
import cxtmenu from "cytoscape-cxtmenu";
import edgehandles from "cytoscape-edgehandles";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { dbService, firebaseInstance } from "fBase";
import { defaultBtnAction, defaultContainer } from "css/styleConstants";
import removeTarget from "components/mindmap/functions/removeTarget";
import complishTarget from "components/mindmap/functions/complishTarget";
import unComplishTarget from "components/mindmap/functions/unComplishTarget";
import openTarget from "components/mindmap/functions/openTarget";
import cyStyle from "components/mindmap/options/cyStyle";
import { EdgeHandlesOptions } from "components/mindmap/options/EdgeHandlesOptions";
import { MindmapLayout } from "components/mindmap/options/MindmapLayout";


const Container = styled.div`
  ${defaultContainer};
  padding: 10px;
`;

const MindmapContainer = styled.div``;

const BtnBox = styled.div`
  z-index: 999;
  display: flex;
  gap: 10px;
`;

const DrawBtn = styled.button`
  font-family: Ssurround;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: white;
  color: var(--main-blue);
  ${defaultBtnAction};
`;

const DataContainer = styled.div`
  font-family: SsurroundAir;
  font-size: 18px;
  background-color: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
`;

function BlueprintMindmap({ userObj }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [snapshot, setSnapshot] = useState("");
  const [currentData, setCurrentData] = useState("");

  cytoscape.use(dagre);
  if (typeof cytoscape("core", "cxtmenu") === "undefined") {
    cxtmenu(cytoscape);
  }
  if (typeof cytoscape("core", "domNode") === "undefined") {
    domNode(cytoscape);
  }
  if (typeof cytoscape("core", "edgehandles") === "undefined") {
    edgehandles(cytoscape);
  }

  const ContextLongtermMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".longterm",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ?????? ?????????",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/factory/targets/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ?????????",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/factory/routine/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ???????????????!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ?????????",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextShorttermMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".shortterm",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ?????? ?????????",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/factory/targets/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ?????????",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/factory/plan/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ?????????",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/factory/routine/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ???????????????!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ?????????",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextPlanMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".plan",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "??? ??? ??????",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/factory/todo/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ?????????",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/routine/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ????????????!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ?????????",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextRoutineMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".routine",
    commands: [
      // {
      //   fillColor: 'rgba(200, 200, 200, 0.75)',
      //   content: '?????? ????????????',

      //   contentStyle: {},
      //   select: function(ele){
      //     navigate({
      //       pathname: `/blueprint/targets/${ele.id()}`,
      //     })
      //   },
      //   enabled: true,
      // },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "???????????? ????????? ???????????????!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ?????????",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextTodoMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".todo",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "??? ?????? ????????????!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????? ?????????",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextPrivateMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".private",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ?????? ?????????",
        contentStyle: {},
        select(ele) {
          openTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextIncompleteMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".incomplete",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "?????? ????????????",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/factory/incomplete/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "???????????????!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "???????????? ?????????",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/plan/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextComplishedMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".isComplished",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "????????????",

        contentStyle: {},
        select(ele) {
          alert("????????? ????????? ????????? ?????? ????????? ???????????????????");
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "??????????????? ???????????????.",
        contentStyle: {},
        select(ele) {
          unComplishTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextEdgeMenuOptions = {
    menuRadius(ele) {
      return 100;
    },
    selector: "edge",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "??? ?????????",
        contentStyle: {},
        async select(ele) {
          console.log(ele.data());
          await dbService
            .collection("targets")
            .doc(`${ele.data().source}`)
            .update({
              childs: firebaseInstance.firestore.FieldValue.arrayRemove(
                ele.data().target
              ),
            })
            .then(() => {
              console.log("success");
            })
            .catch((error) => {
              console.log(error.message);
            });
          ele.remove();
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextCoreMenuOptions = {
    menuRadius(ele) {
      return 100;
    },
    selector: "core",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "??? ?????? ?????????",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/targets`,
          });
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const fillCy = async () => {
    // ?????? ?????? ??????

    // edge, arrow
    const edgeWidth = "2px";
    const edgeActiveWidth = "4px";
    const arrowScale = 0.8;
    const arrowActiveScale = 1.2;

    // ??????
    const dimColor = "#dfe4ea";
    const edgeColor = "#ced6e0";
    const nodeTextColor = "black";
    const nodeColor = "white";
    const nodeActiveColor = "#ffa502";

    const longtermColor = "red";
    const shorttermColor = "blue";
    const planColor = "skyblue";
    const routineColor = "purple";
    const todoColor = "yellow";
    const privateColor = "black";
    const incompleteColor = "lightgreen";
    const complishedColor = "green";

    // on focus edge color
    const successorColor = "#ff6348";
    const predecessorsColor = "#1e90ff";

    // ?????? ??????
    const nodeMaxSize = 50;
    const nodeMinSize = 20;
    const nodeActiveSize = 70;

    // ?????? ??????
    const fontMaxSize = 20;
    const fontMinSize = 10;
    const fontActiveSize = 16;

    const cy = cytoscape({
      container: document.getElementById("cy"),
      elements: [],
      style: cyStyle,
      layout: {},
      wheelSensitivity: 0.2,
    });

    // node ?????????
    cy.domNode();

    if (snapshot.length !== 0) {
      makeNode(snapshot);
      makeEdge(snapshot);
    }
    
    cy.nodes().forEach((node) => {
      if (node.data().isPrivate && id) {
        node.addClass("isPrivate");
      } else if (node.data().isComplished) {
        node.addClass("isComplished");
      } else {
        if (node.data().type === "value") {
          node.addClass("value");
        }
        if (node.data().type === "longterm") {
          node.addClass("longterm");
        }
        if (node.data().type === "shortterm") {
          node.addClass("shortterm");
        }
        if (node.data().type === "plan") {
          node.addClass("plan");
        }
        if (node.data().type === "routine") {
          node.addClass("routine");
        }
        if (node.data().type === "todo") {
          node.addClass("todo");
        }
        if (node.data().type === "incomplete") {
          node.addClass("incomplete");
        }
      }
    });

    cy.on("tap", function (e) {
      setResetFocus(e.cy);

      if (e.target.isNode) {
        if (!e.target.isEdge()) {
          setCurrentData(e.target.data());
          console.log(e.target.data());
        }
      }

      if (!e.target.isNode) setCurrentData("");

      e.target.isNode &&
        e.target.isNode() &&
        setDimStyle(cy, {
          "background-color": dimColor,
          "line-color": dimColor,
          "source-arrow-color": dimColor,
          color: dimColor,
        });

      e.target.isNode &&
        e.target.isNode() &&
        setFocus(
          e.target,
          successorColor,
          predecessorsColor,
          edgeActiveWidth,
          arrowActiveScale
        );
    });

    // ???????????? ???
    const layout = cy.layout(MindmapLayout);
    layout.run();

    // ?????? ????????? ??????
    let resizeTimer;

    window.addEventListener("resize", function () {
      this.clearTimeout(resizeTimer);
      resizeTimer = this.setTimeout(function () {
        cy.fit();
        cy.center();
      }, 200);
    });

    setTimeout(() => {
      cy.fit();
      cy.center();
    }, []);

    // ??? ???????????? ??? ??? ?????? ??????
    if (!id) {
      cy.cxtmenu(ContextLongtermMenuOptions);
      cy.cxtmenu(ContextShorttermMenuOptions);
      cy.cxtmenu(ContextPlanMenuOptions);
      cy.cxtmenu(ContextRoutineMenuOptions);
      cy.cxtmenu(ContextTodoMenuOptions);
      cy.cxtmenu(ContextComplishedMenuOptions);
      cy.cxtmenu(ContextIncompleteMenuOptions);
      cy.cxtmenu(ContextEdgeMenuOptions);
      cy.cxtmenu(ContextCoreMenuOptions);

      const eh = cy.edgehandles(EdgeHandlesOptions);

      const drawOn = document.querySelector("#draw-on");
      drawOn.addEventListener("click", function () {
        eh.enableDrawMode();
        drawOn.classList.add("hide");
        drawOff.classList.remove("hide");
      });

      const drawOff = document.querySelector("#draw-off");
      drawOff.addEventListener("click", function () {
        eh.disableDrawMode();
        drawOff.classList.add("hide");
        drawOn.classList.remove("hide");
      });

      cy.on("ehcomplete", async (sourceNode, targetNode) => {
        await dbService
          .collection("targets")
          .doc(`${targetNode.id()}`)
          .update({
            parentId: firebaseInstance.firestore.FieldValue.arrayUnion(
              targetNode.id()
            ),
          })
          .then(async () => {
            await dbService
              .collection("targets")
              .doc(`${sourceNode.id()}`)
              .update({
                childs: firebaseInstance.firestore.FieldValue.arrayUnion(
                  sourceNode.id()
                ),
              })
              .then(() => {
                console.log("success");
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    }

    // ?????? ?????????
    function makeNode(snapshot) {
      const visited = new Array(snapshot.length);

      // // ?????? ?????? ?????????
      // for (let i = 0; i < snapshot.length; i++) {
      //   if (visited[i]) continue;
      //   dfs(i);
      // }

      // ????????? ?????? ?????????
      for (let i = 0; i < snapshot.length; i++) {
        if (visited[i]) continue;
        paintNode(snapshot[i], "new");
      }

      cy.nodes().forEach(node => {
        node.style("font-size", fontMaxSize);
        node.style("width", nodeMaxSize);
        node.style("height", nodeMaxSize);
      });

      function paintNode(targetData, parent) {
        // ?????? ??????
        const container = document.createElement("div");
        // ???????????? ????????????
        container.style.userSelect = "none";

        container.style.fontFamily = "SsurroundAir";
        container.style.textAlign = "center";
        container.style.wordBreak = "keep-all";

        if (targetData.type === "shortterm" || targetData.type === "longterm") {
          const node = {
            data: {
              id: `${targetData.id}`,
              parentId: `${parent}`,
              childs: targetData.childs,
              label: `${
                id && targetData.isPrivate ? "( ????????? )" : targetData.name
              }`,
              type: `${targetData.type}`,
              explain: `${targetData.explain}`,
              deadline: new Date(targetData.deadline.seconds * 1000),
              isComplete: targetData.isComplete,
              isComplished: targetData.isComplished,
              isPrivate: targetData.isPrivate,
              dom: container,
            },
          };

          cy.add(node);
        } else {
          const node = {
            data: {
              id: `${targetData.id}`,
              parentId: `${parent}`,
              childs: targetData.childs,
              label: `${
                id && targetData.isPrivate ? "( ????????? )" : targetData.name
              }`,
              type: `${targetData.type}`,
              explain: `${targetData.explain}`,
              deadline: new Date(targetData.deadline.seconds * 1000),  
              isComplete: targetData.isComplete,
              isComplished: targetData.isComplished,
              isPrivate: targetData.isPrivate,
              dom: container,
            },
          };

          cy.add(node);
        }
      }
    }

    // ??? ?????????
    function makeEdge(snapshot) {
      // ?????? ?????????
      for (let i = 0; i < snapshot.length; i++) {
        if (!snapshot[i].parents) continue;
        for (let j = 0; j < cy.nodes().length; j++) {
          snapshot[i].parents.forEach(parentId => {
            if (cy.nodes()[j].data().id === parentId) {
              paintEdge(parentId, snapshot[i].id)
            }
          })
        }
      }

      function paintEdge(parent, child) {
        const edgeData = {
          data: {
            id: `${parent}->${child}`,
            source: `${parent}`,
            target: `${child}`,
          },
        };

        cy.add(edgeData);
      }
    }

    // ???????????? ?????? ????????? ????????? ??????
    function setDimStyle(target_cy, style) {
      target_cy.nodes().forEach(function (target) {
        target.style(style);
      });
      target_cy.edges().forEach(function (target) {
        target.style(style);
      });
    }

    function setFocus(
      target_element,
      successorColor,
      predecessorsColor,
      edgeWidth,
      arrowScale
    ) {
      target_element.style("background-color", nodeActiveColor);
      target_element.style("color", nodeTextColor);

      target_element.predecessors().each(function (e) {
        if (e.isEdge()) {
          e.style("width", edgeWidth);
          e.style("arrow-scale", arrowScale);
        }
        e.style("color", nodeTextColor);
        e.style("background-color", predecessorsColor);
        e.style("line-color", predecessorsColor);
        e.style("source-arrow-color", predecessorsColor);
        setOpacityElement(e, 1);
      });

      target_element.successors().each(function (e) {
        if (e.isEdge()) {
          e.style("width", edgeWidth);
          e.style("arrow-scale", arrowScale);
        }
        e.style("color", nodeTextColor);
        e.style("background-color", successorColor);
        e.style("line-color", successorColor);
        e.style("source-arrow-color", successorColor);
        setOpacityElement(e, 1);
      });

      target_element.neighborhood().each(function (e) {
        setOpacityElement(e, 1);
      });

      target_element.style(
        "width",
        Math.max(parseFloat(target_element.style("width")), nodeActiveSize)
      );
      target_element.style(
        "height",
        Math.max(parseFloat(target_element.style("height")), nodeActiveSize)
      );
      target_element.style(
        "font-size",
        Math.max(parseFloat(target_element.style("font-size")), fontActiveSize)
      );
    }

    function setOpacityElement(target_element, degree) {
      target_element.style("opacity", degree);
    }

    function setResetFocus(target_cy) {
      target_cy.nodes().forEach(function (target) {
        const targetList = [
          "longterm",
          "shortterm",
          "plan",
          "routine",
          "todo",
          "incomplete",
        ];
        const colorList = [
          longtermColor,
          shorttermColor,
          planColor,
          routineColor,
          todoColor,
          "white",
        ];

        let resetColor = colorList[targetList.indexOf(target.data().type)];

        if (target.data().isComplished) resetColor = complishedColor;

        if (id && target.data().isPrivate) resetColor = privateColor;

        target.style("background-color", resetColor);
        target.style("width", nodeMaxSize);
        target.style("height", nodeMaxSize);
        target.style("font-size", fontMaxSize);
        target.style("color", nodeTextColor);
        target.style("opacity", 1);
      });

      target_cy.edges().forEach(function (target) {
        target.style("line-color", edgeColor);
        target.style("source-arrow-color", edgeColor);
        target.style("width", edgeWidth);
        target.style("arrow-scale", arrowScale);
        target.style("opacity", 1);
      });
    }
  };

  const getSnapshot = () => {
    const data = localStorage.getItem('blueprint-factory_target');
    if (data) {
      setSnapshot(JSON.parse(data));
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    if (snapshot) {
      fillCy();
    } else {
      getSnapshot();
    }
  }, [snapshot]);

  return (
    <Container>
      <MindmapContainer
        id="cy"
        style={{ width: "100%", height: "90vh", top: "5vh", padding: "15px" }}
      />
      {currentData && <DataContainer>{currentData.label}</DataContainer>}
      {!id && !currentData && (
        <BtnBox>
          <DrawBtn id="draw-on">??? ?????? on</DrawBtn>
          <DrawBtn id="draw-off" className="hide">
            ??? ?????? off
          </DrawBtn>
        </BtnBox>
      )}
    </Container>
  );
}

export default BlueprintMindmap;
